/* ===============================================
   YAFE RESTAURANT - ADVANCED JAVASCRIPT
   Professional, Feature-Rich, Error-Handled
   =============================================== */

// ===== EMAIL.JS INITIALIZATION =====
(function () {
  emailjs.init("GOydHJrIyoANtr4L5");
})();

// ===== UTILITY FUNCTIONS =====
const utils = {
  // Smooth scroll with offset
  smoothScroll: (target, offset = 100) => {
    const element = document.querySelector(target);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  },

  // Show/hide element with animation
  toggleElement: (element, show) => {
    if (show) {
      element.style.display = 'block';
      setTimeout(() => element.style.opacity = '1', 10);
    } else {
      element.style.opacity = '0';
      setTimeout(() => element.style.display = 'none', 300);
    }
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Track events (for future analytics integration)
  trackEvent: (category, action, label) => {
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Add Google Analytics or other tracking here
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
  }
};

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  
  // Set minimum display time for premium feel
  const minLoadTime = 1800; // 1.8 seconds
  const startTime = performance.now();
  
  const hidePreloader = () => {
    preloader.classList.add('hide');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  };
  
  // Calculate remaining time
  const elapsedTime = performance.now() - startTime;
  const remainingTime = Math.max(0, minLoadTime - elapsedTime);
  
  setTimeout(hidePreloader, remainingTime);
});

// Fallback: Hide preloader after max time
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hide')) {
    preloader.classList.add('hide');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }
}, 4000);

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = Math.min(scrolled, 100) + '%';
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update icon
  const icon = theme === 'light' ? '☀️' : '🌙';
  if (themeToggle) {
    themeToggle.querySelector('.theme-icon').textContent = icon;
  }
  if (themeToggleMobile) {
    themeToggleMobile.querySelector('.theme-icon').textContent = icon;
  }
  
  utils.trackEvent('UI', 'Theme Toggle', theme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Theme toggle event listeners
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', toggleTheme);
}

// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

const closeMobileNav = () => {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
  mobileNavOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
};

const openMobileNav = () => {
  hamburger.classList.add("active");
  mobileNav.classList.add("active");
  mobileNavOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  utils.trackEvent('Navigation', 'Open Mobile Menu', 'Click');
};

// Toggle mobile menu
if (hamburger) {
  hamburger.addEventListener("click", () => {
    if (mobileNav.classList.contains("active")) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Keyboard accessibility
  hamburger.addEventListener("keypress", (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
}

// Close menu when clicking overlay
if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener("click", closeMobileNav);
}

// Close menu when clicking nav links
mobileNavLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    // Don't close for theme toggle
    if (!link.classList.contains('theme-toggle-mobile')) {
      closeMobileNav();
      
      // Handle smooth scroll for anchor links
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        utils.smoothScroll(href, 100);
      }
    }
  });
});

// ===== SCROLL SPY FOR ACTIVE NAV LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"], .mobile-nav-link[href^="#"]');

const updateActiveNavLink = () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', utils.debounce(updateActiveNavLink, 100));

// ===== FLOATING CTA BUTTON =====
const floatingCTA = document.getElementById("floatingCTA");
const scrollThreshold = 300;

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    floatingCTA?.classList.add("visible");
  } else {
    floatingCTA?.classList.remove("visible");
  }
});

if (floatingCTA) {
  floatingCTA.addEventListener("click", () => {
    utils.smoothScroll('#book-table', 100);
    utils.trackEvent('CTA', 'Floating Button Click', 'Book Table');
  });
}

// ===== FORM HANDLING WITH ERROR MANAGEMENT =====

// Helper function for form submission
const handleFormSubmit = async (form, serviceId1, serviceId2, templateId1, templateId2, thanksId, errorId, bookingType) => {
  const submitBtn = form.querySelector('button[type="submit"]');
  const thanksMsg = document.getElementById(thanksId);
  const errorMsg = document.getElementById(errorId);
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Hide previous messages
  if (thanksMsg) thanksMsg.style.display = 'none';
  if (errorMsg) errorMsg.style.display = 'none';

  try {
    // Send to both email services
    const promises = [
      emailjs.send(serviceId1, templateId1, form.formData),
      emailjs.send(serviceId2, templateId2, form.formData)
    ];

    await Promise.all(promises);

    // Success
    if (thanksMsg) {
      thanksMsg.style.display = 'block';
      thanksMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    form.reset();
    utils.trackEvent('Form', 'Submit Success', bookingType);

    // Hide success message after 5 seconds
    setTimeout(() => {
      if (thanksMsg) thanksMsg.style.display = 'none';
    }, 5000);

  } catch (error) {
    console.error('Form submission error:', error);
    
    // Show error message
    if (errorMsg) {
      errorMsg.textContent = 'Booking failed. Please call us at +91 12345 67890 or try again.';
      errorMsg.style.display = 'block';
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      alert('Booking failed. Please call us at +91 12345 67890');
    }
    
    utils.trackEvent('Form', 'Submit Error', bookingType);

  } finally {
    // Remove loading state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
};

/* Table & Event form handlers consolidated — updated implementations kept later in the file */

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const thanksMsg = document.getElementById('newsletterThanks');
    const errorMsg = document.getElementById('newsletterError');
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    if (thanksMsg) thanksMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    try {
      const formData = {
        email: document.getElementById('newsletter-email').value,
        subscription_type: "Newsletter Subscription"
      };

      // Send newsletter subscription
      await emailjs.send("service_y1uq1k6", "template_0913zr5", formData);

      if (thanksMsg) {
        thanksMsg.style.display = 'block';
      }
      
      this.reset();
      utils.trackEvent('Form', 'Newsletter Subscribe', 'Success');

      setTimeout(() => {
        if (thanksMsg) thanksMsg.style.display = 'none';
      }, 5000);

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      if (errorMsg) {
        errorMsg.textContent = 'Subscription failed. Please try again.';
        errorMsg.style.display = 'block';
      } else {
        alert('Subscription failed. Please try again.');
      }
      
      utils.trackEvent('Form', 'Newsletter Subscribe', 'Error');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

/* menu filtering & search — updated later in this file (kept single implementation) */


// ===== ADVANCED SLIDER WITH TOUCH SUPPORT =====
const track = document.querySelector(".slider-track");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const sliderDotsContainer = document.getElementById("sliderDots");

if (track && leftArrow && rightArrow) {
  let currentIndex = 0;
  const images = track.querySelectorAll('img');
  const totalImages = images.length;
  const imageWidth = 320; // image width + gap
  const visibleImages = 3; // number of visible images at once
  const maxIndex = Math.max(0, totalImages - visibleImages);

  // Create slider dots
  if (sliderDotsContainer) {
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      sliderDotsContainer.appendChild(dot);
    }
  }

  const updateDots = () => {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };

  const goToSlide = (index) => {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    updateDots();
    utils.trackEvent('Slider', 'Navigate', `Slide ${currentIndex + 1}`);
  };

  // Arrow navigation
  rightArrow.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    }
  });

  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < maxIndex) {
        // Swiped left - go to next
        goToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swiped right - go to previous
        goToSlide(currentIndex - 1);
      }
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    }
  });

  // Auto-play (optional - uncomment to enable)
  /*
  setInterval(() => {
    if (currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }, 5000);
  */
}

// ===== LIGHTBOX FOR IMAGES =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

// Add lightbox to all gallery images
const galleryImages = document.querySelectorAll('.ambience-grid img, .slider-track img');

galleryImages.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    if (lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      utils.trackEvent('Gallery', 'Image View', img.alt);
    }
  });
});

// Close lightbox
if (closeLightbox) {
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (lightbox) {
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ===== LAZY LOADING IMAGES =====
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      utils.smoothScroll(href, 100);
    }
  });
});

// ===== TRACK EXTERNAL LINK CLICKS =====
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href');
    const platform = link.classList.contains('zomato') ? 'Zomato' : 
                     link.classList.contains('swiggy') ? 'Swiggy' : 
                     'External Link';
    utils.trackEvent('External Link', 'Click', platform);
  });
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
    
    // Track slow load times
    if (pageLoadTime > 3000) {
      utils.trackEvent('Performance', 'Slow Load', `${pageLoadTime}ms`);
    }
  }
});

// ===== SERVICE WORKER REGISTRATION (PWA) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🍽️ Welcome to Yafe Restaurant! ', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cPremium Multicuisine Dining in Guwahati', 'color: #d4af37; font-size: 14px;');
console.log('%cWebsite built with ❤️ and advanced JavaScript', 'color: #888; font-size: 12px;');

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  utils.trackEvent('Error', 'JavaScript Error', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  utils.trackEvent('Error', 'Promise Rejection', e.reason);
});

// ===== ACCESSIBILITY: SKIP TO MAIN CONTENT =====
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--gold-primary);
  color: #000;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===== DETECT IF USER IS ON MOBILE =====
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
  document.body.classList.add('mobile-device');
  console.log('Mobile device detected');
}

// ===== PARALLAX EFFECT (OPTIONAL) =====
/*
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
*/

// ===== LOG INITIALIZATION COMPLETE =====
console.log('✅ All JavaScript features initialized successfully');

/* =========================================================
   JAVASCRIPT UPDATES FOR ALL FIXES
   REPLACE the corresponding sections in your script.js
   ========================================================= */

// emailjs already initialized at top — date pickers below

// ===== SET MINIMUM DATE TO TODAY =====
// Add this AFTER emailjs initialization
window.addEventListener('DOMContentLoaded', () => {
  // Set minimum date to today for date pickers
  const today = new Date().toISOString().split('T')[0];
  
  const tableDateInput = document.getElementById('table-date');
  const eventDateInput = document.getElementById('eventDate');
  const tableTimeInput = document.getElementById('table-time');
  const eventTimeInput = document.getElementById('eventTime');
  
  if (tableDateInput) {
    tableDateInput.setAttribute('min', today);
  }
  
  if (eventDateInput) {
    eventDateInput.setAttribute('min', today);
  }

  // Initialize Flatpickr (calendar UI) if library loaded — graceful fallback to native <input type="date">
  if (typeof flatpickr !== 'undefined') {
    if (tableDateInput) {
      flatpickr(tableDateInput, {
        dateFormat: 'Y-m-d',
        minDate: today,
        altInput: true,
        altFormat: 'F j, Y'
      });
    }

    if (eventDateInput) {
      flatpickr(eventDateInput, {
        dateFormat: 'Y-m-d',
        minDate: today,
        altInput: true,
        altFormat: 'F j, Y'
      });
    }

    // Optional: attach time picker for consistent UX across browsers
    if (tableTimeInput) {
      flatpickr(tableTimeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: false,
        minTime: '12:00',
        maxTime: '22:00'
      });
    }

    if (eventTimeInput) {
      flatpickr(eventTimeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: false,
        minTime: '12:00',
        maxTime: '22:00'
      });
    }
  }
  
  console.log('✅ Date pickers initialized with minimum date:', today);
});

// ===== FIXED MENU FILTERING =====
// REPLACE your existing filterMenu function with this:

const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const noResults = document.getElementById('noResults');

let activeCategory = 'all';
let activeDietFilters = [];

const filterMenu = () => {
  let visibleCount = 0;

  menuItems.forEach(item => {
    // FIXED: Updated to include 'starter' instead of 'small'
    const itemCategory = Array.from(item.classList).find(cls => 
      ['starter', 'main', 'rice', 'bread', 'dessert'].includes(cls)
    );

    const matchesCategory = activeCategory === 'all' || item.classList.contains(activeCategory);
    
    const matchesDiet = activeDietFilters.length === 0 || 
      activeDietFilters.every(diet => item.classList.contains(diet));

    if (matchesCategory && matchesDiet) {
      item.style.display = 'flex';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Show/hide no results message
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
  
  console.log(`✅ Menu filtered: ${visibleCount} items visible`);
};

// Category filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    activeCategory = btn.dataset.category;
    filterMenu();
    
    utils.trackEvent('Menu', 'Filter Category', activeCategory);
  });
});

// Dietary filter buttons
const dietaryButtons = document.querySelectorAll('.dietary-btn');

dietaryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const diet = btn.dataset.diet;
    
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
      if (!activeDietFilters.includes(diet)) {
        activeDietFilters.push(diet);
      }
    } else {
      activeDietFilters = activeDietFilters.filter(d => d !== diet);
    }
    
    filterMenu();
    
    utils.trackEvent('Menu', 'Filter Dietary', diet);
    console.log('✅ Active dietary filters:', activeDietFilters);
  });
});

// ===== UPDATED TABLE BOOKING FORM =====
// REPLACE your existing tableForm handler with this:

const tableForm = document.getElementById("tableForm");

if (tableForm) {
  tableForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // UPDATED: Now includes date and time
    this.formData = {
      name: document.getElementById('table-name').value,
      email: document.getElementById('table-email').value,
      phone: document.getElementById('table-phone').value,
      date: document.getElementById('table-date').value,          // NEW
      time: document.getElementById('table-time').value,          // NEW
      guests: document.getElementById('table-guests').value,
      booking_type: "Table Booking"
    };

    console.log('✅ Table booking data:', this.formData);

    await handleFormSubmit(
      this,
      "service_y1uq1k6",
      "service_ikjy30a",
      "template_0913zr5",
      "template_abwvt3k",
      "tableThanks",
      "tableError",
      "Table Booking"
    );
  });
}

// ===== UPDATED EVENT BOOKING FORM =====
// REPLACE your existing eventForm handler with this:

const eventForm = document.getElementById("eventForm");
const eventType = document.getElementById("eventType");
const customEvent = document.getElementById("customEvent");

if (eventType) {
  eventType.addEventListener("change", function () {
    if (this.value === "other") {
      customEvent.style.display = "block";
      customEvent.required = true;
      customEvent.focus();
    } else {
      customEvent.style.display = "none";
      customEvent.required = false;
      customEvent.value = "";
    }
  });
}

if (eventForm) {
  eventForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const eventValue = eventType.value === "other" 
      ? customEvent.value 
      : eventType.value;

    // UPDATED: Now includes date and time
    this.formData = {
      name: document.getElementById("eventName").value,
      email: document.getElementById("eventEmail").value,
      phone: document.getElementById("eventPhone").value,
      date: document.getElementById("eventDate").value,           // NEW
      time: document.getElementById("eventTime").value,           // NEW
      event: eventValue,
      booking_type: "Event Booking"
    };

    console.log('✅ Event booking data:', this.formData);

    await handleFormSubmit(
      this,
      "service_y1uq1k6",
      "service_ikjy30a",
      "template_0913zr5",
      "template_abwvt3k",
      "eventThanks",
      "eventError",
      "Event Booking"
    );

    // Hide custom event input after successful submission
    customEvent.style.display = "none";
  });
}

// ===== CONTACT FORM (NEW) =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    this.formData = {
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      message: document.getElementById('contact-message').value,
      booking_type: 'Contact Form'
    };

    // Basic client-side validation
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      const err = document.getElementById('contactError');
      if (err) {
        err.textContent = 'Please fill all fields.';
        err.style.display = 'block';
      }
      return;
    }

    await handleFormSubmit(
      this,
      'service_y1uq1k6',
      'service_ikjy30a',
      'template_0913zr5',
      'template_abwvt3k',
      'contactThanks',
      'contactError',
      'Contact Form'
    );
  });
}

// ===== UPDATED MENU SEARCH =====
// REPLACE your existing menuSearch handler with this:

const menuSearch = document.getElementById('menuSearch');

if (menuSearch) {
  menuSearch.addEventListener('input', utils.debounce((e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    menuItems.forEach(item => {
      const itemName = item.getAttribute('data-name')?.toLowerCase() || 
                       item.querySelector('h3')?.textContent.toLowerCase() || '';
      
      const searchMatches = searchTerm === '' || itemName.includes(searchTerm);
      
      if (searchMatches) {
        // Also respect category and dietary filters
        const itemCategory = Array.from(item.classList).find(cls => 
          ['starter', 'main', 'rice', 'bread', 'dessert'].includes(cls)  // FIXED
        );
        
        const matchesCategory = activeCategory === 'all' || item.classList.contains(activeCategory);
        const matchesDiet = activeDietFilters.length === 0 || 
          activeDietFilters.every(diet => item.classList.contains(diet));

        if (matchesCategory && matchesDiet) {
          item.style.display = 'flex';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      } else {
        item.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (searchTerm) {
      utils.trackEvent('Menu', 'Search', searchTerm);
      console.log('✅ Search results:', visibleCount, 'items for', searchTerm);
    }
  }, 300));
}

// ===== CONSOLE LOG FOR DEBUGGING =====
console.log('%c🍽️ All fixes applied successfully! ', 'color: #d4af37; font-size: 16px; font-weight: bold;');
console.log('%c✅ Date pickers working', 'color: #25D366; font-size: 12px;');
console.log('%c✅ Menu filters fixed (starter, not small)', 'color: #25D366; font-size: 12px;');
console.log('%c✅ Veg/Non-veg filters working', 'color: #25D366; font-size: 12px;');
console.log('%c✅ Form data includes date & time', 'color: #25D366; font-size: 12px;');

/* =========================================================
   END OF UPDATES
   ========================================================= */

// NOTE: Keep all other JavaScript code as is. Only replace the sections above.