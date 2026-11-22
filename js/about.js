/* ======================== ABOUT – SKILL BARS & COUNT-UP ======================== */

/* Skill bars animate when scrolled into view */
const skillsSection = document.querySelector('.about__skills');
if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill__fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillObserver.observe(skillsSection);
}

/* Count-up animation for hero stats */
function countUp(el) {
    const target   = parseInt(el.dataset.count);
    const duration = 1600;
    const step     = target / (duration / 16);
    let current    = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const heroSection = document.getElementById('hero');
if (heroSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.hero__stat-num').forEach(countUp);
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    counterObserver.observe(heroSection);
}
