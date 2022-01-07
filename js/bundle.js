/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
    }

    function activeDefault(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (localStorage.getItem('sex') === elem.getAttribute('id')){
                elem.classList.add(activeClass);
            }

            if (localStorage.getItem('ratio') === elem.getAttribute('data-ratio')){
                elem.classList.add(activeClass);
            }
            
        });


    }

    activeDefault('#gender div','calculating__choose-item_active');
    activeDefault('.calculating__choose_big div','calculating__choose-item_active');

    function calculate() {
        if (!sex || !height || !weight || !ratio || !age) {
            result.textContent = '___';
            return;
        } 
        if (sex === 'female') {
            result.textContent = Math.round((655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)) * ratio);
        } else {
            result.textContent = Math.round((66.5 + (13.75 * weight) + (5 * height) - (6.775 * age)) * ratio);
        }
    }

    function getStatic (parentSelector, classof) {
        const elements = document.querySelectorAll(`${parentSelector} div`);


        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {


               if (e.target.getAttribute('data-ratio')) {
                    ratio = e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
               } else {
                   sex = e.target.getAttribute('id');
                   localStorage.setItem('sex', e.target.getAttribute('id'));

               }
               
               elements.forEach(elem => {
                elem.classList.remove(classof);
            });

               elem.classList.add(classof);

              console.log(sex, ratio);

              calculate();
               
            });
            
        });
    }

    function getDynamic(parentForm){
        const forms = document.querySelectorAll(`${parentForm} input`);

        forms.forEach(form => {
            form.addEventListener('input', (e) => {
                if (e.target.value.match(/\D/g)){
                    e.target.style.border = '1px solid red';
                } else {
                    e.target.style.border = 'none';
                }

                switch (e.target.getAttribute('id')) {
                    case 'weight':
                        weight = +e.target.value;
                        console.log(weight);
                        break;
                    case 'height':
                        height = +e.target.value;
                        console.log(height);
                        break;
                    case 'age':
                        age = +e.target.value;
                        console.log(age);
                        break;
                }
        calculate();
            });
        });
    }



    getStatic('#gender','calculating__choose-item_active');
    getStatic('.calculating__choose_big','calculating__choose-item_active');
    getDynamic('.calculating__choose_medium');

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    
    class MenuItem {
        constructor(img, title, descr, price, itemSelector, ...classes) {
            this.itemSelector = document.querySelector(itemSelector);
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // newItem () {
        //     const obolochka = document.querySelector(`.${this.itemSelector}:nth-child(${this.nomerItema})`),
        //           image = obolochka.querySelector('img'),
        //           subt = obolochka.querySelector('.menu__item-subtitle'),
        //           description = obolochka.querySelector('.menu__item-descr'),
        //           itemPrice = obolochka.querySelector('.menu__item-total');

        //     image.src = this.img;
        //     subt.innerHTML = this.subtitle;
        //     description.innerHTML = this.descr;
        //     itemPrice.innerHTML =  `<span>${this.price}</span> грн/день`;
        //     console.log('object');

        // }
        createItem() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `<img src="${this.img}" alt="elite">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            this.itemSelector.append(element);
        }


    }
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, title, descr, price}) =>{
    //             new MenuItem(img, title, descr, price, '.menu .container').createItem();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, title, descr, price}) =>{
                new MenuItem(img, title, descr, price, '.menu .container').createItem();
            });
        });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: "img/form/spinner.svg",
        success: "Thank you, soon tobi pizda",
        failure: "Something went wrong"
    };

    forms.forEach(item => {
        bindPostData(item);
    });

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    // form.reset();
                    statusMessage.remove();
            }).catch(() => {
                    showThanksModal(message.failure);
            }).finally(() => {
                    form.reset(); 
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        openM();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            closeM();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const openModal = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal'),
    closeOver = document.querySelector('.modal__dialog'),
    body = document.querySelector('body');

openModal.forEach(item => {
    item.addEventListener('click', openM);
});

function openM() {
    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
}

function closeM() {
    modalWindow.style.display = 'none';
    document.body.style.overflow = '';
}
const modalTimer = setTimeout(openM, 500000);

modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
        closeM();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalWindow.style.display == 'block') {
        closeM();
    }
});


function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openM();
        clearInterval(modalTimer);
        window.removeEventListener('scroll', showModalByScroll);
    }
}



window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none";
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');

    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {

    let deadLine = "2022-05-01";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            "hours": hours,
            "minutes": minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

window.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

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
                            
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map