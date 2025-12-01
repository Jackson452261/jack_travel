import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ux2ldz33',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You need to set this
})

// Blog posts data from blogData.js
const blogPosts = [
  {
    id: 5,
    title: '2025大阪萬博Expo',
    description: '探索大阪萬博Expo的精彩無人機表演，體驗未來科技與藝術的完美結合。展現日本傳統與現代的和諧共存。',
    thumbnail: 'https://res.cloudinary.com/dtbj43yha/image/upload/c_fill,w_400,h_250,q_auto,f_auto/v1759930616/20250927_184037_fo58wb.jpg',
    date: 'Sep 27, 2025',
    readTime: '4 min read',
    rating: 4.9
  },
  {
    id: 1,
    title: '2023-馬來西亞',
    description: '雪邦賽道觀賞MOTOGP賽事',
    thumbnail: 'https://res.cloudinary.com/dtbj43yha/image/upload/c_fill,w_400,h_250,q_auto,f_auto/v1755741036/IMG_5014_aps2pv.jpg',
    date: 'November, 2023',
    readTime: '8 min read',
    rating: 4.9
  },
  {
    id: 2,
    title: '2024-日本',
    description: 'Mobility Resort Motegi觀賞MOTOGP賽事',
    thumbnail: 'https://res.cloudinary.com/dtbj43yha/image/upload/c_fill,w_400,h_250,q_auto,f_auto/v1755741680/20241005_103030_de4jtt.jpg',
    date: 'Oct 12, 2024',
    readTime: '6 min read',
    rating: 4.8
  },
  {
    id: 3,
    title: '京都旅行',
    description: '京都作為日本的古都，融合了千年歷史與現代便利，是最適合慢遊與體驗傳統文化的城市。無論是一個人旅行、情侶出遊，還是家庭旅程，京都都能帶來難忘的回憶。',
    thumbnail: 'https://res.cloudinary.com/dtbj43yha/image/upload/c_fill,w_400,h_250,q_auto,f_auto/v1756213868/IMG_6268_ba7ezx.jpg',
    date: 'Feb 10, 2025',
    readTime: '5 min read',
    rating: 5.0
  },
  {
    id: 4,
    title: '東京旅遊景點',
    description: '探索東京最具代表性的景點與隱藏寶石。從傳統寺廟到現代摩天大樓，東京融合了古典與現代，為每位旅客帶來獨特的體驗。',
    thumbnail: 'https://res.cloudinary.com/dtbj43yha/image/upload/c_fill,w_400,h_250,q_auto,f_auto/v1756219062/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2_2025-08-26_224116_r366zh.png',
    date: 'Mar 15, 2025',
    readTime: '7 min read',
    rating: 4.9
  }
]

// Function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function importPosts() {
  console.log('Starting import...')
  
  for (const post of blogPosts) {
    const slug = post.id.toString() // Use ID as slug for backward compatibility
    
    const doc = {
      _type: 'blogPost',
      _id: `blogPost-${post.id}`,
      title: post.title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      description: post.description,
      thumbnailUrl: post.thumbnail,
      date: post.date,
      readTime: post.readTime,
      rating: post.rating,
    }
    
    try {
      const result = await client.createOrReplace(doc)
      console.log(`✓ Imported: ${post.title}`)
    } catch (error) {
      console.error(`✗ Failed to import ${post.title}:`, error.message)
    }
  }
  
  console.log('Import complete!')
}

// Run the import
importPosts()
