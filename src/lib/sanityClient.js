import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'ux2ldz33',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Query to get all blog posts for the homepage
export const getBlogPosts = async () => {
  const query = `*[_type == "blogPost"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "thumbnail": thumbnail.asset->url,
    thumbnailUrl,
    date,
    readTime,
    rating
  }`
  return sanityClient.fetch(query)
}

// Query to get a single blog post by slug
export const getBlogPostBySlug = async (slug) => {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    "thumbnail": thumbnail.asset->url,
    thumbnailUrl,
    date,
    readTime,
    rating,
    sections,
    content[] {
      ...,
      _type == "image" => {
        "src": asset->url,
        "alt": alt,
        "imageUrl": imageUrl
      }
    }
  }`
  return sanityClient.fetch(query, { slug })
}

// Query to get a single blog post by ID (for backward compatibility)
export const getBlogPostById = async (id) => {
  const query = `*[_type == "blogPost" && _id == $id][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    "thumbnail": thumbnail.asset->url,
    thumbnailUrl,
    date,
    readTime,
    rating,
    sections
  }`
  return sanityClient.fetch(query, { id })
}
