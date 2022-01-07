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