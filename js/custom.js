// aos initiate
AOS.init();
// aos initiate

// nabar sticky
// Function to add/remove 'active' class to the header when scrolling
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    // If the page is scrolled, add the 'active' class
    header.classList.add("scrolled");
  } else {
    // If the page is at the top, remove the 'active' class
    header.classList.remove("scrolled");
  }
});

// search modal js

// document.addEventListener("DOMContentLoaded", () => {
//   const searchButton = document.querySelector(".header-search");
//   const modal = document.querySelector(".search-modal");
//   const modalWrap = document.querySelector(".search-modal-wrap");
//   const modalClose = document.querySelector(".modal-close");
//   const modalOverlay = document.querySelector(".search-modal-overlay");
//   const body = document.body;

//   // Function to open the modal
//   const openModal = () => {
//     modal.classList.add("active");
//     modalOverlay.classList.add("active");
//     body.style.overflow = "hidden";
//     // wrapper.style.pointerEvents = "none";
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     modal.classList.remove("active");
//     modalOverlay.classList.remove("active");
//     body.style.overflow = "";
//     // wrapper.style.pointerEvents = "";
//   };

//   // Open modal when clicking on the search button
//   searchButton.addEventListener("click", (e) => {
//     e.stopPropagation(); // Prevent event from bubbling up
//     openModal();
//   });

//   // Close modal when clicking on the close button
//   modalClose.addEventListener("click", (e) => {
//     e.stopPropagation(); // Prevent event from bubbling up
//     closeModal();
//   });

//   // Close modal when clicking outside the .search-modal-wrap
//   document.addEventListener("click", (e) => {
//     if (
//       modal.classList.contains("active") &&
//       !modalWrap.contains(e.target) &&
//       e.target !== searchButton
//     ) {
//       closeModal();
//     }
//   });

//   // Prevent modal click from closing itself
//   modalWrap.addEventListener("click", (e) => {
//     e.stopPropagation();
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const searchButtons = document.querySelectorAll(".header-search"); // Select all header-search buttons
  const modal = document.querySelector(".search-modal");
  const modalWrap = document.querySelector(".search-modal-wrap");
  const modalClose = document.querySelector(".modal-close");
  const modalOverlay = document.querySelector(".search-modal-overlay");
  const body = document.body;

  // Function to open the modal
  const openModal = () => {
    modal.classList.add("active");
    modalOverlay.classList.add("active");
    body.style.overflow = "hidden";
  };

  // Function to close the modal
  const closeModal = () => {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
    body.style.overflow = "";
  };

  // Add event listeners to all search buttons
  searchButtons.forEach((searchButton) => {
    searchButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
      openModal();
    });
  });

  // Close modal when clicking on the close button
  modalClose.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    closeModal();
  });

  // Close modal when clicking outside the .search-modal-wrap
  document.addEventListener("click", (e) => {
    if (
      modal.classList.contains("active") &&
      !modalWrap.contains(e.target) &&
      ![...searchButtons].includes(e.target) // Check against all search buttons
    ) {
      closeModal();
    }
  });

  // Prevent modal click from closing itself
  modalWrap.addEventListener("click", (e) => {
    e.stopPropagation();
  });
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
  const header = document.querySelector("header.transparent");
  const body = document.body;

  // Function to toggle active class
  const toggleActiveClass = () => {
    const isActive = headerBottom.classList.contains("active");
    const headerTransparentExists = header.classList.contains("transparent"); // Check if header.transparent exists

    headerBottom.classList.toggle("active", !isActive);

    // Only toggle 'active' on header if 'header.transparent' exists
    if (headerTransparentExists) {
      header.classList.toggle("active", !isActive);
    }

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
      header.classList.remove("active");
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
      { opacity: 1, duration: 1.5 }, // Fade in the heading
      index === 0 ? 0 : `-=1` // Small delay, just enough to transition smoothly
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

// counter animation

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter span");
  const milestone = document.querySelector(".milestone");

  const startCounterAnimation = (counter) => {
    const target = +counter.textContent; // Get the target number directly from the content
    const duration = 1000; // Animation duration in ms
    const stepTime = 10; // Time between each update in ms
    const steps = duration / stepTime; // Number of steps
    const increment = target / steps;

    let current = 0;
    counter.textContent = "0"; // Start from 0
    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target; // Ensure exact target value
        clearInterval(interval);
      } else {
        counter.textContent = Math.ceil(current);
      }
    };

    const interval = setInterval(updateCounter, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => startCounterAnimation(counter));
          observer.disconnect(); // Stop observing after animation starts
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(milestone);
});

// FAQ
document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.querySelector(".faq");

  if (faqSection) {
    // Accordion functionality
    document.querySelectorAll(".accordion-header").forEach((button) => {
      button.addEventListener("click", () => {
        const accordionContent = button.nextElementSibling;
        const isOpening = !button.classList.contains("active");

        // Close all accordion items
        document.querySelectorAll(".accordion-content").forEach((content) => {
          if (content !== accordionContent) {
            content.style.height = "0px";
            content.classList.remove("active");
            content.previousElementSibling.classList.remove("active");
          }
        });

        // Toggle the clicked accordion item
        if (isOpening) {
          button.classList.add("active");
          accordionContent.classList.add("active");
          accordionContent.style.height =
            accordionContent.scrollHeight + 24 + "px";
        } else {
          button.classList.remove("active");
          accordionContent.classList.remove("active");
          accordionContent.style.height = "0px";
        }
      });
    });

    // Open the first FAQ by default
    const firstButton = document.querySelector(".accordion-header");
    const firstContent = firstButton.nextElementSibling;

    firstButton.classList.add("active");
    firstContent.classList.add("active");
    firstContent.style.height = firstContent.scrollHeight + 18 + "px";

    // Ensure smooth transitions when window is resized
    window.addEventListener("resize", () => {
      document
        .querySelectorAll(".accordion-content.active")
        .forEach((content) => {
          content.style.height = content.scrollHeight + "px";
        });
    });
  }
});
