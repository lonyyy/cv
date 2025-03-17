const body = document.querySelector("body");

const nav = document.querySelector("nav");

const imagePreview = document.querySelector("#image-preview");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

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

      const centerY = targetRect.top + scrollY - window.innerHeight / 2;

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

const burgerMenuButton = document.querySelector(".burger-menu-button");

burgerMenuButton.addEventListener("click", () => {
  nav.classList.toggle("active");
});

const btnProjectDetails = document.querySelectorAll(".project-btn-details");

btnProjectDetails.forEach((btn) => {
  btn.addEventListener("click", () => {
    const projectSpecs =
      btn.parentElement.parentElement.parentElement.querySelector(
        ".project-specifications"
      );

    if (projectSpecs.classList.contains("active")) {
      projectSpecs.style.height = `${projectSpecs.scrollHeight}px`;

      setTimeout(() => {
        projectSpecs.style.height = "0px";
        projectSpecs.style.filter = "blur(10px)";
      }, 100);

      projectSpecs.classList.remove("active");
    } else {
      projectSpecs.style.height = `${projectSpecs.scrollHeight}px`;
      projectSpecs.classList.add("active");

      projectSpecs.addEventListener(
        "transitionend",
        () => {
          projectSpecs.style.height = "auto";
        },
        {
          once: true,
        }
      );

      setTimeout(() => {
        projectSpecs.style.filter = "none";
      }, 100);
    }
  });
});

imagePreview.addEventListener("click", closePreview);

function closePreview() {
  imagePreview.style.opacity = 0;
  imagePreview.style.pointerEvents = "none";
}

function showInPreview(event) {
  imagePreview.querySelector("img").src = event.target.src;

  imagePreview.style.opacity = 1;
  imagePreview.style.pointerEvents = "all";
}

document
  .querySelectorAll(".project-screenshots-carousel")
  .forEach((carousel) => {
    carousel.querySelectorAll("img").forEach((img) => {
      img.addEventListener("click", showInPreview);
    });
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Esc") closePreview();
});
