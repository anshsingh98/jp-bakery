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
        
        if (documentHeight > 0) {
            const percentageScrolled = (scrollTop / documentHeight) * 100;
            scrollProgress.style.width = `${percentageScrolled}%`;
        }

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

    // 5. FAQ Accordion Mechanics
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const parentItem = trigger.parentElement;
            const bodyContent = trigger.nextElementSibling;
            
            // Close other items if opened
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== parentItem && item.classList.contains("active")) {
                    item.classList.remove("active");
                    item.querySelector(".faq-body-content").style.maxHeight = null;
                }
            });
            
            parentItem.classList.toggle("active");
            if (parentItem.classList.contains("active")) {
                bodyContent.style.maxHeight = bodyContent.scrollHeight + "px";
            } else {
                bodyContent.style.maxHeight = null;
            }
        });
    });

    // 6. Contact Form WhatsApp Redirection Engine
    const orderForm = document.getElementById("whatsapp-order-form");
    if(orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const clientName = document.getElementById("form-name").value.trim();
            const clientPhone = document.getElementById("form-phone").value.trim();
            const clientReqs = document.getElementById("form-desc").value.trim();
            
            const baseText = `Hello JP Biscuit Bakery,\n\nI want to make a request reservation:\n\n*Name:* ${clientName}\n*Phone:* ${clientPhone}\n*Requirements:* ${clientReqs}`;
            const encodedText = encodeURIComponent(baseText);
            
            window.open(`https://wa.me/919712566555?text=${encodedText}`, '_blank');
        });
    }

    // 7. Intersection Observer Architecture for Spatial Reveal Animations
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

    // 8. Category Selection Pill Handler
    const categoryPills = document.querySelectorAll(".track-pill");
    categoryPills.forEach(pill => {
        pill.addEventListener("click", () => {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
        });
    });
});
                
