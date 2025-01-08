// Add header scroll effect
const header1 = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header1.style.background = "rgba(255, 255, 255, 0.85)";
    header1.style.backdropFilter = "blur(10px)";
    header1.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  } else {
    header1.style.background = "var(--background-light)";
    header1.style.backdropFilter = "none";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentSlide = 0;
  const slideCount = slides.length;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlides() {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlides();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
  }

  // Event listeners
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause auto slide on hover
  const heroSlider = document.querySelector(".hero-slider");
  heroSlider.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  heroSlider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  heroSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  heroSlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
});

const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const closeNav = document.querySelector(".close-nav");
const header = document.querySelector(".header");

let lastScroll = 0;
const scrollThreshold = 10;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

hamburger.addEventListener("click", () => {
  mobileNav.classList.add("active");
  document.body.style.overflow = "hidden";
  hamburger.style.display = "none";
});

closeNav.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  document.body.style.overflow = "";
  hamburger.style.display = "flex";
});

// Close mobile nav when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileNav.classList.contains("active") &&
    !mobileNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    mobileNav.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.style.display = "flex";
  }
});
