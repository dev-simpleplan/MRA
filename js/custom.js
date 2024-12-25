// aos initiate
AOS.init();
// aos initiate

// nabar sticky
// Function to add/remove 'active' class to the header when scrolling
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    // If the page is scrolled, add the 'active' class
    header.classList.add("active");
  } else {
    // If the page is at the top, remove the 'active' class
    header.classList.remove("active");
  }
});

// testimonial slider

document.addEventListener("DOMContentLoaded", function () {
  const sliderElement = document.getElementById("testimonial-slider");
  if (sliderElement) {
    var splide = new Splide(".splide", {
      type: "fade",
      pagination: false,
      rewind: false,
    });

    splide.mount();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tipsContainer = document.querySelector(".tips");
  if (tipsContainer) {
    document.querySelectorAll(".tip-item").forEach(function (item) {
      item.addEventListener("click", function () {
        if (!this.classList.contains("full")) {
          // Remove the 'open' class from all .tip-item elements
          document
            .querySelectorAll(".tip-item.open")
            .forEach(function (openItem) {
              openItem.classList.remove("open");
            });

          // Add the 'open' class to the clicked element
          this.classList.add("open");
        }
      });
    });
  }
});

// navbar
document.addEventListener("DOMContentLoaded", () => {
  // Select the elements
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const headerBottom = document.querySelector(".header-bottom");
  const body = document.body;

  // Function to toggle active class
  const toggleActiveClass = () => {
    const isActive = headerBottom.classList.contains("active");
    headerBottom.classList.toggle("active", !isActive);
    hamburgerIcon.classList.toggle("active", !isActive);
    body.style.overflow = isActive ? "" : "hidden"; // Enable/disable body scroll
  };

  // Event listener for the hamburger icon
  hamburgerIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event from bubbling
    toggleActiveClass();
  });

  // Event listener for clicking outside the header-bottom
  document.addEventListener("click", (event) => {
    if (
      !headerBottom.contains(event.target) &&
      !hamburgerIcon.contains(event.target)
    ) {
      headerBottom.classList.remove("active");
      hamburgerIcon.classList.remove("active");
      body.style.overflow = ""; // Restore body scroll
    }
  });
});

// animations

// text flip animation

document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with the class `text-animation`
  const headings = document.querySelectorAll(".text-animation");

  // Create a GSAP timeline
  const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

  // Loop through each heading and create animation
  headings.forEach((heading, index) => {
    // Get the text content of the heading
    const headingText = heading.textContent;

    // Clear the original text
    heading.textContent = "";

    // Create spans for each letter
    headingText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
      heading.appendChild(span);
    });

    // Select all letters in the current heading
    const letters = heading.querySelectorAll(".letter");

    // Add animation for this heading to the timeline
    timeline.to(
      heading,
      { opacity: 1, duration: 0.6 }, // Fade in the heading
      index === 0 ? 0 : `+=0.1` // Small delay, just enough to transition smoothly
    );

    // Animate letters for the current heading
    timeline.fromTo(
      letters,
      { rotateY: 90, opacity: 0, scale: 0.8 }, // Initial state with a subtle scale effect
      {
        rotateY: 0,
        opacity: 1,
        scale: 1, // Scale back to normal
        duration: 0.6, // Duration for smoother animation
        stagger: 0.05, // Reduce stagger for smoother flow
        ease: "expo.out", // Smooth easing
      },
      ">-1" // Slight overlap to make animations feel continuous
    );
  });
});

// paralax effect

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 1024) {
    // Apply animations to elements inside each .pSection
    document.querySelectorAll(".pSection").forEach((section) => {
      const pContents = section.querySelectorAll(".pContent");
      const pImages = section.querySelectorAll(".pImage");

      // Animate .pContent elements
      if (pContents.length > 0) {
        gsap.to(pContents, {
          yPercent: -200,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Animate .pImage elements
      if (pImages.length > 0) {
        gsap.to(pImages, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }
});
