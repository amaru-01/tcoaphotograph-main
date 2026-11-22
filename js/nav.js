/* ======================== NAVBAR ======================== */
const navbar    = document.getElementById('navbar');
const navLinks  = document.getElementById('nav-links');
const hamburger = document.getElementById('nav-hamburger');

/* Scroll: add glass background + highlight active link */
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNavLink();
});

/* Hamburger toggle */
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* Highlight nav link for current page (multi-page) or current section (single-page) */
function updateActiveNavLink() {
    if (!navLinks) return;

    /* Multi-page: mark active by current filename */
    /* Cloudflare serves clean URLs (/about instead of /about.html), so compare without ".html" */
    const strip = p => p.replace(/\.html$/, '') || 'index';
    const currentPage = strip(window.location.pathname.split('/').pop());
    navLinks.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href');
        if (strip(href) === currentPage) {
            link.classList.add('active');
        }
    });

    /* Single-page scroll sections */
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = navLinks.querySelector(`[href="#${id}"]`);
        if (link && scrollY >= top && scrollY < top + height) {
            navLinks.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

/* Run once on load */
updateActiveNavLink();
