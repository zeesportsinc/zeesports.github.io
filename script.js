/* =========================================
   Zee Sports Factory - JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a.nav-link, a.btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply to internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Adjust offset for fixed navbar
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // 4. Scroll Reveal Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run animation once
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 5. Contact Form Submission (Prevent Default for Demo)
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real website, you would add AJAX or PHP form submission logic here
            alert('Thank you! Your custom sportswear inquiry has been sent to Zee Sports Factory.');
            contactForm.reset();
        });
    }
});

// 6. Gallery Lightbox Functions
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(imageSrc) {
    lightbox.style.display = "block";
    lightboxImg.src = imageSrc;
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.style.display = "none";
    // Restore background scrolling
    document.body.style.overflow = "auto";
}

// Close lightbox when clicking outside the image
window.onclick = function(event) {
    if (event.target == lightbox) {
        closeLightbox();
    }
}

/* =========================================
   Snowfall Animation Logic
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const snowContainer = document.getElementById('snow-container');
    
    // Agar snow-container HTML mein nahi hai toh function aagay na chale
    if (!snowContainer) return;

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Random properties banayein (Size, Position, aur Speed)
        const size = Math.random() * 5 + 2; // 2px se 7px ke darmiyan size
        const startPosition = Math.random() * window.innerWidth; // Screen par kahin se bhi shuru ho
        const animationDuration = Math.random() * 3 + 2; // 2 seconds se 5 seconds ki speed
        const opacity = Math.random() * 0.5 + 0.3; // Random transparency

        // CSS apply karein
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startPosition}px`;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.opacity = opacity;

        // Container mein add karein
        snowContainer.appendChild(snowflake);

        // Jab barf screen se neechay gir jaye toh usay delete kar dein (Website lag na kare)
        setTimeout(() => {
            snowflake.remove();
        }, animationDuration * 1000);
    }

    // Har 50 milliseconds ke baad ek naya barf ka qatra banayein
    // Agar barf zyada karni ho toh 50 ko kam kar ke 30 kar dein, agar kam karni ho toh 100 kar dein.
    setInterval(createSnowflake, 50);
});

// Preloader Hide Logic
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('preloader-hide');
        }, 5000);
    }
});


// Exit Intent Pop-up Logic (Shows ONLY 1 time forever)
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 10) {
        // Check localStorage so it NEVER shows again after the first time
        if (!localStorage.getItem('exitModalShownPermanent')) {
            const exitModalElem = document.getElementById('exitModal');
            if (exitModalElem) {
                const exitModal = new bootstrap.Modal(exitModalElem);
                exitModal.show();
                // Save permanently in user's browser
                localStorage.setItem('exitModalShownPermanent', 'true');
            }
        }
    }
});