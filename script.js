document.documentElement.classList.add("js");

const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");

const syncHeaderState = () => {
    if (!header) {
        return;
    }

    header.classList.toggle("scrolled", window.scrollY > 12);
};

const closeMenu = () => {
    if (!menuToggle) {
        return;
    }

    body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isOpen = body.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 860) {
            closeMenu();
        }
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
        closeMenu();
    }
});

window.addEventListener("scroll", syncHeaderState, { passive: true });
syncHeaderState();

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}
