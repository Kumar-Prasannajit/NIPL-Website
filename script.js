const barIcon = document.querySelector('#baricon');
const menuOverlay = document.querySelector('.menu-overlay');

barIcon.addEventListener('click', () => {
    requestAnimationFrame(() => {
        barIcon.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });
});

let xscale = 1;
let yscale = 1;
let xprev = 0;
let yprev = 0;
let timeout;

let mouseX = 0;
let mouseY = 0;

function circleMouseFollower(dets){ 
    const minicircle = document.querySelector("#minicircle");
    requestAnimationFrame(() => {
        minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

function squeezeMiniCircle(){
    window.addEventListener('mousemove', function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(dets);        timeout = setTimeout(() => {
            const minicircle = document.querySelector('#minicircle');
            minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

squeezeMiniCircle();

// Animation for navbar elements
gsap.to("#nav .bounding-elem", {
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out"
});

// Animation for main content
gsap.to("#landingMain .bounding-elem", {
    y: 0,
    duration: 1,
    stagger: 0.2,
    delay: 0.5,
    ease: "power4.out"
});

// Animation for footer elements (from bottom)
gsap.to("#landingfooter .bounding-elem", {
    y: 0,
    duration: 1,
    stagger: 0.2,
    delay: 1.5,
    ease: "power4.out"
});