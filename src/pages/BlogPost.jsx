import { useParams, Link } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { blogPostContent } from '../data/blogData'
import { getBlogPostBySlug } from '../lib/sanityClient'
import { PortableText } from '@portabletext/react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

function BlogPost() {
  const { id } = useParams()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allImages, setAllImages] = useState([])
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Try to fetch from Sanity first
        console.log('Fetching post with slug/id:', id)
        const sanityPost = await getBlogPostBySlug(id)
        console.log('Sanity post result:', sanityPost)
        if (sanityPost) {
          setPost(sanityPost)
        } else {
          // Fallback to static data
          console.log('Falling back to static data for id:', id)
          setPost(blogPostContent[id])
        }
      } catch (error) {
        console.log('Using static blog data:', error.message)
        // Fallback to static data
        setPost(blogPostContent[id])
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])
  
  // Collect all images for lightbox from both sections and content
  const images = useMemo(() => {
    if (!post) return []
    
    let imgs = []
    
    // From sections (static data format)
    if (post.sections) {
      imgs = post.sections
        .filter(section => section.type === 'image')
        .map(section => ({
          src: section.src,
          alt: section.alt
        }))
    }
    
    // From content (Sanity Portable Text format)
    if (post.content) {
      const contentImages = post.content
        .filter(block => block._type === 'image')
        .map(block => ({
          src: block.src || block.imageUrl,
          alt: block.alt || ''
        }))
      imgs = [...imgs, ...contentImages]
    }
    
    return imgs
  }, [post])

  const openLightbox = (imageSrc) => {
    const index = images.findIndex(img => img.src === imageSrc)
    if (index !== -1) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  if (loading) {
    return (
      <article className="blog-post _section">
        <div className="blog-post__container">
          <h1 className="blog-post__title">載入中...</h1>
        </div>
      </article>
    )
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
              preload="metadata"
              playsInline
              width="100%" 
              style={{ maxWidth: '800px', height: 'auto' }}
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
              {/* Render Sanity Portable Text content */}
              {post.content && (
                <PortableText 
                  value={post.content}
                  components={{
                    block: {
                      h1: ({children}) => <h1>{children}</h1>,
                      h2: ({children}) => <h2>{children}</h2>,
                      h3: ({children}) => <h3>{children}</h3>,
                      normal: ({children}) => <p>{children}</p>,
                    },
                    types: {
                      image: ({value}) => {
                        const imgSrc = value.src || value.imageUrl
                        return (
                          <div className="blog-post__image">
                            <img 
                              src={imgSrc} 
                              alt={value.alt || ''} 
                              loading="lazy"
                              onClick={() => openLightbox(imgSrc)}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        )
                      },
                      videoEmbed: ({value}) => {
                        const url = value.url || '';
                        // Check if it's a YouTube URL
                        const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                        
                        if (youtubeMatch) {
                          const videoId = youtubeMatch[1];
                          return (
                            <div className="blog-post__video">
                              <iframe
                                width="100%"
                                height="450"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ maxWidth: '800px', borderRadius: '8px' }}
                              />
                            </div>
                          );
                        }
                        
                        // Regular video file
                        return (
                          <div className="blog-post__video">
                            <video 
                              controls 
                              preload="metadata"
                              playsInline
                              width="100%" 
                              style={{ maxWidth: '800px', height: 'auto' }}
                            >
                              <source src={url} type="video/mp4" />
                              您的瀏覽器不支援影片播放。
                            </video>
                          </div>
                        );
                      },
                    },
                  }}
                />
              )}
              {/* Render static sections data */}
              {post.sections && post.sections.map((section, index) => renderSection(section, index))}
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
