/* ======================== SCROLL REVEAL ======================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Number(delay));
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    const siblings = el.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const idx = Array.from(siblings).indexOf(el);
    el.dataset.delay = idx * 100;
    revealObserver.observe(el);
});
