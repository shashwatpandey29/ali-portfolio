// Vercel Serverless Function: /api/contact
// Handles contact inquiries with validation, honeypot protection, rate limiting, and email dispatch

// In-memory rate limiter (sliding window per IP)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(ip) {
  const now = Date.now()
  const windowData = rateLimitMap.get(ip) || []
  const recent = windowData.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS)
  
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recent)
    return true
  }
  
  recent.push(now)
  rateLimitMap.set(ip, recent)
  
  // Cleanup old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, timestamps] of rateLimitMap.entries()) {
      const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
      if (valid.length === 0) rateLimitMap.delete(key)
      else rateLimitMap.set(key, valid)
    }
  }
  
  return false
}

function sanitize(str = '') {
  return String(str)
    .replace(/[<>]/g, '')
    .trim()
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' })
  }

  // Get client IP
  const forwarded = req.headers['x-forwarded-for']
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown'

  // 1. Rate Limiting Check
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests submitted from this IP. Please wait a few minutes or email us directly at elev8rix@gmail.com.',
    })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

    // 2. Honeypot Check (spam bot trap)
    if (body._hp || body.website_url_hp) {
      // Silently accept so bot doesn't know it failed
      console.warn(`[Spam honeypot triggered] IP: ${ip}`)
      return res.status(200).json({ success: true, message: 'Inquiry received' })
    }

    // 3. Validation
    const name = sanitize(body.name)
    const email = sanitize(body.email).toLowerCase()
    const phone = sanitize(body.phone || '')
    const business = sanitize(body.business || '')
    const service = sanitize(body.service || '')
    const budget = sanitize(body.budget || '')
    const description = sanitize(body.description || '')
    const consent = body.consent === true || body.consent === 'true' || body.consent === 'on'

    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter a valid name (at least 2 characters).' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' })
    }

    if (!description || description.length < 5) {
      return res.status(400).json({ success: false, error: 'Please provide brief details about your project.' })
    }

    if (!consent) {
      return res.status(400).json({ success: false, error: 'Please accept the privacy consent to submit.' })
    }

    const inquiry = {
      receivedAt: new Date().toISOString(),
      clientIp: ip,
      name,
      email,
      phone: phone || 'Not provided',
      business: business || 'Not provided',
      service: service || 'General inquiry',
      budget: budget || 'Not specified',
      description,
    }

    console.log('[elev8rix Inquiry Received]:', JSON.stringify(inquiry, null, 2))

    // 4. Send email via Resend if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
            <h2 style="color: #0b0f19; margin-top: 0;">🚀 New Project Inquiry from ${name}</h2>
            <p style="font-size: 14px; color: #555;">Received via elev8rix.vercel.app on ${new Date().toLocaleString()}</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; width: 140px;">Client Name:</td>
                <td style="padding: 10px 0;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Phone / WhatsApp:</td>
                <td style="padding: 10px 0;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Company:</td>
                <td style="padding: 10px 0;">${business}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Service Needed:</td>
                <td style="padding: 10px 0;">${service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Estimated Budget:</td>
                <td style="padding: 10px 0;">${budget}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-left: 3px solid #000; border-radius: 4px;">
              <h4 style="margin: 0 0 8px 0;">Project Details:</h4>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${description}</p>
            </div>
          </div>
        `

        const mailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'elev8rix Inquiries <onboarding@resend.dev>',
            to: ['elev8rix@gmail.com'],
            reply_to: email,
            subject: `[New Inquiry] ${name} - ${service || 'Project'}`,
            html: emailHtml,
          }),
        })

        if (!mailRes.ok) {
          const errText = await mailRes.text()
          console.error('[Resend Error]:', errText)
        }
      } catch (mailErr) {
        console.error('[Resend Exception]:', mailErr)
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your enquiry has been received and our team will reply within 24 hours.',
    })
  } catch (err) {
    console.error('[Contact handler error]:', err)
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your message. Please contact us directly at elev8rix@gmail.com.',
    })
  }
}
