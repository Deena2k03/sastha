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





//Gallery Section Starts

document.addEventListener("DOMContentLoaded", () => {
    const shutters = document.querySelectorAll('.service-shutter');

    // If the screen is wide enough (desktop/tablet landscape)
    if (window.innerWidth > 992) {
        
        // Remove the default initial active class on mouse entry
        const container = document.querySelector('.services-shutter-container');
        container.addEventListener('mouseenter', () => {
            shutters.forEach(s => s.classList.remove('active'));
        }, { once: true }); // Only runs this logic on the first mouse enter

    } else {
        // Simple click interaction for mobile touch devices
        shutters.forEach(shutter => {
            shutter.addEventListener('click', () => {
                // Remove active from all
                shutters.forEach(s => s.classList.remove('active'));
                // Add to clicked one
                shutter.classList.add('active');
            });
        });
    }
});


let currentImages = [];
let activeImgIndex = 0;

// ================= GALLERY DATA =================
const galleryData = {
  aluminium: {
    title: "Aluminium Works",
    images: [
      "/assets/public/aa1.jpeg","/assets/public/aa2.jpeg","/assets/public/aa3.jpeg",
      "/assets/public/aa4.jpeg","/assets/public/aa5.jpeg","/assets/public/aa6.jpeg",
      "/assets/public/aa7.jpeg","/assets/public/aa8.jpeg","/assets/public/aa9.jpeg",
      "/assets/public/aa10.jpeg"
    ]
  },
  tuffen: {
    title: "Tuffen Glass Works",
    images: [
      "/assets/public/gg1.jpeg","/assets/public/gg2.jpeg","/assets/public/gg3.jpeg",
      "/assets/public/gg4.jpeg","/assets/public/gg5.jpeg","/assets/public/gg6.jpeg",
      "/assets/public/gg7.jpeg","/assets/public/gg8.jpeg","/assets/public/gg9.jpeg",
      "/assets/public/gg10.jpeg"
    ]
  },
  ceiling: {
    title: "Premium ceiling works",
    images: [
      "/assets/public/ff1.jpeg","/assets/public/ff2.jpeg","/assets/public/ff3.jpeg",
      "/assets/public/ff4.jpeg","/assets/public/ff5.jpeg","/assets/public/ff6.jpeg",
      "/assets/public/ff7.jpeg","/assets/public/ff8.jpeg","/assets/public/ff9.jpeg",
      "/assets/public/ff10.jpeg"
    ]
  }
};

// ================= OPEN SERVICE GALLERY =================
function openGallery(service) {
  const modal = document.getElementById("galleryModal");
  const grid = document.getElementById("modalGrid");
  const title = document.getElementById("modalTitle");

  const data = galleryData[service];

  currentImages = data.images;
  title.innerText = data.title;
  grid.innerHTML = "";

  currentImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.cursor = "zoom-in";
    img.onclick = () => openLightbox(index);
    grid.appendChild(img);
  });

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// ================= CLOSE MODAL =================
document.querySelector(".close-modal").onclick = () => {
  document.getElementById("galleryModal").style.display = "none";
  document.body.style.overflow = "auto";
};

// ================= LIGHTBOX =================
function openLightbox(index) {
  activeImgIndex = index;

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImage");

  lbImg.src = currentImages[activeImgIndex];
  lb.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function changeImage(step) {
  activeImgIndex += step;

  if (activeImgIndex >= currentImages.length) activeImgIndex = 0;
  if (activeImgIndex < 0) activeImgIndex = currentImages.length - 1;

  const lbImg = document.getElementById("lbImage");

  lbImg.style.opacity = "0";
  setTimeout(() => {
    lbImg.src = currentImages[activeImgIndex];
    lbImg.style.opacity = "1";
  }, 150);
}

// ================= KEYBOARD CONTROL =================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") changeImage(1);
  if (e.key === "ArrowLeft") changeImage(-1);
});

// ================= CLIENT PORTFOLIO =================
const clientPortfolioData = {
  Mangal: {
    title: "Sri Sastha Interior - Project Gallery",
    images: ["/assets/public/mm1.jpeg","/assets/public/mm2.jpeg","/assets/public/mm3.jpeg", "/assets/public/mm4.jpeg", "/assets/public/mm5.jpeg", "/assets/public/mm6.jpeg"]
  },
  Gupta: {
    title: "Sri Sastha Interior - Project Gallery",
    images: ["/assets/public/ggg1.jpeg","/assets/public/ggg2.jpeg", "/assets/public/ggg3.jpeg", "/assets/public/ggg4.jpeg", "/assets/public/ggg5.jpeg"]
  },
  Salem: {
    title: "Sri Sastha Interior - Project Gallery",
    images: ["/assets/public/ss1.jpeg","/assets/public/ss2.jpeg", "/assets/public/ss3.jpeg", "/assets/public/ss4.jpeg", "/assets/public/ss5.jpeg", "/assets/public/ss6.jpeg","/assets/public/ss7.jpeg"]
  },
  Capgemini: {
    title: "Sri Sastha Interior - Project Gallery",
    images: ["/assets/public/cg1.jpeg","/assets/public/cg2.jpeg"]
  },
  MG: {
    title: "Sri Sastha Interior - Project Gallery",
    images: ["/assets/public/mg1.jpeg","/assets/public/mg2.jpeg", "/assets/public/mg3.jpeg", "/assets/public/mg4.jpeg"]
  }
};

// ================= OPEN CLIENT GALLERY =================
function openClientPortfolio(id) {
  const data = clientPortfolioData[id];

  const grid = document.getElementById("modalGrid");
  const modal = document.getElementById("galleryModal");

  document.getElementById("modalTitle").innerText = data.title;

grid.innerHTML = `
  <div id="mediaSubGrid" class="media-grid"></div>
`;
  const subGrid = document.getElementById("mediaSubGrid");

  currentImages = data.images;

  currentImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.cursor = "zoom-in";
    img.onclick = () => openLightbox(index);
    subGrid.appendChild(img);
  });

  modal.style.display = "block";
}