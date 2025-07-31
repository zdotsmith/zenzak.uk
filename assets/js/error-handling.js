/**
 * Error handling and performance improvements
 * This script adds error handling for common issues and improves performance
 */

document.addEventListener('DOMContentLoaded', function() {
  // Handle video loading errors
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('error', function(e) {
      console.warn('Video error:', e);
      // Replace with a placeholder or fallback content if needed
      const parent = this.parentElement;
      if (parent && this.style.display !== 'none') {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'video-fallback';
        fallback.textContent = 'Video could not be loaded';
        parent.appendChild(fallback);
      }
    });
  });

  // Handle iframe loading errors
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    iframe.addEventListener('error', function(e) {
      console.warn('Iframe error:', e);
      // Replace with a placeholder or fallback content if needed
      const parent = this.parentElement;
      if (parent && this.style.display !== 'none') {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'iframe-fallback';
        fallback.textContent = 'Content could not be loaded';
        parent.appendChild(fallback);
      }
    });
  });

  // Netlify form handling with error handling
  const form = document.querySelector('form[netlify]');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          // Add error styling if needed
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        console.warn('Form validation failed');
        return;
      }
      
      // Submit the form using Fetch API with error handling
      const formData = new FormData(form);
      
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Form submission failed: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        // Success handling
        form.reset();
        const successMessage = document.createElement('p');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for your message. We\'ll get back to you soon.';
        form.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      })
      .catch(error => {
        console.error('Form submission error:', error);
        // Error handling
        const errorMessage = document.createElement('p');
        errorMessage.className = 'form-error';
        errorMessage.textContent = 'There was an error submitting the form. Please try again later.';
        form.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
          errorMessage.remove();
        }, 5000);
      });
    });
  }

  // Add passive event listeners for better performance
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return true;
      }
    };
    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (err) {
    passiveSupported = false;
  }
  
  // Apply passive listeners to scroll events
  const scrollOptions = passiveSupported ? { passive: true } : false;
  window.addEventListener('scroll', function() {
    // Scroll handling if needed
  }, scrollOptions);
});
