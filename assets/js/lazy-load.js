
// Lazy load Vimeo iframe when it comes into view
document.addEventListener('DOMContentLoaded', function() {
  const vimeoIframe = document.querySelector('iframe[data-src]');
  
  if (vimeoIframe) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute('data-src');
          observer.unobserve(iframe);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    observer.observe(vimeoIframe);
  }
});
