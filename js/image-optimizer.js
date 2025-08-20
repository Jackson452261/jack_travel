// Portfolio Image Optimization Script
document.addEventListener('DOMContentLoaded', function() {
    // Optimize all Cloudinary images in portfolio
    const portfolioImages = document.querySelectorAll('.portfolio__item img');
    
    portfolioImages.forEach(function(img) {
        const originalSrc = img.src;
        
        // Only optimize Cloudinary images
        if (originalSrc.includes('res.cloudinary.com')) {
            // Add optimization parameters if not already present
            if (!originalSrc.includes('c_scale') && !originalSrc.includes('q_auto')) {
                const optimizedSrc = originalSrc.replace(
                    '/image/upload/',
                    '/image/upload/c_scale,w_400,q_auto,f_auto/'
                );
                img.src = optimizedSrc;
            }
            
            // Add dimensions if missing
            if (!img.hasAttribute('width')) {
                img.setAttribute('width', '400');
                img.setAttribute('height', '300');
            }
            
            // Add lazy loading if missing
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add alt text if missing
            if (!img.getAttribute('alt') || img.getAttribute('alt') === '') {
                const category = img.closest('[data-cat]')?.getAttribute('data-cat');
                if (category === 'maylaysia') {
                    img.setAttribute('alt', 'Malaysia MotoGP photography');
                } else if (category === 'japan') {
                    img.setAttribute('alt', 'Japan MotoGP photography');
                } else {
                    img.setAttribute('alt', 'MotoGP photography');
                }
            }
        }
    });
    
    // Intersection Observer for better lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe images that are far down the page
        const lazyImages = document.querySelectorAll('.portfolio__item img');
        lazyImages.forEach((img, index) => {
            if (index > 8) { // Only lazy load images after the first 8
                imageObserver.observe(img);
            }
        });
    }
});
