function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,
    pxDel = +width.replace(/\D/g, '');
  
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
  } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
  }


  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
      slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
      dots = [];

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      if (i == 0){
          dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
  }

  next.addEventListener('click', () => {
      if (offset == pxDel * (slides.length - 1)){
          offset = 0;
      } else {
          offset += pxDel;
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
          slideIndex = 1;
      } else {
          slideIndex++;
      }

      if (slides.length < 10){
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
      if (offset == 0) {
          offset = pxDel * (slides.length - 1);
      } else {
          offset -= pxDel;
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
          slideIndex = slides.length;
      } else {
          slideIndex--;
      }

      if (slides.length < 10){
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;
          offset = pxDel * (slideTo - 1);

          slidesField.style.transform = `translateX(-${offset}px)`;

          if (slides.length < 10){
              current.textContent = `0${slideIndex}`;
          } else {
              current.textContent = slideIndex;
          }

          dots.forEach(dot => dot.style.opacity = '.5');
          dots[slideIndex - 1].style.opacity = 1;
      });
  });

  
  slidesWrapper.addEventListener('click', (e) => {
      console.log(e);
      if (e.layerX >= 0 && e.layerX <= 250){
          if (offset == 0) {
              offset = pxDel * (slides.length - 1);
          } else {
              offset -= pxDel;
          }
  
          slidesField.style.transform = `translateX(-${offset}px)`;
          if (slideIndex == 1) {
              slideIndex = slides.length;
          } else {
              slideIndex--;
          }
  
          if (slides.length < 10){
              current.textContent = `0${slideIndex}`;
          } else {
              current.textContent = slideIndex;
          }
  
          dots.forEach(dot => dot.style.opacity = '.5');
          dots[slideIndex - 1].style.opacity = 1;

      } else if (e.layerX > 300 && e.layerX < 650){
          if (offset == pxDel * (slides.length - 1)){
              offset = 0;
          } else {
              offset += pxDel;
          }
  
          slidesField.style.transform = `translateX(-${offset}px)`;

          if (slideIndex == slides.length) {
          slideIndex = 1;
      } else {
          slideIndex++;
      }

      if (slides.length < 10){
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
      }
  });
}

module.exports = slider;