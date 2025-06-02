    // Initialize Lenis
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

        let xscale = 1, yscale = 1, xprev = 0, yprev = 0, timeout;

        function circleMouseFollower(dets) {
            const minicircle = document.querySelector("#minicircle");
            requestAnimationFrame(() => {
                minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
            });
        }

        window.addEventListener('mousemove', dets => {
            clearTimeout(timeout);
            xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
            yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
            xprev = dets.clientX;
            yprev = dets.clientY;
            circleMouseFollower(dets);
            timeout = setTimeout(() => {
                document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
            }, 100);
        });

        gsap.to("#nav .bounding-elem", { y: 0, duration: 1, stagger: 0.2, ease: "power4.out" });
        gsap.to("#landingMain .bounding-elem", { y: 0, duration: 1, stagger: 0.2, delay: 0.5, ease: "power4.out" });
        gsap.to("#landingfooter .bounding-elem", { y: 0, duration: 1, stagger: 0.2, delay: 1.5, ease: "power4.out" });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        let lastScrollTop = 0;
        const navbar = document.querySelector('#nav');
        const navbarHeight = navbar.offsetHeight;
        let scrollTimeout = setTimeout(() => hideNavbar(), 1000);

        const hideNavbar = () => {
            if (window.scrollY > document.querySelector('#landingPage').offsetHeight) {
                gsap.to(navbar, { y: -navbarHeight, duration: 0.3, ease: "power2.inOut" });
            }
        };

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > document.querySelector('#landingPage').offsetHeight) {
                gsap.to(navbar, { y: (scrollTop > lastScrollTop) ? -navbarHeight : 0, duration: 0.3 });
                scrollTimeout = setTimeout(hideNavbar, 1000);
            } else {
                gsap.to(navbar, { y: 0, duration: 0.3 });
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    });

    function createInfiniteLoop() {
        const track = document.querySelector(".scroll-track");
        const item = document.querySelector(".scroll-item");
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

    let swiper;
    function initSwiper() {
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

    document.querySelector('#grid').addEventListener('mouseenter', () => {
        const minicircle = document.querySelector('#minicircle');
        minicircle.classList.add('enlarged');
        minicircle.innerHTML = '<span><h2><i class="ri-contract-right-line"></i></h2></span>';
    });
    document.querySelector('#grid').addEventListener('mouseleave', () => {
        const minicircle = document.querySelector('#minicircle');
        minicircle.classList.remove('enlarged');
        minicircle.innerHTML = '';
    });

    document.addEventListener('DOMContentLoaded', () => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(document.querySelectorAll(".splittext"), {
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
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.sbox').forEach(box => {
            const content = box.querySelector('.sbox-content');
            const hoverContent = box.querySelector('.sbox-hover');
            let isAnimating = false;
            let currentTl = null;

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
    });

    document.querySelectorAll(".elem").forEach(elem => {
        let flipCard = elem.querySelector(".flip-card");
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