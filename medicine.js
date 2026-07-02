// ============================================================
// SECTION 1: TOAST NOTIFICATION
// ============================================================

function showToast(message, duration = 3000) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    Object.assign(toast.style, {
        position: "fixed",
        bottom: "80px",
        right: "20px",
        background: "#2A9D8F",
        color: "#fff",
        padding: "12px 22px",
        borderRadius: "10px",
        fontSize: "14px",
        fontFamily: "'Poppins', sans-serif",
        zIndex: "99999",
        boxShadow: "0 6px 20px rgba(42,157,143,.35)",
        opacity: "0",
        transform: "translateY(12px)",
        transition: "opacity .3s, transform .3s"
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(12px)";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}


// ============================================================
// SECTION 2: GLOBAL KEYFRAME ANIMATIONS (spin + ripple)
// ============================================================

const animStyle = document.createElement("style");
animStyle.textContent = `
  @keyframes spin   { to { transform: rotate(360deg); } }
  @keyframes ripple { to { transform: scale(20); opacity: 0; } }
`;
document.head.appendChild(animStyle);


// ============================================================
// SECTION 3: PAGE PRELOADER
// ============================================================

const preloader = document.createElement("div");

Object.assign(preloader.style, {
    position: "fixed", top: "0", left: "0",
    width: "100%", height: "100%",
    background: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: "99999", transition: "opacity .5s"
});

preloader.innerHTML = `
  <div style="text-align:center">
    <div style="
      width:50px;height:50px;
      border:4px solid #e0e0e0;
      border-top-color:#2A9D8F;
      border-radius:50%;
      animation:spin .8s linear infinite;
      margin:0 auto 14px
    "></div>
    <p style="color:#253237;font-size:14px;font-family:'Poppins',sans-serif;margin:0">Loading…</p>
  </div>
`;

document.body.appendChild(preloader);

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => preloader.remove(), 500);
        showToast("👋 Welcome to ABC Medicines!");
        startCounters();
    }, 700);
});


// ============================================================
// SECTION 4: SCROLL PROGRESS BAR
// ============================================================

const progressBar = document.createElement("div");

Object.assign(progressBar.style, {
    position: "fixed", top: "0", left: "0",
    height: "3px", width: "0%",
    background: "linear-gradient(90deg, #2A9D8F, #E9C46A)",
    zIndex: "99998", transition: "width .1s"
});

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
});


// ============================================================
// SECTION 5: STICKY HEADER
// ============================================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.style.position  = "fixed";
        header.style.top       = "0";
        header.style.left      = "0";
        header.style.width     = "100%";
        header.style.zIndex    = "999";
        header.style.boxShadow = "0 5px 24px rgba(0,0,0,.22)";
    } else {
        header.style.position  = "relative";
        header.style.boxShadow = "none";
    }
});


// ============================================================
// SECTION 6: ANIMATED STATS COUNTER STRIP
// ============================================================

const statsStrip = document.createElement("div");
statsStrip.className = "stats-strip";

const statsData = [
    { number: 500, suffix: "+",   label: "Medicines Stocked" },
    { number: 200, suffix: "+",   label: "Partner Pharmacies" },
    { number: 24,  suffix: " hrs", label: "Support Available" },
    { number: 15,  suffix: "+",   label: "Years of Trust" },
];

statsData.forEach((stat, i) => {
    const item = document.createElement("div");
    item.className = "stat-item";
    item.innerHTML = `
        <span class="stat-number" data-target="${stat.number}">0</span>
        <span class="stat-suffix">${stat.suffix}</span>
        <span class="stat-label">${stat.label}</span>
    `;
    statsStrip.appendChild(item);

    if (i < statsData.length - 1) {
        const divider = document.createElement("div");
        divider.className = "stat-divider";
        statsStrip.appendChild(divider);
    }
});

const heroSection = document.querySelector(".hero");
if (heroSection) {
    heroSection.after(statsStrip);
}

function startCounters() {
    document.querySelectorAll(".stat-number[data-target]").forEach(el => {
        const target   = parseInt(el.getAttribute("data-target"));
        const duration = 1800;
        const step     = Math.ceil(target / (duration / 16));
        let current    = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 16);
    });
}


// ============================================================
// SECTION 7: WHY CHOOSE US
// ============================================================

const whySection = document.createElement("section");
whySection.innerHTML = `
<h2>⭐ Why Choose Us?</h2>
<div class="why-grid">

  <div class="why-card">
    <span class="why-icon">✅</span>
    <h3>100% Genuine Medicines</h3>
    <p>Every product is sourced directly from licensed manufacturers — no counterfeits, ever.</p>
  </div>

  <div class="why-card">
    <span class="why-icon">🚚</span>
    <h3>Fast & Reliable Delivery</h3>
    <p>Same-day dispatch for orders placed before 2 PM within Nashik city limits.</p>
  </div>

  <div class="why-card">
    <span class="why-icon">💰</span>
    <h3>Wholesale Pricing</h3>
    <p>Best prices for pharmacies, hospitals, and clinics with flexible credit options.</p>
  </div>

  <div class="why-card">
    <span class="why-icon">🕐</span>
    <h3>24×7 Availability</h3>
    <p>Round-the-clock support and emergency medicine supply — we never close.</p>
  </div>

</div>
`;

const productsSection = document.querySelector("#products");
if (productsSection) {
    productsSection.after(whySection);
}


// ============================================================
// SECTION 8: BRANDS MARQUEE
// ============================================================

const brandsSection = document.createElement("section");
brandsSection.className = "brands-section";

const brands = [
    { emoji: "💊", name: "Sun Pharma"  },
    { emoji: "🧬", name: "Cipla"       },
    { emoji: "🏥", name: "Dr. Reddy's" },
    { emoji: "💉", name: "Abbott"      },
    { emoji: "🩺", name: "Mankind"     },
    { emoji: "🔬", name: "Lupin"       },
    { emoji: "🧪", name: "Alkem"       },
    { emoji: "💊", name: "Zydus"       },
];

const allBrands = [...brands, ...brands];
const pills = allBrands.map(b => `<div class="brand-pill"><span>${b.emoji}</span>${b.name}</div>`).join("");

brandsSection.innerHTML = `
<h2>🤝 Brands We Stock</h2>
<div style="overflow:hidden;">
  <div class="marquee-track">${pills}</div>
</div>
`;

const contactSection = document.querySelector("#contact");
if (contactSection) {
    document.body.insertBefore(brandsSection, contactSection);
}


// ============================================================
// SECTION 9: Customer reiview
// ============================================================

const testimonialSection = document.createElement("section");
testimonialSection.innerHTML = `
<h2>💬 What Our Clients Say</h2>
<div class="testimonials-grid">

  <div class="testimonial-card">
    <div class="stars">★★★★★</div>
    <p>ABC Medicines has been our go-to supplier for 5 years. Prices are unbeatable and delivery is always on time.</p>
    <div class="testimonial-author">
      <div class="author-avatar">👨‍⚕️</div>
      <div class="author-info">
        <strong>Dr. Rajesh More</strong>
        <span>City Medical Store, Nashik</span>
      </div>
    </div>
  </div>

  <div class="testimonial-card">
    <div class="stars">★★★★★</div>
    <p>The 24/7 availability saved us during a late-night emergency stock shortage. Truly dependable partners!</p>
    <div class="testimonial-author">
      <div class="author-avatar">👩‍⚕️</div>
      <div class="author-info">
        <strong>Mrs. Priya Kulkarni</strong>
        <span>Lifeline Pharmacy, Nashik</span>
      </div>
    </div>
  </div>

  <div class="testimonial-card">
    <div class="stars">★★★★☆</div>
    <p>Genuine medicines, proper storage, and a team that actually knows their products. Highly recommended!</p>
    <div class="testimonial-author">
      <div class="author-avatar">🧑‍💼</div>
      <div class="author-info">
        <strong>Mr. Sanjay Deshmukh</strong>
        <span>Dhanvantari Clinic, Nashik</span>
      </div>
    </div>
  </div>

</div>
`;

if (contactSection) {
    document.body.insertBefore(testimonialSection, contactSection);
}


// ============================================================
// SECTION 10: IMAGE GALLERY LIGHTBOX
// ============================================================

const images = document.querySelectorAll(".gallery img");
let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        openLightbox(currentIndex);
    });
});

function openLightbox(index) {
    const existing = document.querySelector(".lightbox-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    Object.assign(overlay.style, {
        position: "fixed", top: "0", left: "0",
        width: "100%", height: "100%",
        background: "rgba(0,0,0,.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: "9999"
    });

    const image = document.createElement("img");
    image.src = images[index].src;
    Object.assign(image.style, {
        maxWidth: "85%", maxHeight: "85%",
        borderRadius: "12px", transition: "opacity .2s"
    });

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✕";
    Object.assign(closeBtn.style, {
        position: "absolute", top: "20px", right: "24px",
        background: "none", border: "none",
        color: "#fff", fontSize: "26px", cursor: "pointer"
    });

    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "❮";
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "❯";

    [prevBtn, nextBtn].forEach((btn, i) => {
        Object.assign(btn.style, {
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,.15)", border: "none",
            color: "#fff", fontSize: "22px", padding: "12px 18px",
            borderRadius: "8px", cursor: "pointer"
        });
        btn.style[i === 0 ? "left" : "right"] = "20px";
    });

    prevBtn.addEventListener("click", e => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        image.style.opacity = "0";
        setTimeout(() => { image.src = images[currentIndex].src; image.style.opacity = "1"; }, 150);
    });

    nextBtn.addEventListener("click", e => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        image.style.opacity = "0";
        setTimeout(() => { image.src = images[currentIndex].src; image.style.opacity = "1"; }, 150);
    });

    overlay.appendChild(image);
    overlay.appendChild(closeBtn);
    if (images.length > 1) { overlay.appendChild(prevBtn); overlay.appendChild(nextBtn); }
    document.body.appendChild(overlay);

    overlay.onclick = () => overlay.remove();
    closeBtn.onclick = e => { e.stopPropagation(); overlay.remove(); };

    document.addEventListener("keydown", function lbKey(e) {
        if (e.key === "Escape")     { overlay.remove(); document.removeEventListener("keydown", lbKey); }
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft")  prevBtn.click();
    });
}


// ============================================================
// SECTION 11: CLICK-TO-COPY CONTACT INFO
// ============================================================

document.querySelectorAll(".contact p").forEach(item => {
    item.title = "Click to copy";
    item.addEventListener("click", () => {
        navigator.clipboard.writeText(item.innerText).then(() => {
            showToast("📋 Copied: " + item.innerText);
        });
    });
});


// ============================================================
// SECTION 12: RIPPLE EFFECT ON BUTTONS
// ============================================================

function addRipple(element) {
    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        Object.assign(circle.style, {
            position: "absolute", width: "20px", height: "20px",
            background: "rgba(255,255,255,.65)", borderRadius: "50%",
            left: e.offsetX + "px", top: e.offsetY + "px",
            animation: "ripple .6s linear", pointerEvents: "none"
        });
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
}

document.querySelectorAll(".btn").forEach(btn => addRipple(btn));


// ============================================================
// SECTION 13: BACK TO TOP BUTTON
// ============================================================

const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.title = "Back to top";
document.body.appendChild(topBtn);

Object.assign(topBtn.style, {
    position: "fixed", right: "20px", bottom: "20px",
    padding: "12px 18px", border: "none", borderRadius: "50%",
    background: "#2A9D8F", color: "white",
    fontSize: "20px", cursor: "pointer",
    display: "none", zIndex: "999",
    transition: "opacity .3s, transform .3s",
    boxShadow: "0 4px 14px rgba(42,157,143,.4)"
});

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });


// ============================================================
// SECTION 14: DYNAMIC FOOTER YEAR
// ============================================================

const footerP = document.querySelector("footer p");
if (footerP) {
    footerP.innerHTML = `© ${new Date().getFullYear()} ABC Medicines Distributor & Wholesaler · Nashik, Maharashtra`;
}


// ============================================================
// SECTION 15: WHATSAPP & INSTAGRAM FLOATING BUTTONS
// ============================================================

const waBtn = document.createElement("a");
waBtn.href   = "https://wa.me/918806507046";
waBtn.target = "_blank";
waBtn.title  = "Chat on WhatsApp";

waBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.571a.75.75 0 00.918.938l5.9-1.453A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM12 21.75a9.71 9.71 0 01-4.953-1.354l-.355-.211-3.682.907.977-3.58-.232-.368A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
`;

Object.assign(waBtn.style, {
    position: "fixed", left: "20px", bottom: "20px",
    width: "52px", height: "52px",
    background: "#25D366", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    textDecoration: "none", zIndex: "999",
    boxShadow: "0 4px 14px rgba(0,0,0,.25)",
    transition: "transform .2s, box-shadow .2s"
});

waBtn.onmouseover = () => {
    waBtn.style.transform = "scale(1.12)";
    waBtn.style.boxShadow = "0 6px 20px rgba(0,0,0,.3)";
};
waBtn.onmouseout = () => {
    waBtn.style.transform = "scale(1)";
    waBtn.style.boxShadow = "0 4px 14px rgba(0,0,0,.25)";
};

document.body.appendChild(waBtn);

const instaBtn = document.createElement("a");
instaBtn.href   = "https://www.instagram.com/kunaalll.19/";
instaBtn.target = "_blank";
instaBtn.title  = "Follow on Instagram";

instaBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.52.069-2.979.378-4.104 1.503C1.824 2.7 1.515 4.159 1.446 5.679.988 6.959.974 7.367.974 12s.014 5.041.072 6.321c.069 1.52.378 2.979 1.503 4.104 1.125 1.125 2.584 1.434 4.104 1.503C7.933 23.986 8.341 24 12 24s4.067-.014 5.347-.072c1.52-.069 2.979-.378 4.104-1.503 1.125-1.125 1.434-2.584 1.503-4.104.058-1.28.072-1.688.072-6.321s-.014-5.041-.072-6.321c-.069-1.52-.378-2.979-1.503-4.104C21.326 1.449 19.867 1.14 18.347 1.071 17.067.013 16.659 0 12 0z"/>
    <path d="M12 5.838a6.162 6.162 0 100 12.324A6.162 6.162 0 0012 5.838zm0 10.162a4 4 0 110-8 4 4 0 010 8z"/>
    <circle cx="18.406" cy="5.594" r="1.44"/>
  </svg>
`;

Object.assign(instaBtn.style, {
    position: "fixed", left: "20px", bottom: "82px",
    width: "52px", height: "52px",
    background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    textDecoration: "none", zIndex: "999",
    boxShadow: "0 4px 14px rgba(0,0,0,.25)",
    transition: "transform .2s, box-shadow .2s"
});

instaBtn.onmouseover = () => {
    instaBtn.style.transform = "scale(1.12)";
    instaBtn.style.boxShadow = "0 6px 20px rgba(0,0,0,.3)";
};
instaBtn.onmouseout = () => {
    instaBtn.style.transform = "scale(1)";
    instaBtn.style.boxShadow = "0 4px 14px rgba(0,0,0,.25)";
};

document.body.appendChild(instaBtn);


// ============================================================
// SECTION 16: ORDER SURVEY FORM
// ============================================================

const inquirySection = document.createElement("section");
inquirySection.style.borderLeft = "5px solid #2A9D8F";

inquirySection.innerHTML = `
<h2>📦 Place a Quick Order</h2>
<p style="color:#5C6B73;margin-bottom:22px;text-align:left;">
  Fill in the form below and we'll call you shortly to confirm your order.
</p>

<input id="inq-name" type="text" placeholder="Your Name"
style="width:100%;padding:13px 16px;margin-bottom:13px;background:#f0fafa;border:1.5px solid #C2DFE3;border-radius:10px;color:#253237;font-size:15px;font-family:'Poppins',sans-serif;outline:none;">

<input id="inq-phone" type="tel" placeholder="Your Phone Number"
style="width:100%;padding:13px 16px;margin-bottom:13px;background:#f0fafa;border:1.5px solid #C2DFE3;border-radius:10px;color:#253237;font-size:15px;font-family:'Poppins',sans-serif;outline:none;">

<input id="inq-product" type="text" placeholder="Medicine / Product Name"
style="width:100%;padding:13px 16px;margin-bottom:13px;background:#f0fafa;border:1.5px solid #C2DFE3;border-radius:10px;color:#253237;font-size:15px;font-family:'Poppins',sans-serif;outline:none;">

<textarea id="inq-msg" placeholder="Any additional message (optional)"
style="width:100%;height:100px;padding:13px 16px;margin-bottom:18px;background:#f0fafa;border:1.5px solid #C2DFE3;border-radius:10px;color:#253237;resize:none;font-size:15px;font-family:'Poppins',sans-serif;outline:none;"></textarea>

<button onclick="sendInquiry()"
style="background:#2A9D8F;color:white;padding:13px 34px;border:none;border-radius:50px;font-size:15px;font-weight:600;cursor:pointer;transition:.3s;font-family:'Poppins',sans-serif;box-shadow:0 6px 20px rgba(42,157,143,.35);">
  Place Order 💬
</button>
`;

if (contactSection) {
    document.body.insertBefore(inquirySection, contactSection);
}


// ============================================================
// SECTION 17: SEND INQUIRY VIA WHATSAPP
// ============================================================

function sendInquiry() {
    const name    = document.getElementById("inq-name").value.trim();
    const phone   = document.getElementById("inq-phone").value.trim();
    const product = document.getElementById("inq-product").value.trim();
    const msg     = document.getElementById("inq-msg").value.trim();

    if (!name)  { showToast("⚠️ Please enter your name.");         return; }
    if (!phone) { showToast("⚠️ Please enter your phone number."); return; }

    const text =
        "🏥 *New Order - ABC Medicines*" +
        "\n👤 Name: "    + name +
        "\n📞 Phone: "   + phone +
        "\n💊 Product: " + (product || "Not mentioned") +
        "\n📝 Message: " + (msg     || "No message");

    window.open("https://wa.me/918806507046?text=" + encodeURIComponent(text), "_blank");
    showToast("✅ Order sent! We'll call you soon.");
}
