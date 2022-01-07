function openM(modalSelector, modalTimer) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';

    console.log(modalTimer);
    if (modalTimer) {
        clearInterval(modalTimer);
    }
}

function closeM(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'none';
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer) {
    const openModal = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector),
    closeOver = document.querySelector('.modal__dialog'),
    body = document.querySelector('body');

openModal.forEach(item => {
    item.addEventListener('click', () =>  openM(modalSelector, modalTimer));
});


modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
        closeM(modalSelector);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalWindow.style.display == 'block') {
        closeM(modalSelector);
    }
});


function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openM(modalSelector, modalTimer);
        clearInterval(modalTimer);
        window.removeEventListener('scroll', showModalByScroll);
    }
}



window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeM};
export {openM};