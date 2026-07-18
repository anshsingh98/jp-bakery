document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Startup Loader Performance Handler
    const loaderScreen = document.getElementById("loader-screen");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loaderScreen.style.opacity = "0";
            setTimeout(() => {
                loaderScreen.style.display = "none";
            }, 800);
        }, 1200);
    });

    // 2. Global Scroll Indicator & Sticky Navigation Execution
    const scrollProgress = document.getElementById("scroll-bar");
    const boutiqueNav = document.querySelector(".boutique-nav");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentageScrolled = (scrollTop / documentHeight) * 100;
        
        scrollProgress.style.width = `${percentageScrolled}%`;

        if (scrollTop > 60) {
            boutiqueNav.classList.add("scrolled");
        } else {
            boutiqueNav.classList.remove("scrolled");
        }
    });

    // 3. Mobile Navigation Trigger Mechanics
    const menuTrigger = document.querySelector(".menu-trigger");
    const navLinks = document.querySelector(".nav-links");
    const targets = document.querySelectorAll(".nav-target");

    menuTrigger.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
    });

    targets.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-active");
        });
    });

    // 4. Advanced Numerical Counter Interpolation 
    const metrics = document.querySelectorAll(".metric-num");
    
    const triggerCounters = () => {
        metrics.forEach(metric => {
            const targetValue = parseInt(metric.getAttribute("data-val"), 10);
            const duration = 2000; 
            const steps = 50;
            const stepValue = targetValue / steps;
            let current = 0;
            let currentStep = 0;

            const increment = () => {
                currentStep++;
                current += stepValue;
                if (currentStep >= steps) {
                    metric.innerText = `${targetValue}+`;
                } else {
                    metric.innerText = `${Math.ceil(current)}+`;
                    setTimeout(increment, duration / steps);
                }
            };
            increment();
        });
    };

    // 5. Intersection Observer Architecture for Spatial Reveal Animations
    const reveals = document.querySelectorAll(".reveal-up");
    let counterTriggered = false;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                
                // Track legacy metrics counter window entrance
                if (entry.target.classList.contains("legacy-body") && !counterTriggered) {
                    triggerCounters();
                    counterTriggered = true;
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach(element => revealObserver.observe(element));

    // 6. Category Selection Pill Handler
    const categoryPills = document.querySelectorAll(".track-pill");
    categoryPills.forEach(pill => {
        pill.addEventListener("click", () => {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
        });
    });
});
