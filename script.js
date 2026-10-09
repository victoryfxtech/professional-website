// ============================================
// DOM Elements
// ============================================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const themeToggle = document.querySelector('.theme-toggle');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// ============================================
// MOBILE MENU
// ============================================

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isOpen);
  navMenu.classList.toggle('active');
  navOverlay.classList.toggle('active');
  document.body.style.overflow = !isOpen ? 'auto' : 'hidden';
});

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Close menu on overlay click
navOverlay.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('active');
  navOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// ============================================
// DARK MODE
// ============================================

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Respect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
prefersDark.addEventListener('change', (e) => {
  if (e.matches && !localStorage.getItem('theme')) {
    document.body.classList.add('dark-mode');
  } else if (!e.matches && !localStorage.getItem('theme')) {
    document.body.classList.remove('dark-mode');
  }
});

// ============================================

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  // Validate form
  if (!validateForm(data)) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  // Simulate form submission
  try {
    // In a real application, you would send this to a server
    console.log('Form submitted:', data);
    
    // Show success message
    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Scroll to contact section
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  } catch (error) {
    showToast('Error sending message. Please try again.', 'error');
  }
});

function validateForm(data) {
  return data.name && data.email && data.subject && data.message;
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.project-card, .testimonial-card, .skill-category, .highlight-card').forEach(el => {
  el.classList.remove('fade-in');
  observer.observe(el);
});

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Update navbar background
  if (scrollTop > 10) {
    navbar.style.boxShadow = 'var(--shadow)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop;
});

// ============================================
// EMAIL VALIDATION
// ============================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Add real-time email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    showToast('Please enter a valid email address', 'error');
  }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  // Escape closes mobile menu
  if (e.key === 'Escape') {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Cmd/Ctrl + K for search (can be extended)
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    // Can add search functionality here
  }
});

// ============================================
// ANALYTICS & PERFORMANCE
// ============================================

// Log page load time
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log('Page load time: ' + pageLoadTime + 'ms');
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  if (scrollPercent > maxScroll) {
    maxScroll = scrollPercent;
  }
});

// ============================================
// EXTERNAL LINKS
// ============================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});

// ============================================
// PROJECTS DATA (Optional - for dynamic rendering)
// ============================================

const projects = [
  {
    id: 1,
    title: 'Nexa Business',
    category: 'Web Design',
    description: 'Responsive landing page for a digital solutions company.',
    tags: ['UI/UX Design', 'Responsive', 'HTML/CSS'],
    emoji: '🚀'
  },
  {
    id: 2,
    title: 'Luma Store',
    category: 'E-commerce',
    description: 'Modern storefront with product filtering and cart interaction.',
    tags: ['E-commerce', 'JavaScript', 'Full Stack'],
    emoji: '🛒'
  },
  {
    id: 3,
    title: 'Creative Agency Website',
    category: 'Brand & Web',
    description: 'Full rebrand and website redesign for a creative agency.',
    tags: ['Branding', 'Web Design', 'Strategy'],
    emoji: '💼'
  },
  {
    id: 4,
    title: 'Fitness Tracking App',
    category: 'Mobile App',
    description: 'iOS and Android app for personal fitness tracking.',
    tags: ['Mobile Design', 'UX/UI', 'React Native'],
    emoji: '📱'
  },
  {
    id: 5,
    title: 'Video Production Platform',
    category: 'Interactive Design',
    description: 'Web platform for video content creators.',
    tags: ['Dashboard', 'Interactive', 'Web App'],
    emoji: '🎬'
  },
  {
    id: 6,
    title: 'Travel & Tourism Site',
    category: 'Web Development',
    description: 'Destination marketing website with booking system.',
    tags: ['Marketing', 'Booking System', 'SEO'],
    emoji: '🌍'
  }
];

// ============================================
// PRINT FUNCTIONALITY
// ============================================

window.addEventListener('beforeprint', () => {
  document.body.style.background = 'white';
});

// ============================================
// LAZY LOADING IMAGES (if images are added)
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// SCROLL TO TOP BUTTON (Optional)
// ============================================

const scrollToTopButton = document.createElement('button');
scrollToTopButton.id = 'scrollToTop';
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  font-size: 1.5rem;
  font-weight: bold;
`;

document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.opacity = '1';
    scrollToTopButton.style.visibility = 'visible';
  } else {
    scrollToTopButton.style.opacity = '0';
    scrollToTopButton.style.visibility = 'hidden';
  }
});

// ============================================
// INITIALIZATION
// ============================================

console.log('Portfolio loaded successfully ✓');
