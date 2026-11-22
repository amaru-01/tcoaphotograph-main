/* ======================== LOADER ======================== */
/* Hide the loader once the page's first big photo is ready, not after every
   photo on the page has downloaded. A 2.5s cap keeps slow networks from
   staring at the loader. */
(() => {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const start = performance.now();
    const MIN_SHOW = 900;   // keep the original loader timing feel
    const MAX_WAIT = 2500;
    let done = false;

    function hide() {
        if (done) return;
        done = true;
        const wait = Math.max(0, MIN_SHOW - (performance.now() - start));
        setTimeout(() => {
            loader.classList.add('hidden');
            const hero = document.getElementById('hero');
            if (hero) hero.classList.add('loaded');
        }, wait);
    }

    function whenFirstImageReady() {
        const first = document.querySelector('.hero__bg img, .page-hero__bg img');
        if (!first || first.complete) return hide();
        first.addEventListener('load', hide, { once: true });
        first.addEventListener('error', hide, { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', whenFirstImageReady, { once: true });
    } else {
        whenFirstImageReady();
    }
    setTimeout(hide, MAX_WAIT);
})();
