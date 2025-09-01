 (function(){
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const slides = track.children;
    const totalSlides = slides.length;

    let currentIndex = 0;

    function isMobile() {
      return window.innerWidth <= 767;
    }

    function slideWidth() {
      return slides[0].getBoundingClientRect().width;
    }

    function updateButtons() {
      if (isMobile()) {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex >= totalSlides - 1 ? 'none' : 'block';
      } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
      }
    }

    function moveToSlide(index) {
      // Clamp index for desktop carousel looping effect
      if (!isMobile()) {
        if(index < 0) index = totalSlides - 3;
        if(index > totalSlides - 3) index = 0;
      } else {
        // Clamp for mobile (no infinite loop)
        if(index < 0) index = 0;
        if(index > totalSlides - 1) index = totalSlides -1;
      }

      currentIndex = index;
      const distance = slideWidth() * currentIndex;
      track.style.transform = `translateX(-${distance}px)`;
      updateButtons();
    }

    prevBtn.addEventListener('click', () => {
      moveToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      moveToSlide(currentIndex + 1);
    });

    window.addEventListener('resize', () => {
      // On resize, reset to start for simplicity
      currentIndex = 0;
      moveToSlide(currentIndex);
    });

    // Initialize
    moveToSlide(currentIndex);
  })();