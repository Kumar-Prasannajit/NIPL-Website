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

document.addEventListener('DOMContentLoaded', () => {

    // Add variables for navbar hide/show functionality
    let lastScrollTop = 0;
    const navbar = document.querySelector('#nav');
    const navbarHeight = navbar.offsetHeight;
    let scrollTimeout;

    // Function to hide navbar
    const hideNavbar = () => {
        if (window.scrollY > document.querySelector('#landingPage').offsetHeight) {
            gsap.to(navbar, {
                y: -navbarHeight,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    };

    // Set initial timeout to hide navbar after 1 second
    scrollTimeout = setTimeout(hideNavbar, 1000);

    window.addEventListener('scroll', () => {
        // Clear the timeout on scroll
        clearTimeout(scrollTimeout);
        
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only apply scroll behavior after landing page
        if (scrollTop > document.querySelector('#landingPage').offsetHeight) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                gsap.to(navbar, {
                    y: -navbarHeight,
                    duration: 0.3,
                });
            } else {
                // Scrolling up
                gsap.to(navbar, {
                    y: 0,
                    duration: 0.3,
                });
            }
            
            // Set new timeout after scroll stops
            scrollTimeout = setTimeout(hideNavbar, 1000);
        } else {
            // Reset navbar position when on landing page
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
            });
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
});

function createInfiniteLoop() {
    const track = document.querySelector(".scroll-track");
    const item = document.querySelector(".scroll-item");

    const itemWidth = item.offsetWidth;

    // Duplicate items to make it seamless
    track.appendChild(item.cloneNode(true));
    track.appendChild(item.cloneNode(true)); // optional second clone for better smoothness

    gsap.to(track, {
        x: `-=${itemWidth}`,
        duration: 10,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % itemWidth)
        }
    });
}

createInfiniteLoop();

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
  });

  // Add this inside your DOMContentLoaded event listener
const grid = document.querySelector('#grid');
const minicircle = document.querySelector('#minicircle');

grid.addEventListener('mouseenter', () => {
    minicircle.classList.add('enlarged');
    minicircle.innerHTML = '<span><h2><i class="ri-contract-right-line"></i></h2></span>';
});

grid.addEventListener('mouseleave', () => {
    minicircle.classList.remove('enlarged');
    minicircle.innerHTML = '';
});

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Select all lines of text
    const lines = document.querySelectorAll(".splittext");

    // Create animation for each line
    gsap.from(lines, {
        y: 100,
        opacity: 0,
        stagger: 0.1, // Increased stagger for more noticeable line effect
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: "#infopage",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations for sbox hover
    document.querySelectorAll('.sbox').forEach(box => {
        const content = box.querySelector('.sbox-content');
        const hoverContent = box.querySelector('.sbox-hover');
        let isAnimating = false;
        let currentTl = null;
        
        // Set initial states
        gsap.set(content, { y: 0, opacity: 1 });
        gsap.set(hoverContent, { opacity: 0, y: 30 });
        
        // Mouse enter
        box.addEventListener('mouseenter', () => {
            if (isAnimating) {
                currentTl?.kill();
            }
            
            // Create timeline for sequenced animation
            const tl = gsap.timeline({
                onStart: () => isAnimating = true,
                onComplete: () => isAnimating = false
            });
            
            currentTl = tl;
            
            // First fade out existing content upward
            tl.to(content, {
                y: -50,
                opacity: 0,
                duration: 0.4,
                ease: "power3.inOut"
            })
            // Then smoothly fade in hover content
            .to(hoverContent, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power3.out"
            });
        });
        
        // Mouse leave
        box.addEventListener('mouseleave', () => {
            if (isAnimating) {
                currentTl?.kill();
            }
            
            // Hide hover content immediately
            gsap.set(hoverContent, {
                opacity: 0,
                y: 30
            });
            
            // Create new timeline for leave animation
            const tl = gsap.timeline({
                onStart: () => isAnimating = true,
                onComplete: () => isAnimating = false
            });
            
            currentTl = tl;
            
            // Reveal original content from bottom
            tl.fromTo(content,
                { y: 50, opacity: 0 },
                { 
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out"
                }
            );
        });
    });
});

// Image animations
document.querySelectorAll(".elem").forEach(elem => {
    let image = elem.querySelector("img");
    let tl = gsap.timeline();
    let xTransform = gsap.utils.random(-100, 100);

    tl.set(image, {
        transformOrigin: `${xTransform < 0 ? 0 : '100%'}`,
    }, "start")
    .to(image, {
        scale: 0,
        ease: "none",
        scrollTrigger: {
            trigger: image,
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    }, "start")
    .to(elem, {
        xPercent: xTransform,
        ease: "none",
        scrollTrigger:{
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    })
});