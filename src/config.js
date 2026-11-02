export const agency = {
  name: 'Kriya Labs',
  mark: 'K.',
  tagline: 'Next-generation digital engineering & design studio',
  email: 'hello@kriyalabs.in',
  phone: '+91 70078 64516',
  whatsapp: 'https://wa.me/917007864516',
  linkedin: 'https://www.linkedin.com/',
  location: 'Lucknow, India · Working Worldwide',
  services: [
    'Website design & development',
    'Web applications',
    'Mobile applications',
    'AI automation',
    'E-commerce',
    'UI/UX design',
    'API integrations',
    'Website optimization',
  ],
}

export const concepts = [
  {
    slug: 'cafe',
    name: 'Maison Ember',
    category: 'Food & hospitality',
    description: 'A warm, editorial home for a modern neighbourhood table in Hazratganj. Explore the seasonal menu, the story, and a considered booking experience.',
    tags: ['Hospitality', 'Editorial', 'Reservations'],
    preview: '/previews/maison-ember.png',
    tone: 'cafe',
  },
  {
    slug: 'school',
    name: 'Northfield International',
    category: 'Education',
    description: 'A clear, welcoming digital front door for curious minds, thoughtful families, and holistic K–12 learning in India.',
    tags: ['Education', 'Admissions', 'K–12 Campus'],
    preview: '/previews/northfield.png',
    tone: 'school',
  },
  {
    slug: 'business',
    name: 'UrbanNest Services',
    category: 'Home & property',
    description: 'A confident residential & interior care experience that makes it easy to understand the work, meet the team, and request an estimate.',
    tags: ['Home services', 'Interiors', 'Lead generation'],
    preview: '/previews/urbannest.png',
    tone: 'business',
  },
]

export const img = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`
export const saveDemo = (key, data) => {
  try {
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    list.push({ ...data, savedAt: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(list))
    return true
  } catch {
    return false
  }
}
