import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import chatHandler from './api/chat.js'

function localChatApi() {
  return {
    name: 'elev8rix-local-chat-api',
    configureServer(server) {
      // Read only the Gemini settings into the Node process; never expose them to the client.
      const env = loadEnv(server.config.mode, process.cwd(), '')
      if (!process.env.GEMINI_API_KEY && env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY
      if (!process.env.GEMINI_MODEL && env.GEMINI_MODEL) process.env.GEMINI_MODEL = env.GEMINI_MODEL

      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method === 'POST') {
          const chunks = []
          let size = 0
          for await (const chunk of req) {
            size += chunk.length
            if (size > 32_000) {
              res.statusCode = 413
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'That chat request is too large.' }))
              return
            }
            chunks.push(chunk)
          }
          req.body = Buffer.concat(chunks).toString('utf8')
        }

        const apiResponse = {
          setHeader: res.setHeader.bind(res),
          status(code) {
            res.statusCode = code
            return apiResponse
          },
          json(payload) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return res
          },
          end: res.end.bind(res),
        }

        try {
          await chatHandler(req, apiResponse)
        } catch (error) {
          console.error('[Elev8rix local chat] Request failed:', error?.name || 'UnknownError')
          if (!res.writableEnded) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'I hit a temporary issue. Please try again or email elev8rix@gmail.com.' }))
          }
        }
      })
    },
  }
}

export default defineConfig({ plugins: [react(), localChatApi()] })
