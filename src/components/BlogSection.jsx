import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import { blogPosts as staticBlogPosts } from '../data/blogData'
import { getBlogPosts } from '../lib/sanityClient'

function BlogSection() {
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const sanityPosts = await getBlogPosts()
        if (sanityPosts && sanityPosts.length > 0) {
          // Transform Sanity data to match our format
          const transformedPosts = sanityPosts.map(post => ({
            id: post.slug || post._id,
            title: post.title,
            description: post.description,
            thumbnail: post.thumbnailUrl || post.thumbnail,
            date: post.date,
            readTime: post.readTime,
            rating: post.rating || 4.5
          }))
          setBlogPosts(transformedPosts)
        }
      } catch (error) {
        console.log('Using static blog data:', error.message)
        // Keep using static data on error
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className="main__blog blog _section">
      <div className="blog__container">
        <h2 className="blog__heading heading">旅遊文章</h2>
        <div className="blog__grid">
          {blogPosts.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
