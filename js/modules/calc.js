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

export default calc;