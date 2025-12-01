import BlogCard from './BlogCard'
import { blogPosts } from '../data/blogData'

function BlogSection() {
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
