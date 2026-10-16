/**
 * UNOFFENDED LANDING PAGE — INTERACTIVE SCRIPTS
 * Handles Countdown Timer, FAQ Accordion, Testimonials Carousel,
 * Audio Player simulation, and Mobile Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. STICKY HEADER SHADOW ON SCROLL
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. MOBILE HAMBURGER MENU
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. QUESTIONS ACCORDION
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    headerBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordion items
      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        headerBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Open first accordion item by default for discovery
  if (accordionItems.length > 0) {
    accordionItems[0].classList.add('active');
    accordionItems[0].querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
  }

  // 4. TESTIMONIALS CAROUSEL
  const track = document.getElementById('testimonialsTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    if (!track) return;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });
  }

  if (prevBtn && nextBtn && totalSlides > 0) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });

    // Optional autoplay every 7 seconds, paused on hover
    let autoplayTimer = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 7000);

    const sliderContainer = document.querySelector('.testimonials-slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
      sliderContainer.addEventListener('mouseleave', () => {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateCarousel();
        }, 7000);
      });
    }
  }

  // 5. LIVE COUNTDOWN TIMER TO VIRTUAL BOOK LAUNCH (if element present)
  const daysEl = document.getElementById('daysVal');
  const hoursEl = document.getElementById('hoursVal');
  const minsEl = document.getElementById('minsVal');
  const secsEl = document.getElementById('secsVal');

  if (daysEl) {
    // Target: Saturday, 17 October 2026 at 18:30:00 WAT (UTC+1)
    const targetDate = new Date('2026-10-17T18:30:00+01:00').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  // 6. AUDIO PLAYER SIMULATION
  const playAudioBtn = document.getElementById('playAudioBtn');
  const playIconSvg = document.getElementById('playIconSvg');
  const pauseIconSvg = document.getElementById('pauseIconSvg');
  const playerContainer = document.querySelector('.custom-audio-player');
  const audioTimer = document.getElementById('audioTimer');

  let isPlaying = false;
  let audioSeconds = 0;
  let audioInterval = null;

  if (playAudioBtn && playerContainer && audioTimer) {
    playAudioBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        playerContainer.classList.add('playing');
        playIconSvg.classList.add('hidden');
        pauseIconSvg.classList.remove('hidden');

        audioInterval = setInterval(() => {
          audioSeconds++;
          const mins = Math.floor(audioSeconds / 60);
          const secs = audioSeconds % 60;
          audioTimer.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
        }, 1000);
      } else {
        playerContainer.classList.remove('playing');
        playIconSvg.classList.remove('hidden');
        pauseIconSvg.classList.add('hidden');
        clearInterval(audioInterval);
      }
    });
  }

});
