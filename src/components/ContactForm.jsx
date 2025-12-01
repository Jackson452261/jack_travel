import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

function ContactForm() {
  const formRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        'service_oky9hqs',
        'template_p0fotos',
        formRef.current,
        'RvmnIgqG2GJBGiEl_'
      )
      alert('訊息已成功發送！')
      setFormData({ from_name: '', from_email: '', message: '' })
    } catch (error) {
      console.error('FAILED...', error)
      alert('發送失敗，請稍後再試！')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="main__contact contact _section">
      <div className="contact__container">
        <div className="contact__background">
          <img 
            src="https://res.cloudinary.com/dtbj43yha/image/upload/c_scale,w_1200,q_auto,f_auto/v1753798709/mountain_jdi9k6.jpg" 
            alt="Mountain landscape background" 
            width="1200" 
            height="800" 
            loading="lazy"
          />
        </div>
        <h1 className="contact__heading heading">聯絡資訊</h1>
        <a 
          href="https://www.instagram.com/a411757" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="instagram-icon"
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
          </svg>
        </a>
        <div className="contact__body">
          <form ref={formRef} id="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="project_name" value="Ron's photography" />
            <input type="hidden" name="admin_email" value="info@example.com" />
            <input type="hidden" name="form_subject" value="Contact form" />
            
            <div className="form__item">
              <label className="visually-hidden" htmlFor="userName">Name</label>
              <input 
                className="form__input" 
                name="from_name" 
                id="userName" 
                type="text" 
                placeholder="輸入名字" 
                required
                value={formData.from_name}
                onChange={handleChange}
              />
            </div>
            <div className="form__item">
              <label className="visually-hidden" htmlFor="userEmail">Email</label>
              <input 
                className="form__input" 
                name="from_email" 
                id="userEmail" 
                type="email" 
                placeholder="輸入Email" 
                required
                value={formData.from_email}
                onChange={handleChange}
              />
            </div>
            <div className="form__item">
              <label className="visually-hidden" htmlFor="userMessage">Message</label>
              <textarea 
                className="form__textarea" 
                name="message" 
                id="userMessage" 
                placeholder="訊息..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button 
              className="form__button button submit-button" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '發送中...' : '提交訊息'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
