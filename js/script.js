
window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          timer = require('./modules/timer'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          calc = require('./modules/calc'),
          slider = require('./modules/slider');

    tabs();
    modal();
    timer();
    calc();
    slider();
    forms();
    cards();

});













// // SLIDES
// const current = document.querySelector('#current'),
//       totalSlides = document.querySelector('#total'),
//       prevSlide = document.querySelector('.offer__slider-prev'),
//       nextSlide = document.querySelector('.offer__slider-next'),
//       sliderWrapper = document.querySelector('.offer__slider-wrapper');


// class SliderItem {
//     constructor(src, alt, id) {
//         this.src = src;
//         this.alt = alt;
//         this.id = id;
//     }
//     createSlide() {
//     const element = document.createElement('div');
//     element.classList.add("offer__slide");

//             if (this.id == current.textContent) {
//             element.innerHTML = `<img src="${this.src}" alt="${this.alt}">`;
//             document.querySelector(".offer__slider-wrapper").append(element);
//             }
//     }
// }



// const getSlider = async (url) => {
//     const res = await fetch(url);

//     if (!res.ok) {
//         throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
//     }

//     return await res.json();
// };

// const yyy = getSlider('http://localhost:3000/slides');
// console.log(getSlider('http://localhost:3000/slides'));

// let aaa = async function getSlider() {
//     try {
//       const response = await axios.get('http://localhost:3000/slides');
//     //   aaaaa = response;
//     return await response;
//     } .then {
//       console.error(error);
//     }
//   };

// aaa();
// const bbb = aaa();
// console.log(bbb);

// const slides = axios.get('http://localhost:3000/slides')
// .then(data => {
//     const sss = data;
//     data.data.forEach(({src, alt, id}) =>{
//         // new SliderItem(src, alt, id).createSlide();
//         console.log(new SliderItem(src, alt, id));
     
//     });
//     totalSlides.innerHTML = `${data.data.length}`;
//     return sss;
// });

// console.log(slides);

// nextSlide.addEventListener('click', (e) => {
//     if (current.textContent == 4) {
//     current.innerHTML = `1`;
//     } else {
//     current.innerHTML = `${++current.textContent}`;
//     }
//     sliderWrapper.innerHTML = '';
//     axios.get('http://localhost:3000/slides')
// .then(data => {
//     // console.log(data.data[current.textContent-1]); 
//     // data.data.forEach(({src, alt, id}) =>{
//     //             new SliderItem(src, alt, id).createSlide();
//     //         });
//     if (data.data.id == current.textContent-1) {
//     data.data[current.textContent].forEach(({src, alt, id}) =>{
//                 new SliderItem(src, alt, id).createSlide();
//             });
//         }
// });
// });




// nextSlide.addEventListener('click', (e) => {
//     if (current.textContent == 4) {
//     current.innerHTML = `1`;
//     } else {
//     current.innerHTML = `${++current.textContent}`;
//     }
//     sliderWrapper.innerHTML = '';
//     axios.get('http://localhost:3000/slides')
// .then(data => {
//     data.data.forEach(({src, alt, id}) =>{
//         new SliderItem(src, alt, id).createSlide();
//     });
        
// });
// });

// prevSlide.addEventListener('click', (e) => {
//     if (current.textContent == 1) {
//         current.innerHTML = `4`;
//         } else {
//         current.innerHTML = `${--current.textContent}`;
//         }
//     sliderWrapper.innerHTML = '';
//     axios.get('http://localhost:3000/slides')
// .then(data => {
//     data.data.forEach(({src, alt, id}) =>{
//         new SliderItem(src, alt, id).createSlide();
        
//     });
// });
// });







// closeModal.addEventListener('click', () => {
//     modalWindow.style.removeProperty('display');

// });

                            // const slides = axios.get('http://localhost:3000/slides')
                            // .then(data => {
                            //     data.data.forEach(({src, alt, id}) =>{
                                
                            //         new SliderItem(src, alt, id).createSlide();
                                
                            //     });
                            // });





                            // MY SLIDER




// class SliderItem {
//     constructor(src, alt, id) {
//         this.src = src;
//         this.alt = alt;
//         this.id = id;
//     }
//     createSlide() {
//     const element = document.createElement('div');
//     element.classList.add("offer__slide");

//             if (this.id == current.textContent) {
//             element.innerHTML = `<img src="${this.src}" alt="${this.alt}">`;
//             document.querySelector(".offer__slider-wrapper").append(element);
//             }
//     }
// }

// totalSlides.innerHTML = axios.get('http://localhost:3000/slides')
// .then(data => {
//     if (data.data.length > 9) {
//     totalSlides.innerHTML = `${data.data.length}`;   
//     } else {
//     totalSlides.innerHTML = `0${data.data.length}`;   
//     }
//     });


// nextSlide.addEventListener('click', (e) => {
    
//     const slides = axios.get('http://localhost:3000/slides')
// .then(data => {
//     if (current.textContent == data.data.length) {
//         current.innerHTML = `01`;
//         } else if (current.textContent >= 9){
//         current.innerHTML = `${++current.textContent}`;
//         } else {
//         current.innerHTML = `0${++current.textContent}`;
//         }
//         sliderWrapper.innerHTML = '';
//     data.data.forEach(({src, alt, id}) =>{
//         new SliderItem(src, alt, id).createSlide();
        
//     });
// });
// });

// prevSlide.addEventListener('click', (e) => {
//     e.preventDefault();
    
//     const slides = axios.get('http://localhost:3000/slides')
// .then(data => {

    
//     if (current.textContent == 1) {
//         if (data.data.length >= 9) {
//         current.innerHTML = `${data.data.length}`;
//         } else {
//         current.innerHTML = `0${data.data.length}`;
//         }
//         } else {
//             current.innerHTML = `0${--current.textContent}`;
//             }
//     sliderWrapper.innerHTML = '';
//     data.data.forEach(({src, alt, id}) =>{
//         new SliderItem(src, alt, id).createSlide();
        
//     });
// });
// });
                            