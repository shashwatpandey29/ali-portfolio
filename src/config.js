export const agency = {
  name: 'Form & Function',
  tagline: 'Independent digital studio',
  email: 'hello@formandfunction.studio',
  phone: '+1 (555) 014-8820',
  whatsapp: 'https://wa.me/15550148820',
  linkedin: 'https://www.linkedin.com/',
  location: 'Working everywhere · Based in the US',
  services: ['Website design & development', 'Web applications', 'Mobile applications', 'AI automation', 'E-commerce', 'UI/UX design', 'API integrations', 'Website optimization'],
}

export const concepts = [
  { slug: 'cafe', name: 'Maison Ember', category: 'Food & hospitality', description: 'A warm, editorial home for a neighborhood table. Explore the menu, the story, and a considered booking experience.', tags: ['Hospitality', 'Editorial', 'Reservations'], image: 'photo-1414235077428-338989a2e8c0', tone: 'cafe' },
  { slug: 'school', name: 'Northfield Academy', category: 'Education', description: 'A clear, welcoming digital front door for curious minds, thoughtful families, and a lifelong love of learning.', tags: ['Education', 'Admissions', 'Community'], image: 'photo-1509062522246-3755977927d7', tone: 'school' },
  { slug: 'business', name: 'UrbanNest Services', category: 'Home & property', description: 'A confident service experience that makes it easy to understand the work, meet the team, and ask for a quote.', tags: ['Home services', 'Lead generation', 'Local'], image: 'photo-1600607687939-ce8a6c25118c', tone: 'business' },
]

export const img = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`
export const saveDemo = (key, data) => {
  try { const list = JSON.parse(localStorage.getItem(key) || '[]'); list.push({ ...data, savedAt: new Date().toISOString() }); localStorage.setItem(key, JSON.stringify(list)); return true } catch { return false }
}
