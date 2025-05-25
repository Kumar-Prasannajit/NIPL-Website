// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    smooth: true
});

// Create RAF loop for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
    const barIcon = document.querySelector('#baricon');
    const menuOverlay = document.querySelector('.menu-overlay');
    const nav = document.querySelector('#nav');
    const navLink = document.querySelector('#nav a');
    const menuText = document.querySelector('.menuDiv h4');

    if (barIcon && menuOverlay) {
        barIcon.addEventListener('click', () => {
            barIcon.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            if (nav && navLink && menuText) {
                if (barIcon.classList.contains('active')) {
                    gsap.to(nav, {
                        backgroundColor: "#FCA311",
                        borderBottomColor: "#00246B",
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                    gsap.to([navLink, menuText], {
                        color: "#00246B",
                        fontWeight: 700,
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                    // Add menu items animation
                    gsap.from('.mobile-menu a', {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(nav, {
                        backgroundColor: "#00246B",
                        borderBottomColor: "#CADCFC",
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                    gsap.to([navLink, menuText], {
                        color: "#fff",
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                }
            }
        });
    }

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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});