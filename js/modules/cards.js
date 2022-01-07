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