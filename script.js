// Hosted Backend URL Context Configuration (Render Engine)
const BACKEND_URL = "https://jp-bakery-backend.onrender.com"; 

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 0. DYNAMIC INVENTORY DATA MATRIX
    // ==========================================
    const productsInventory = [
        { id: 1, name: "Royal Velvet Layer", category: "Birthday Cakes", image: "images/custom-cake.png", price: "₹450", orderable: true, desc: "Fresh layered cream cake customized completely for birthdays and special days." },
        { id: 2, name: "Truffle Ganache", category: "Chocolate Cakes", image: "images/chocolate-cake.png", price: "₹450", orderable: true, desc: "Rich premium chocolate ganache layers made with high quality pure cocoa toppings." },
        { id: 3, name: "Premium Pastry Cream", category: "Pastries", image: "images/Pastrie.png", price: "₹40", orderable: false, desc: "Our soft layered modern pastries, prepared fresh daily using rich cream configurations." },
        { id: 4, name: "Traditional Butter Rounds", category: "Biscuits", image: "images/gallery1.png", price: "₹120", orderable: false, desc: "Our famous crispy biscuits, prepared fresh daily for authentic home storage guidelines." },
        { id: 5, name: "Gourmet Almond Khari", category: "Khari", image: "images/gallery1.png", price: "₹120", orderable: false, desc: "Flaky golden multi-layered puff bites baked using fine pure regional butter fats." },
        { id: 6, name: "Artisanal Wheat Bread", category: "Bread", image: "images/gallery3.png", price: "₹50", orderable: false, desc: "Freshly sliced country loaves baked every single morning with zero artificial additives." }
    ];

    // ==========================================
    // 1. DYNAMIC CATALOG INTEGRATION LOGIC
    // ==========================================
    const showcaseGrid = document.querySelector(".showcase-grid");
    
    function renderBakeryCatalog(items) {
        if (!showcaseGrid) return;
        
        showcaseGrid.innerHTML = items.map(product => {
            // Action controller dependent on distribution access configurations
            const actionMarkup = product.orderable
                ? `<a href="#" class="product-order-link catalog-wa-trigger" data-id="${product.id}">Order on WhatsApp</a>`
                : `<span class="store-preview-badge" style="display:inline-block; padding:10px 20px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:#FFFFFF; border-radius:50px; font-size:0.85rem; font-weight:600; letter-spacing:1px; cursor:default;">🛒 Available in Store</span>`;

            return `
                <div class="premium-product-card reveal-up in-view" data-item-cat="${product.category}">
                    <div class="card-inner-wrap">
                        <div class="card-face-front">
                            <div class="product-visual"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
                            <div class="product-details">
                                <span class="item-category">${product.category}</span>
                                <h3>${product.name}</h3>
                            </div>
                        </div>
                        <div class="card-face-back">
                            <h3>${product.name}</h3>
                            <p>${product.desc}</p>
                            <div style="font-family:var(--font-heading); font-size:1.3rem; font-weight:700; margin-bottom:15px; color:#FFFFFF;">Starting From ${product.price}</div>
                            ${actionMarkup}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Fire up initialization
    renderBakeryCatalog(productsInventory);

    // ==========================================
    // 2. DYNAMIC CATALOG DIRECT WA ORDER HANDLER
    // ==========================================
    document.addEventListener("click", async (e) => {
        if (e.target.classList.contains("catalog-wa-trigger")) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = parseInt(e.target.getAttribute("data-id"), 10);
            const chosenItem = productsInventory.find(item => item.id === targetId);
            
            if (!chosenItem) return;

            const clientName = prompt("Please provide your Full Name for validation:") || "Valued Customer";
            const clientPhone = prompt("Enter active WhatsApp Contact Number:") || "Not Disclosed";
            
            const clientPayload = {
                name: clientName,
                phone: clientPhone,
                branch: "Main Desk Dispatch Counter",
                description: `Express Direct Request for: ${chosenItem.name} (${chosenItem.category})`
            };

            try {
                const apiResponse = await fetch(`${BACKEND_URL}/api/order/verify`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(clientPayload)
                });
                
                const parseData = await apiResponse.json();
                
                if (parseData.status === "verified") {
                    const messageString = `Hello JP Biscuit Bakery!%0A%0A` +
                        `*New Catalog Order Request*%0A` +
                        `• *Item:* ${chosenItem.name}%0A` +
                        `• *Category:* ${chosenItem.category}%0A` +
                        `• *Base Value:* ${chosenItem.price}%0A%0A` +
                        `*Customer Identification*%0A` +
                        `• *Name:* ${clientName}%0A` +
                        `• *Phone:* ${clientPhone}`;
                    
                    window.open(`https://wa.me/919662322889?text=${messageString}`, '_blank');
                } else {
                    alert(`Data Integrity Error: ${parseData.message}`);
                }
            } catch (err) {
                console.warn("Backend validation connection error. Activating direct secure payload fallback route.");
                window.open(`https://wa.me/919662322889?text=Hello%20JP%20Bakery!%20I%20want%20to%20order%20the%20${encodeURIComponent(chosenItem.name)}.`, '_blank');
            }
        }
    });

    // ==========================================
    // 3. STARTUP LOADER & SKELETON EXECUTION
    // ==========================================
    const loaderScreen = document.getElementById("loader-screen");
    const skeletonWrap = document.getElementById("skeleton-container");
    const realGallery = document.getElementById("real-gallery-content");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loaderScreen) {
                loaderScreen.style.opacity = "0";
                setTimeout(() => {
                    loaderScreen.style.display = "none";
                    if (skeletonWrap && realGallery) {
                        skeletonWrap.classList.add("hidden");
                        realGallery.classList.remove("hidden");
                    }
                }, 800);
            }
        }, 1200);
    });

    // ==========================================
    // 4. GLOBAL SCROLL ENGINE PROGRESS BAR
    // ==========================================
    const scrollProgress = document.getElementById("scroll-bar");
    const boutiqueNav = document.querySelector(".boutique-nav");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (documentHeight > 0 && scrollProgress) {
            const percentageScrolled = (scrollTop / documentHeight) * 100;
            scrollProgress.style.width = `${percentageScrolled}%`;
        }

        if (boutiqueNav) {
            if (scrollTop > 60) {
                boutiqueNav.classList.add("scrolled");
            } else {
                boutiqueNav.classList.remove("scrolled");
            }
        }
    });

    // ==========================================
    // 5. MOBILE DRAWER UI TOGGLE LOGIC
    // ==========================================
    const menuTrigger = document.querySelector(".menu-trigger");
    const navLinks = document.querySelector(".nav-links");
    const targets = document.querySelectorAll(".nav-target");

    if (menuTrigger && navLinks) {
        menuTrigger.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-active");
        });
    }

    targets.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks) navLinks.classList.remove("mobile-active");
        });
    });

    // ==========================================
    // 6. NUMERICAL COUNTER COUNTER METRICS
    // ==========================================
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

    // ==========================================
    // 7. INTERSECTION REVEAL CONTROLLERS
    // ==========================================
    const reveals = document.querySelectorAll(".reveal-up");
    let counterTriggered = false;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                
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

    // ==========================================
    // 8. FAQ ACCORDION PATTERN CONTROLS
    // ==========================================
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const parentItem = trigger.parentElement;
            const bodyContent = trigger.nextElementSibling;
            
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

    // ==========================================
    // 9. FORM DISPATCH ENGINE (SECURE LAYER)
    // ==========================================
    const orderForm = document.getElementById("whatsapp-order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const name = document.getElementById("form-name").value.trim();
            const phone = document.getElementById("form-phone").value.trim();
            const branch = document.getElementById("form-branch-select").value;
            const description = document.getElementById("form-desc").value.trim();

            const payload = { name, phone, branch, description };

            try {
                const response = await fetch(`${BACKEND_URL}/api/order/verify`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (result.status === "verified") {
                    const baseText = `Hello JP Biscuit Bakery,\n\nI want to make an order request:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Selected Branch:* ${branch}\n*Requirements:* ${description}`;
                    window.open(`https://wa.me/919662322889?text=${encodeURIComponent(baseText)}`, '_blank');
                } else {
                    alert("Validation Error: " + result.message);
                }
            } catch (error) {
                console.error("Direct connection failed. Engaging standard secure protocol.");
                const baseText = `Hello JP Biscuit Bakery,\n\nI want to make an order request:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Selected Branch:* ${branch}\n*Requirements:* ${description}`;
                window.open(`https://wa.me/919662322889?text=${encodeURIComponent(baseText)}`, '_blank');
            }
        });
    }

    // ==========================================
    // 10. CATEGORY FILTER MECHANICS MATRIX
    // ==========================================
    const categoryPills = document.querySelectorAll(".track-pill");

    categoryPills.forEach(pill => {
        pill.addEventListener("click", () => {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            
            const filterValue = pill.textContent.trim();
            const liveCards = document.querySelectorAll(".premium-product-card");
            
            liveCards.forEach(item => {
                const itemCat = item.getAttribute("data-item-cat");
                // Structural safety checking fallback
                if (filterValue === "All Products" || 
                    itemCat === filterValue || 
                    (filterValue === "Cakes" && (itemCat === "Birthday Cakes" || itemCat === "Chocolate Cakes"))) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});

// ==========================================
// 11. MOBILE FLIP MECHANICS INTERACTION
// ==========================================
document.addEventListener("click", function(e) {
    const card = e.target.closest('.premium-product-card');
    if (card && window.innerWidth <= 1024) {
        if (e.target.classList.contains('catalog-wa-trigger') || e.target.classList.contains('store-preview-badge')) {
            return; 
        }
        card.classList.toggle('flipped');
    }
});
