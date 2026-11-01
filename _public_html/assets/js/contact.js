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






// ✅ Scroll Reveal Logic
document.addEventListener("DOMContentLoaded", () => {
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the reveal class
                entry.target.classList.add('reveal');
                // Once revealed, stop observing to save performance
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);

    // Target all elements with the animate-trigger class
    const targets = document.querySelectorAll('.animate-trigger, .reveal-left');
    targets.forEach(target => observer.observe(target));
});


//Hero section starts

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const heroContent = document.getElementById('hero-content');
    let currentSlide = 0;

    function changeSlide() {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[currentSlide].classList.add('active');

        // Reset and trigger text animation
        heroContent.classList.remove('animate-in');
        void heroContent.offsetWidth; // Trigger reflow
        heroContent.classList.add('animate-in');

        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
    }

    // Run first time
    changeSlide();

    // Set interval to 5 seconds
    setInterval(changeSlide, 5000);
});


//Section 1

// Scroll Animation Logic
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});




// ================= EMAILJS CONTACT FORM =================

// ================= EMAILJS =================

// Initialize EmailJS
(function () {
  emailjs.init("5ZWPAPzY2sq82RDcV");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("submit-btn");

  if (!form || !btn) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    btn.innerText = "Sending...";
    btn.disabled = true;

    emailjs.sendForm(
      "service_7qo4pl4",
      "template_bqpz1ii",
      form
    )
    .then(function () {
      // ✅ Success UI
      btn.innerText = "Sent Successfully ✅";
      btn.style.background = "green";

      form.reset();

      // Reset button after 5 sec
      setTimeout(() => {
        btn.innerText = "Get Free Quote 👉";
        btn.style.background = "";
        btn.disabled = false;
      }, 5000);
    })
    .catch(function (error) {
      console.error("EmailJS Error:", error);

      btn.innerText = "Send Failed ❌";
      btn.style.background = "red";

      // Reset button after 5 sec
      setTimeout(() => {
        btn.innerText = "Try Again";
        btn.style.background = "";
        btn.disabled = false;
      }, 5000);
    });
  });
});