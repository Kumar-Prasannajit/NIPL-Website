// Initialize Lenis (smooth-scrolling)
const lenis = new Lenis({
    duration: 1.2,
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------
    // Query selectors
    // -----------------------
    const barIcon = document.querySelector('#baricon');
    const menuOverlay = document.querySelector('.menu-overlay');
    const nav = document.querySelector('#nav');
    const navLinks = document.querySelectorAll('#nav a');            // NodeList
    const menuText = document.querySelectorAll('.menuDiv h4');      // NodeList
    const landingPage = document.querySelector('#landingPage');

    // -----------------------
    // Helper: isMenuOpen
    // -----------------------
    const isMenuOpen = () => {
        return (barIcon && barIcon.classList.contains('active')) ||
               (menuOverlay && menuOverlay.classList.contains('active')) ||
               document.body.classList.contains('menu-open');
    };

    // -----------------------
    // Side menu toggle (hamburger -> cross)
    // -----------------------
    if (barIcon && menuOverlay) {
        barIcon.addEventListener('click', () => {
            barIcon.classList.toggle('active');
            menuOverlay.classList.toggle('active');

            // toggle a body class so we can easily check & optionally lock scroll
            document.body.classList.toggle('menu-open');

            // force navbar visible when menu opens
            if (nav && barIcon.classList.contains('active')) {
                gsap.to(nav, { y: 0, duration: 0.15 });
            }

            // Preserve your color/weight animations exactly as before
            if (nav) {
                // convert NodeLists to arrays for GSAP
                const elems = [...navLinks, ...menuText];

                if (barIcon.classList.contains('active')) {
                    gsap.to(nav, {
                        backgroundColor: "#FCA311",
                        borderBottomColor: "#00246B",
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                    if (elems.length) {
                        gsap.to(elems, {
                            color: "#00246B",
                            fontWeight: 700,
                            duration: 0.4,
                            ease: "power2.inOut"
                        });
                    }
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
                    if (elems.length) {
                        gsap.to(elems, {
                            color: "#fff",
                            duration: 0.4,
                            ease: "power2.inOut"
                        });
                    }
                }
            }
        });
    }

    // -----------------------
    // Responsive heading update
    // -----------------------
    function updateDeepTechLayout() {
        const heading = document.getElementById("deepTechHeading");
        if (!heading) return;

        const isMobile = window.innerWidth <= 768;
        const textDesktop = "Building Deep Tech";
        const textMobile = "Building Deep<br>Tech";

        if (isMobile && !heading.innerHTML.includes("<br>")) {
            heading.innerHTML = textMobile;
        } else if (!isMobile && heading.innerHTML !== textDesktop) {
            heading.innerHTML = textDesktop;
        }
    }
    updateDeepTechLayout();
    window.addEventListener("resize", updateDeepTechLayout);

    // -----------------------
    // Mouse follower circle
    // -----------------------
    let xscale = 1, yscale = 1, xprev = 0, yprev = 0, followerTimeout;
    function circleMouseFollower(dets) {
        const minicircle = document.querySelector("#minicircle");
        if (!minicircle) return;
        requestAnimationFrame(() => {
            minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
        });
    }
    window.addEventListener('mousemove', dets => {
        clearTimeout(followerTimeout);
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(dets);
        followerTimeout = setTimeout(() => {
            const minicircle = document.querySelector('#minicircle');
            if (minicircle) minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });

    // -----------------------
    // Initial entrance GSAP animations (as you had)
    // -----------------------
    gsap.to("#nav .bounding-elem", { y: 0, duration: 1, stagger: 0.2, ease: "power4.out" });
    gsap.to("#landingMain .bounding-elem", { y: 0, duration: 1, stagger: 0.2, delay: 0.5, ease: "power4.out" });
    gsap.to("#landingfooter .bounding-elem", { y: 0, duration: 1, stagger: 0.2, delay: 1.5, ease: "power4.out" });

    // -----------------------
    // Smooth scroll for internal anchors
    // -----------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // -----------------------
    // NAVBAR hide/show on scroll (fixed & consolidated)
    // -----------------------
    if (nav) {
        const landingHeight = landingPage ? landingPage.offsetHeight : 0;
        let lastScrollTop = window.pageYOffset || 0;
        let scrollTimeout;

        const navbarHeight = nav.offsetHeight || 0;

        const showNavbar = () => {
            gsap.to(nav, { y: 0, duration: 0.25, ease: "power2.out" });
        };

        const hideNavbar = () => {
            if (isMenuOpen()) {
                // if menu is open, keep navbar visible
                showNavbar();
                return;
            }
            if (window.scrollY > landingHeight) {
                gsap.to(nav, { y: -navbarHeight, duration: 0.3, ease: "power.inOut" });
            }
        };

        // Initial behavior (preserve previous "hide after 1s")
        scrollTimeout = setTimeout(() => {
            if (!isMenuOpen()) hideNavbar();
        }, 1000);

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);

            // If side menu is active, always keep navbar visible
            if (isMenuOpen()) {
                showNavbar();
                lastScrollTop = window.pageYOffset || 0;
                return;
            }

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop <= landingHeight) {
                // Always show on landing area
                showNavbar();
            } else {
                if (scrollTop > lastScrollTop) {
                    // scrolling down -> hide
                    hideNavbar();
                } else {
                    // scrolling up -> show
                    showNavbar();
                }

                // hide again after 1s of inactivity (only if menu not open)
                scrollTimeout = setTimeout(() => {
                    if (!isMenuOpen()) hideNavbar();
                }, 1000);
            }

            lastScrollTop = Math.max(0, scrollTop);
        }, { passive: true });
    }

    // -----------------------
    // Infinite horizontal loop (guarded)
    // -----------------------
    function createInfiniteLoop() {
        const track = document.querySelector(".scroll-track");
        const item = document.querySelector(".scroll-item");
        if (!track || !item) return;
        const itemWidth = item.offsetWidth;

        for (let i = 0; i < 4; i++) {
            track.appendChild(item.cloneNode(true));
        }

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

    // -----------------------
    // Swiper init (guarded)
    // -----------------------
    let swiper;
    function initSwiper() {
        if (typeof Swiper === 'undefined') return; // guard if Swiper library not loaded
        if (window.innerWidth <= 768) {
            if (swiper) swiper.destroy(true, true);
        } else {
            swiper = new Swiper(".mySwiper", {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: true,
                grabCursor: true
            });
        }
    }
    initSwiper();
    window.addEventListener('resize', initSwiper);

    // -----------------------
    // Grid hover to change minicircle (guarded)
    // -----------------------
    const gridEl = document.querySelector('#grid');
    if (gridEl) {
        gridEl.addEventListener('mouseenter', () => {
            const minicircle = document.querySelector('#minicircle');
            if (!minicircle) return;
            minicircle.classList.add('enlarged');
            minicircle.innerHTML = '<span><h2><i class="ri-contract-right-line"></i></h2></span>';
        });
        gridEl.addEventListener('mouseleave', () => {
            const minicircle = document.querySelector('#minicircle');
            if (!minicircle) return;
            minicircle.classList.remove('enlarged');
            minicircle.innerHTML = '';
        });
    }

    // -----------------------
    // ScrollTrigger animations (guarded)
    // -----------------------
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        try {
            gsap.registerPlugin(ScrollTrigger);
            const splitEls = document.querySelectorAll(".splittext");
            if (splitEls.length) {
                gsap.from(splitEls, {
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: "#infopage",
                        start: "top center",
                        end: "bottom center",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        } catch (e) {
            // ScrollTrigger not available or register failed — ignore safely
            console.warn('ScrollTrigger registration failed:', e);
        }
    }

    // -----------------------
    // sbox hover animations
    // -----------------------
    document.querySelectorAll('.sbox').forEach(box => {
        const content = box.querySelector('.sbox-content');
        const hoverContent = box.querySelector('.sbox-hover');
        let isAnimating = false;
        let currentTl = null;

        if (!content || !hoverContent) return;

        gsap.set(content, { y: 0, opacity: 1 });
        gsap.set(hoverContent, { opacity: 0, y: 30 });

        box.addEventListener('mouseenter', () => {
            if (isAnimating) currentTl?.kill();
            currentTl = gsap.timeline({ onStart: () => isAnimating = true, onComplete: () => isAnimating = false })
                .to(content, { y: -50, opacity: 0, duration: 0.4, ease: "power3.inOut" })
                .to(hoverContent, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
        });

        box.addEventListener('mouseleave', () => {
            if (isAnimating) currentTl?.kill();
            gsap.set(hoverContent, { opacity: 0, y: 30 });
            currentTl = gsap.timeline({ onStart: () => isAnimating = true, onComplete: () => isAnimating = false })
                .fromTo(content, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        });
    });

    // -----------------------
    // Flip-card / elem scroll animations
    // -----------------------
    document.querySelectorAll(".elem").forEach(elem => {
        const flipCard = elem.querySelector(".flip-card");
        if (!flipCard) return;
        let xTransform = gsap.utils.random(-100, 100);
        let tl = gsap.timeline();

        tl.set(flipCard, { transformOrigin: `${xTransform < 0 ? '0%' : '100%'}` }, "start")
            .to(flipCard, {
                scale: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: flipCard,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            }, "start")
            .to(elem, {
                xPercent: xTransform,
                ease: "none",
                scrollTrigger: {
                    trigger: flipCard,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
    });

    // -----------------------
    // Modal overlay buttons (guarded)
    // -----------------------
    const overlay = document.getElementById('modal-overlay');
    const partnerModal = document.getElementById('partner-modal');
    const supportModal = document.getElementById('support-modal');
    const openPartnerBtn = document.getElementById('open-partner');
    const openSupportBtn = document.getElementById('open-support');

    if (openPartnerBtn && overlay && partnerModal) {
        openPartnerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('active');
            partnerModal.classList.add('active');
        });
    }

    if (openSupportBtn && overlay && supportModal) {
        openSupportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('active');
            supportModal.classList.add('active');
        });
    }

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (overlay) overlay.classList.remove('active');
            if (partnerModal) partnerModal.classList.remove('active');
            if (supportModal) supportModal.classList.remove('active');
        });
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            if (partnerModal) partnerModal.classList.remove('active');
            if (supportModal) supportModal.classList.remove('active');
        });
    }

    // -----------------------
    // #elem mousemove/mouseleave effect (guarded)
    // (I left as you wrote it, only added guards to avoid runtime errors)
    // -----------------------
    document.querySelectorAll('#elem').forEach(function (elem) {
        let rotate = 0;
        let diffrotate = 0;
        const img = elem.querySelector('img');

        if (!img) return;

        elem.addEventListener('mouseleave', function () {
            gsap.to(img, {
                opacity: 0,
                ease: Power2,
                duration: 0.5
            });
        });

        elem.addEventListener('mousemove', function (details) {
            var diff = details.clientY - elem.getBoundingClientRect().top;
            diffrotate = details.clientX - rotate;
            rotate = details.clientX;

            gsap.to(img, {
                opacity: 1,
                ease: Power3,
                top: diff,
                left: details.clientX,
                rotate: gsap.utils.clamp(-20, 20, diffrotate * 0.8),
            });
        });
    });
}); // end DOMContentLoaded
