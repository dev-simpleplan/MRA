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
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

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
      { opacity: 1, duration: 0.1 }, // Fade in the heading
      index === 0 ? 0 : `+=0.1` // Add delay between headings
    );
    timeline.fromTo(
      letters,
      { rotateY: 90, opacity: 0 },
      {
        rotateY: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08, // Delay between each letter animation
        ease: "power3.out",
      },
      ">-0.2" // Slight overlap for smoother transition
    );
  });
});
