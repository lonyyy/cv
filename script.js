const body = document.querySelector("body");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  const nav = document.querySelector("nav");

  if (scrolled > 10) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(
    ".projects-timeline__project"
  );
  const projectSections = document.querySelectorAll(".project-content");

  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const timelineLink = document.querySelector(
        `.projects-timeline__project[href="#${id}"]`
      );

      if (entry.isIntersecting) {
        timelineItems.forEach((item) => item.classList.remove("active"));
        timelineLink.classList.add("active");
      }
    });
  }, observerOptions);

  projectSections.forEach((section) => observer.observe(section));
});

window.addEventListener("load", () => {
  body.classList.remove("loading");
});

AOS.init();

function centerAnchorOnScreen() {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      const targetRect = target.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;

      const centerY = targetRect.top + scrollY - window.innerHeight / 2 + 20;

      window.scrollTo({
        top: centerY,
        behavior: "smooth",
      });
    }
  }
}

window.addEventListener("hashchange", centerAnchorOnScreen);

window.addEventListener("load", centerAnchorOnScreen);

document.addEventListener("click", function (event) {
  const link = event.target.closest('a[href^="#"]');

  if (link) {
    event.preventDefault();

    const hash = link.getAttribute("href");
    if (hash) {
      history.pushState(null, "", hash);
      centerAnchorOnScreen(hash);
    }
  }
});
