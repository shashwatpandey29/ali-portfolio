import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.join(distDir, 'index.html')

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const template = fs.readFileSync(templatePath, 'utf8')
const baseUrl = 'https://elev8rix.vercel.app'
const ogImage = `${baseUrl}/og-image.jpg`

const routes = [
  {
    path: '',
    outputPath: 'index.html',
    title: 'elev8rix · Digital Experiences That Elevate Your Business',
    description: 'Independent digital design and engineering studio. We build high-converting websites, web applications, and AI automations for ambitious brands.',
  },
  {
    path: 'services',
    outputPath: 'services/index.html',
    title: 'Services · elev8rix',
    description: 'Website design & development, high-performance web applications, mobile apps, AI automation, and technical optimization.',
  },
  {
    path: 'work',
    outputPath: 'work/index.html',
    title: 'Work & Concepts · elev8rix',
    description: 'Explore live concepts built by elev8rix across hospitality, education, home services, fitness, legal practices, and custom AI agents.',
  },
  {
    path: 'projects/ai-agent',
    outputPath: 'projects/ai-agent/index.html',
    title: 'Custom AI Agent Demo · elev8rix',
    description: 'Try a simulated custom AI agent grounded in business knowledge, connected to useful actions, and designed with human handoff.',
  },
  {
    path: 'about',
    outputPath: 'about/index.html',
    title: 'About elev8rix · Independent Design & Engineering Studio',
    description: 'Independent digital design and engineering studio in India. We collaborate directly with growing brands worldwide to build enduring digital products.',
  },
  {
    path: 'contact',
    outputPath: 'contact/index.html',
    title: 'Contact elev8rix · Start a Project Conversation',
    description: 'Tell us about your project. Direct access to designers & engineers, thoughtful guidance, and guaranteed replies within 24 hours.',
  },
  {
    path: '404',
    outputPath: '404.html',
    title: 'Page Not Found (404) · elev8rix',
    description: 'The requested page could not be found on elev8rix.',
  },
]

for (const route of routes) {
  const url = `${baseUrl}${route.path ? `/${route.path}` : ''}`
  let html = template

  // Remove default fallback meta tags
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '')
  html = html.replace(/<meta\s+property="og:title"[^>]*>/gi, '')
  html = html.replace(/<meta\s+property="og:description"[^>]*>/gi, '')
  html = html.replace(/<meta\s+property="og:type"[^>]*>/gi, '')

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)

  // Construct meta tags & canonical & JSON-LD
  const metaTags = `
    <!-- Per-Route SEO & Open Graph -->
    <link rel="canonical" href="${url}" />
    <meta name="description" content="${route.description}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="elev8rix" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "elev8rix",
        "image": "${ogImage}",
        "url": "${baseUrl}",
        "telephone": "+917007864516",
        "email": "elev8rix@gmail.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "description": "Independent digital design and engineering studio crafting fast, elevated websites, applications, and AI systems."
      }
    </script>
  `

  // Insert before </head> safely without regex replacement specials
  html = html.split('</head>').join(`${metaTags}\n</head>`)

  const targetFile = path.join(distDir, route.outputPath)
  fs.mkdirSync(path.dirname(targetFile), { recursive: true })
  fs.writeFileSync(targetFile, html, 'utf8')
  console.log(`[prerender] Generated: ${route.outputPath}`)
}

console.log('[prerender] Prerendering finished successfully.')
