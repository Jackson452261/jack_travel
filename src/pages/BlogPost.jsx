import { useParams, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { blogPostContent } from '../data/blogData'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

function BlogPost() {
  const { id } = useParams()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const post = blogPostContent[id]
  
  // Collect all images for lightbox
  const images = useMemo(() => {
    if (!post) return []
    return post.sections
      .filter(section => section.type === 'image')
      .map(section => ({
        src: section.src,
        alt: section.alt
      }))
  }, [post])

  const openLightbox = (imageSrc) => {
    const index = images.findIndex(img => img.src === imageSrc)
    if (index !== -1) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  if (!post) {
    return (
      <article className="blog-post _section">
        <div className="blog-post__container">
          <h1 className="blog-post__title">文章未找到</h1>
          <Link to="/" className="blog-post__back">← 返回首頁</Link>
        </div>
      </article>
    )
  }

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'heading':
        return <h2 key={index}>{section.content}</h2>
      case 'paragraph':
        return <p key={index}>{section.content}</p>
      case 'image':
        return (
          <div key={index} className="blog-post__image">
            <img 
              src={section.src} 
              alt={section.alt} 
              loading="lazy"
              onClick={() => openLightbox(section.src)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )
      case 'video':
        return (
          <div key={index} className="blog-post__video">
            <video 
              controls 
              width="100%" 
              style={{ maxWidth: '800px', height: '500px' }}
            >
              <source src={section.src} type="video/mp4" />
              您的瀏覽器不支援影片播放。
            </video>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <article className="blog-post _section">
        <div className="blog-post__container">
          <div className="blog-post__header">
            <div className="blog-post__meta">
              <span className="blog-post__date">📅 {post.date}</span>
              <span className="blog-post__read-time">⏱ {post.readTime}</span>
            </div>
            <h1 className="blog-post__title">{post.title}</h1>
            <p className="blog-post__subtitle">{post.subtitle}</p>
          </div>

          <div className="blog-post__content">
            <div className="blog-post__text">
              {post.sections.map((section, index) => renderSection(section, index))}
            </div>

            <div className="blog-post__navigation">
              <Link to="/" className="blog-post__back">← 返回部落格</Link>
              <div className="blog-post__share">
                <span>分享文章：</span>
                <a href="#" className="share-link">Facebook</a>
                <a href="#" className="share-link">Twitter</a>
                <a href="#" className="share-link">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      />
    </>
  )
}

export default BlogPost
