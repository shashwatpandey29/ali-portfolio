export const agency = {
  name: 'elev8rix',
  mark: 'e8.',
  tagline: 'Digital experiences that elevate your business',
  email: 'elev8rix@gmail.com',
  phone: '+91 70078 64516',
  whatsapp: 'https://wa.me/917007864516',
  linkedin: 'https://linkedin.com/company/elev8rix',
  github: 'https://github.com/shashwatpandey29/ali-portfolio',
  location: 'India · Available Worldwide',
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
    description: 'A warm, editorial home for a modern neighbourhood table. Explore the seasonal menu, the story, and a considered booking experience.',
    tags: ['Hospitality', 'Editorial', 'Reservations'],
    preview: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    tone: 'cafe',
  },
  {
    slug: 'school',
    name: 'Northfield International',
    category: 'Education',
    description: 'A clear, welcoming digital front door for curious minds, thoughtful families, and holistic K–12 learning in India.',
    tags: ['Education', 'Admissions', 'K–12 Campus'],
    preview: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    tone: 'school',
  },
  {
    slug: 'business',
    name: 'UrbanNest Services',
    category: 'Home & property',
    description: 'A confident residential & interior care experience that makes it easy to understand the work, meet the team, and request an estimate.',
    tags: ['Home services', 'Interiors', 'Lead generation'],
    preview: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    tone: 'business',
  },
  {
    slug: 'fitness',
    name: 'Forge Athletics',
    category: 'Fitness & wellness',
    description: 'A high-energy training club experience that turns first visits into confident starts, with clear programs, coaches, and trial bookings.',
    tags: ['Fitness', 'Class schedule', 'Trial booking'],
    preview: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    tone: 'fitness',
  },
  {
    slug: 'legal',
    name: 'Alder & Rowe',
    category: 'Legal services',
    description: 'A calm, editorial law firm concept that makes practice areas, people, and the first consultation feel clear and approachable.',
    tags: ['Law firm', 'Practice areas', 'Consultation'],
    preview: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85',
    tone: 'legal',
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
