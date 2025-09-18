  const slides = document.getElementById('slides');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let currentSlide = 0;
  const totalSlides = 3;

  function goToSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
  }

  prevBtn.addEventListener('click', () => {
    let index = currentSlide - 1;
    if (index < 0) index = totalSlides - 1;
    goToSlide(index);
  });

  nextBtn.addEventListener('click', () => {
    let index = (currentSlide + 1) % totalSlides;
    goToSlide(index);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
    });
  });

  // Optional: Auto Slide (Uncomment to enable)
  // setInterval(() => {
  //   let index = (currentSlide + 1) % totalSlides;
  //   goToSlide(index);
  // }, 5000);