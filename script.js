(function () {
  emailjs.init("GOydHJrIyoANtr4L5");
})();

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  
  // Set a minimum display time for a premium feel (1.5-2 seconds)
  const minLoadTime = 1800; // 1.8 seconds
  const startTime = Date.now();
  
  // Function to hide preloader
  const hidePreloader = () => {
    preloader.classList.add('hide');
    // Remove from DOM after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  };
  
  // Calculate remaining time to reach minimum duration
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(0, minLoadTime - elapsedTime);
  
  // Hide preloader after minimum time
  setTimeout(hidePreloader, remainingTime);
});

// Fallback: Hide preloader if it takes too long
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hide')) {
    preloader.classList.add('hide');
  }
}, 3500);

/* TABLE BOOKING */
const tableForm = document.getElementById("tableForm");

if (tableForm) {
  tableForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      name: this.querySelector("input[type='text']").value,
      email: this.querySelector("input[type='email']").value,
      phone: this.querySelector("input[type='tel']").value,
      guests: this.querySelector("select").value,
      booking_type: "Table Booking"
    };

    emailjs.send("service_y1uq1k6", "template_0913zr5", data);
    emailjs.send("service_ikjy30a", "template_abwvt3k", data);

    document.getElementById("tableThanks").style.display = "block";
    this.reset();
  });
}

/* EVENT BOOKING */
const eventForm = document.getElementById("eventForm");
const eventType = document.getElementById("eventType");
const customEvent = document.getElementById("customEvent");

if (eventType) {
  eventType.addEventListener("change", function () {
    if (this.value === "other") {
      customEvent.style.display = "block";
      customEvent.required = true;
    } else {
      customEvent.style.display = "none";
      customEvent.required = false;
    }
  });
}

if (eventForm) {
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const email = document.getElementById("eventEmail").value;
    const phone = document.getElementById("eventPhone").value;

    const eventValue =
      eventType.value === "other"
        ? customEvent.value
        : eventType.value;

    const data = {
      name: name,
      email: email,
      phone: phone,
      event: eventValue,
      booking_type: "Event Booking"
    };

    emailjs.send("service_y1uq1k6", "template_0913zr5", data);
    emailjs.send("service_ikjy30a", "template_abwvt3k", data);

    document.getElementById("eventThanks").style.display = "block";
    eventForm.reset();
    customEvent.style.display = "none";
  });
}


/* MENU FILTER */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.category;

    document.querySelectorAll('.menu-item').forEach(item => {
      if (category === "all") {
        item.style.display = "flex";
      } else {
        item.style.display = item.classList.contains(category) ? "flex" : "none";
      }
    });

  });
});

/* ===== WORKING SLIDER ===== */

const track = document.querySelector(".slider-track");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

let currentIndex = 0;
const imageWidth = 320; // image + margin

rightArrow.addEventListener("click", () => {
  const maxIndex = track.children.length - 3;

  if (currentIndex < maxIndex) {
    currentIndex++;
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }
});

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }
});

/* ===== MOBILE NAVIGATION ===== */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  mobileNavOverlay.classList.toggle("active");
  document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "auto";
});

// Close menu when clicking overlay
mobileNavOverlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
  mobileNavOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close menu when clicking nav links
mobileNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
    mobileNavOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

/* ===== FLOATING CTA BUTTON ===== */
const floatingCTA = document.getElementById("floatingCTA");
const scrollThreshold = 300;

// Show/hide floating button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    floatingCTA.classList.add("visible");
  } else {
    floatingCTA.classList.remove("visible");
  }
});

// Smooth scroll to book-table section
floatingCTA.addEventListener("click", () => {
  const bookTableSection = document.getElementById("book-table");
  if (bookTableSection) {
    bookTableSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

