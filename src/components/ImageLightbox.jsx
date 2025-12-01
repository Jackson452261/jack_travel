import { useState, useCallback } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

function ImageLightbox({ images, children }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = images.map(img => ({
    src: img.src || img,
    alt: img.alt || ''
  }))

  const openLightbox = useCallback((idx) => {
    setIndex(idx)
    setOpen(true)
  }, [])

  return (
    <>
      {children({ openLightbox })}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      />
    </>
  )
}

export default ImageLightbox
