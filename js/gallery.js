/* ======================== GALLERY FILTER ======================== */
const filterBtns  = document.querySelectorAll('.filter__btn');
const galleryItems = document.querySelectorAll('.gallery__item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

/* ======================== LIGHTBOX ======================== */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev  = document.getElementById('lightbox-prev');
const lightboxNext  = document.getElementById('lightbox-next');

/* Lightbox shows the large file (data-full); the grid shows the small one. */
function fullSrc(img) {
    return img.dataset.full ? new URL(img.dataset.full, location.href).href : img.src;
}

let currentIndex = 0;
let visibleImages = [];

function buildVisibleImages() {
    visibleImages = Array.from(galleryItems)
        .filter(item => !item.classList.contains('hidden'))
        .map(item => fullSrc(item.querySelector('img')));
}

function openLightbox(src) {
    buildVisibleImages();
    currentIndex = visibleImages.indexOf(src);
    if (currentIndex === -1) currentIndex = 0;
    lightboxImg.src = visibleImages[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 400);
}

function navigateLightbox(dir) {
    currentIndex = (currentIndex + dir + visibleImages.length) % visibleImages.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = visibleImages[currentIndex];
        lightboxImg.style.opacity = '1';
    }, 200);
}

/* Only wire up the lightbox on pages that have one. (A bare top-level
   `return` here used to be a SyntaxError that stopped this whole file.) */
if (lightbox) {
    lightboxImg.style.transition = 'opacity 0.2s ease';

    /* Open via zoom button */
    document.querySelectorAll('.gallery__zoom').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            openLightbox(fullSrc(btn.closest('.gallery__item').querySelector('img')));
        });
    });

    /* Open via clicking the card */
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(fullSrc(item.querySelector('img')));
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   navigateLightbox(-1);
        if (e.key === 'ArrowRight')  navigateLightbox(1);
    });
}
