// Enhanced JavaScript for Modern UI

// DOM Elements
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');
const pagePreloader = document.querySelector('.preloader');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const cursorHoverElements = document.querySelectorAll('[data-cursor-hover]');
const scrollDown = document.querySelector('.scroll-down');
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const scrollProgress = document.createElement('div');
const backToTopBtn = document.createElement('button');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const images = document.querySelectorAll('img[data-src]');

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cursor first
  initCustomCursor();
  
  // Initialize other features
  initParticles();
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initScrollAnimations();
  animateNumbers();
  initPreloader();
  initScrollReveal();
  initThemeToggle();
  initScrollProgress();
  initBackToTop();
  initLazyLoading();
  initFormValidation();
  initPageTransitions();
  initHoverEffects();
  initParallaxEffects();
  initScrollToTop();
  initSmoothHover();
  
  // Re-initialize cursor after a short delay to ensure all elements are loaded
  setTimeout(initCustomCursor, 500);
  
  // Initialize any tooltips
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
  });
});

// Particle.js Configuration
const particlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#6366f1'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#c7d2fe',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

// Initialize Particles.js
function initParticles() {
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', particlesConfig);
  }
}

// Custom Cursor
function initCustomCursor() {
  // Ensure cursor elements exist
  if (!cursor || !cursorFollower) return;

  // Always show cursors (removed mobile check)
  cursor.style.display = 'block';
  cursorFollower.style.display = 'block';
  
  // Mouse move event
  document.addEventListener('mousemove', (e) => {
    // Update cursor position
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    // Update follower with slight delay for smooth effect
    setTimeout(() => {
      cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, 50);
  });

  // Cursor hover effects
  if (cursorHoverElements.length > 0) {
    cursorHoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-follower-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-follower-hover');
      });
    });
  }
  
  // Add hover effect for all links and buttons
  const interactiveElements = ['a', 'button', 'input[type="button"]', 'input[type="submit"]'];
  interactiveElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.classList.contains('no-cursor-hover')) {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
          cursorFollower.classList.add('cursor-follower-hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
          cursorFollower.classList.remove('cursor-follower-hover');
        });
      }
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Close menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scrolled');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      header.classList.add('hide');
    } else {
      // Scrolling up
      header.classList.remove('hide');
    }
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Animate elements on scroll
function initScrollAnimations() {
  if (animatedElements.length === 0) return;
  
  const animateOnScroll = () => {
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
}

// Animate numbers counting up
function animateNumbers() {
  const numberElements = document.querySelectorAll('.stat-number');
  if (numberElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count') || '0');
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(counter);
          } else {
            entry.target.textContent = current;
          }
        }, 16);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  numberElements.forEach(element => {
    observer.observe(element);
  });
}

// Preloader
function initPreloader() {
  if (!pagePreloader) return;
  
  // Force show the preloader at the start
  pagePreloader.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Hide preloader when everything is loaded
  const hidePreloader = () => {
    pagePreloader.style.opacity = '0';
    pagePreloader.style.visibility = 'hidden';
    document.body.style.overflow = 'auto';
    
    // Remove the preloader from the DOM after the transition
    setTimeout(() => {
      pagePreloader.style.display = 'none';
    }, 500);
  };
  
  // Hide preloader when everything is loaded
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 1000);
    });
  }
}

// Scroll reveal animation with intersection observer
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// Initialize theme toggle
function initThemeToggle() {
  if (!themeToggle) return;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button icon
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  });
}

// Initialize scroll progress indicator
function initScrollProgress() {
  if (!body) return;
  
  scrollProgress.className = 'scroll-progress';
  body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

// Initialize back to top button
function initBackToTop() {
  if (!document.body) return;
  
  // Create the button if it doesn't exist
  let backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add click event for smooth scrolling
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
  }
  
  // Make sure the button is at the bottom of the body
  document.body.appendChild(backToTopBtn);
}

// Lazy load images
function initLazyLoading() {
  if (images.length === 0) return;
  
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  if (forms.length === 0) return;
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add focus and blur events
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.parentElement.classList.remove('focused');
        }
        validateField(input);
      });
      
      // Real-time validation for email fields
      if (input.type === 'email') {
        input.addEventListener('input', () => {
          validateEmail(input);
        });
      }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
      let isValid = true;
      
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.textContent = 'Please fill in all required fields correctly.';
        form.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
          if (form.contains(errorMessage)) {
            form.removeChild(errorMessage);
          }
        }, 5000);
      }
    });
  });
  
  function validateField(field) {
    if (field.required && field.value.trim() === '') {
      setInvalid(field, 'This field is required');
      return false;
    }
    
    if (field.type === 'email' && !validateEmail(field)) {
      return false;
    }
    
    setValid(field);
    return true;
  }
  
  function validateEmail(field) {
    const email = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
      setInvalid(field, 'Please enter a valid email address');
      return false;
    }
    
    setValid(field);
    return true;
  }
  
  function setInvalid(field, message) {
    field.classList.add('invalid');
    field.setAttribute('aria-invalid', 'true');
    
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    field.parentElement.appendChild(error);
  }
  
  function setValid(field) {
    field.classList.remove('invalid');
    field.setAttribute('aria-invalid', 'false');
    
    // Remove error message if exists
    const error = field.parentElement.querySelector('.field-error');
    if (error) {
      error.remove();
    }
  }
}

// Page transitions
function initPageTransitions() {
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
  if (links.length === 0) return;
  
  links.forEach(link => {
    if (link.href.includes(window.location.hostname) || link.href.startsWith('/')) {
      link.addEventListener('click', (e) => {
        if (link.href === window.location.href) return;
        
        e.preventDefault();
        const href = link.href;
        
        // Add transition class to body
        document.body.classList.add('page-transition');
        
        // Navigate after transition
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });
  
  // Remove transition class when page loads
  window.addEventListener('load', () => {
    document.body.classList.remove('page-transition');
  });
}

// Hover effects
function initHoverEffects() {
  const hoverElements = document.querySelectorAll('.hover-effect');
  if (hoverElements.length === 0) return;
  
  hoverElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Parallax effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
      const yPos = -(scrollPosition * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  });
}

// Smooth hover effect for buttons and links
function initSmoothHover() {
  const hoverableElements = document.querySelectorAll('.btn, .nav-link, .card, .hover-scale');
  if (hoverableElements.length === 0) return;
  
  hoverableElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      element.style.setProperty('--x', `${x}px`);
      element.style.setProperty('--y', `${y}px`);
    });
  });
}

// Scroll to top on page refresh
function initScrollToTop() {
  // This function is not needed and can interfere with the back-to-top button
  // Removed the scroll to top on refresh as it can be disruptive to user experience
}

// Show tooltip
function showTooltip(e) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = this.getAttribute('data-tooltip');
  document.body.appendChild(tooltip);
  
  const rect = this.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Position tooltip above the element
  tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
  tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
  
  // Store reference to remove later
  this.tooltip = tooltip;
}

// Hide tooltip
function hideTooltip() {
  if (this.tooltip) {
    document.body.removeChild(this.tooltip);
    this.tooltip = null;
  }
}

// Add event listener for scroll to update active section in navigation
function highlightNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);
