import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
  return (
    <article className="blog__card" data-blog-id={blog.id}>
      <div className="blog__image">
        <Link to={`/blog/${blog.id}`}>
          <img 
            src={blog.thumbnail} 
            alt={blog.title} 
            loading="lazy"
          />
        </Link>
        <div className="blog__rating">
          <span className="rating__icon">⭐</span>
          <span className="rating__value">{blog.rating}</span>
        </div>
      </div>
      <div className="blog__content">
        <Link to={`/blog/${blog.id}`}>
          <h3 className="blog__title">{blog.title}</h3>
        </Link>
        <Link to={`/blog/${blog.id}`}>
          <p className="blog__description">{blog.description}</p>
        </Link>
        <div className="blog__meta">
          <span className="blog__date">📅 {blog.date}</span>
          <span className="blog__read-time">⏱ {blog.readTime}</span>
        </div>
        <Link to={`/blog/${blog.id}`} className="blog__link">
          Read More →
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
