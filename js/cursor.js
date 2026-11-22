/* ======================== CUSTOM CURSOR ======================== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top  = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .gallery__item, .creativity__item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform   = 'translate(-50%, -50%) scale(2)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'rgba(224,145,69,0.9)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'rgba(224,145,69,0.5)';
        });
    });
}
