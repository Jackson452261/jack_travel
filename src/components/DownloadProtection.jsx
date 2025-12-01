import { useEffect } from 'react'

function DownloadProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault()
      return false
    }

    // Disable drag and drop for images
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
        return false
      }
    }

    // Disable keyboard shortcuts
    const handleKeyDown = (e) => {
      // Disable F12 (Developer Tools)
      if (e.keyCode === 123) {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+S (Save Page)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)

    // Console warning message
    console.clear()
    console.log('%c⚠️ 內容受到保護', 'color: red; font-size: 20px; font-weight: bold;')
    console.log('%c此網站的內容受到版權保護，禁止下載或複製。', 'color: red; font-size: 14px;')

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}

export default DownloadProtection
