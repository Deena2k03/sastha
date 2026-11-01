// Load Navbar
fetch("/assets/components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // ✅ Hamburger toggle (AFTER loading navbar)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
      });
    }
  });

// Load Footer
fetch("/assets/components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;

    // ✅ Auto year update
    const year = document.getElementById("year");
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  });


// ✅ Optional: Navbar hide on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

// Navbar And Fotter Ends



// Hero Section Starts


document.addEventListener("DOMContentLoaded", () => {
    const mask = document.querySelector('.hero-mask');
    const slides = document.querySelectorAll('.bg-slide');
    let slideIndex = 0;

    // 1. Mouse Follow Effect
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        mask.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 8, 255, 0.15) 0%, var(--black) 80%)`;
    });

    // 2. Background Cycle
    function cycleSlides() {
        slides.forEach(s => s.classList.remove('active'));
        slides[slideIndex].classList.add('active');
        slideIndex = (slideIndex + 1) % slides.length;
    }

    cycleSlides();
    setInterval(cycleSlides, 5000);
});

// Hero Section Ends



// Section1 Starts

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => observer.observe(el));
});



document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');

                // Animate only once (premium feel)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.animate-on-scroll')
        .forEach(el => observer.observe(el));
});

//Section 1 Ends


//Section 6 
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('testi-track');
    const nextBtn = document.getElementById('nextTesti');
    const prevBtn = document.getElementById('prevTesti');
    const cards = document.querySelectorAll('.testi-card');
    
    let index = 0;
    const cardWidth = 100 / (window.innerWidth > 992 ? 3 : 1);
    const maxIndex = cards.length - (window.innerWidth > 992 ? 3 : 1);

    function updatePosition() {
        track.style.transform = `translateX(-${index * (100 / (window.innerWidth > 992 ? 3 : 1))}%)`;
    }

    function nextSlide() {
        if (index < maxIndex) {
            index++;
        } else {
            index = 0; // Loop back
        }
        updatePosition();
    }

    function prevSlide() {
        if (index > 0) {
            index--;
        } else {
            index = maxIndex;
        }
        updatePosition();
    }

    // Auto Slide every 5 seconds
    let autoPlay = setInterval(nextSlide, 5000);

    // Manual controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        clearInterval(autoPlay);
        autoPlay = setInterval(nextSlide, 5000);
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        clearInterval(autoPlay);
        autoPlay = setInterval(nextSlide, 5000);
    });
});

//Section 6 Ends