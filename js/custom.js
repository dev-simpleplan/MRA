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

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Big Image animation - Appear from below
  gsap.from(".exp-image-big", {
    scrollTrigger: {
      trigger: ".exp-img-wrap", // Trigger when the section comes into view
      start: "top 80%", // Trigger when 80% of the section is visible
      end: "bottom 20%", // End the animation when 20% of the section is visible
      scrub: true, // Smooth scrub animation
      toggleActions: "play none none none", // Play the animation when the section is in view
    },
    y: 50, // Start below
    opacity: 0, // Start invisible
    duration: 0.8, // Duration for the animation
    ease: "power4.out", // Smooth easing
  });

  // Small Image animation - Appear after big image
  gsap.from(".exp-image-small", {
    scrollTrigger: {
      trigger: ".exp-img-wrap",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.3, // Small delay for the small image to appear after big image
    ease: "power4.out",
  });

  // Parallax Effect on small image
  gsap.to(".exp-image-small img", {
    scrollTrigger: {
      trigger: ".exp-img-wrap",
      start: "top 70%", // Trigger when the section is about 70% from the top
      end: "bottom top", // End when the section is out of view
      scrub: true, // Parallax effect follows the scroll
      pin: true, // Optional: Pin the small image while scrolling
      markers: false, // Disable markers for smoother experience
    },
    y: "30%", // Apply parallax movement
  });
});
