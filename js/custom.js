// lenis initiate

// lenis initiate

// navbar mobile


// Close dropdown when clicking outside

document.querySelectorAll(".header-bottom > ul > li").forEach((li) => {
  li.addEventListener("click", function (event) {
    event.stopPropagation();

    // Remove "show" class from all .nav-drop elements
    document.querySelectorAll(".header-bottom .nav-drop").forEach((drop) => {
      drop.classList.remove("show");
    });

    // Remove "active" class from .main-wrapper
    const mainWrapper = document.querySelector(".main-wrapper");
    if (mainWrapper) {
      mainWrapper.classList.remove("active");
    }

    // Add "show" class to the .nav-drop inside the clicked li
    const navDrop = this.querySelector(".nav-drop");
    if (navDrop) {
      navDrop.classList.add("show");
      document.querySelector(".header-bottom").classList.add("overflow-hidden");

      // Add event listener to .nav-drop-bread inside this li
      const navDropBread = navDrop.querySelector(".nav-drop-bread");
      if (navDropBread) {
        navDropBread.addEventListener("click", function (e) {
          e.stopPropagation();
          navDrop.classList.remove("show");
          toggleHeaderOverflow();

          // Also remove "active" from .main-wrapper when closing dropdown
          if (mainWrapper) {
            mainWrapper.classList.remove("active");
          }
        });
      }
    }

    toggleHeaderOverflow();
  });
});


// Close dropdown when clicking outside
document.addEventListener("click", function () {
  document.querySelectorAll(".header-bottom .nav-drop").forEach((drop) => {
    drop.classList.remove("show");
  });

  // Remove "active" class from .main-wrapper when clicking outside
  const mainWrapper = document.querySelector(".main-wrapper");
  if (mainWrapper) {
    mainWrapper.classList.remove("active");
  }

  toggleHeaderOverflow();
});


// Function to toggle overflow-hidden on .header-bottom
function toggleHeaderOverflow() {
  const hasOpenDropdown = document.querySelector(
    ".header-bottom .nav-drop.show"
  );
  const headerBottom = document.querySelector(".header-bottom");

  if (hasOpenDropdown) {
    headerBottom.classList.add("overflow-hidden");
  } else {
    headerBottom.classList.remove("overflow-hidden");
  }
}

// navbar mobile

// nabar fixed

let lastScrollY = window.scrollY;

document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollY = window.scrollY;

  // Check if scrolling down
  if (scrollY > 142 && scrollY > lastScrollY) {
    header.classList.add("not-visible");
  }
  // Check if scrolling up
  else if (scrollY < lastScrollY) {
    header.classList.remove("not-visible");
  }

  // Update the last scroll position
  lastScrollY = scrollY;
});

// Function to add/remove 'active' class to the header when scrolling
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 142) {
    // If the page is scrolled, add the 'active' class
    header.classList.add("scrolled");
  } else {
    // If the page is at the top, remove the 'active' class
    header.classList.remove("scrolled");
  }
});

// search modal js

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
    var splide = new Splide(sliderElement, {
      type: "fade",
      pagination: false,
      rewind: false,
    });

    splide.mount();
  }
});

// Tips js

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
  const header = document.querySelector("header"); // Select header regardless of class
  const body = document.body;
  const main = document.querySelector(".main-wrapper")

  // Check if necessary elements exist
  if (!hamburgerIcon || !headerBottom || !body) {
    console.error(
      "Required DOM elements (hamburgerIcon, headerBottom, body) are not found."
    );
    return;
  }

  // Function to toggle active class
  const toggleActiveClass = () => {
    const isActive = headerBottom.classList.contains("active");

    headerBottom.classList.toggle("active", !isActive);

    if (header) {
      header.classList.toggle("active", !isActive); // Always toggle header active
    }

    hamburgerIcon.classList.toggle("active", !isActive);
    body.style.overflow = isActive ? "" : "hidden"; // Enable/disable body scroll
    main.classList.toggle("active", !isActive); 
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
      if (header) {
        header.classList.remove("active"); // Ensure header becomes inactive
      }
      hamburgerIcon.classList.remove("active");
      body.style.overflow = ""; // Restore body scroll
    }
  });
});

// animations

// text flip animation

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(SplitText);

  // Function to initialize the animation for each element
  function initializeAnimation(target) {
    if (target) {
      var tl = gsap.timeline({
        paused: true, // Pause the timeline initially
      });
      var mySplitText = new SplitText(target, { type: "words,chars" }),
        chars = mySplitText.chars; // An array of all the divs that wrap each character

      // Hide the target initially (opacity 0 and visibility hidden)
      gsap.set(target, { autoAlpha: 0 });

      // Set perspective for 3D effect
      gsap.set(target, { perspective: 400 });

      // Define the animation
      tl.to(target, { autoAlpha: 1, duration: 0 }); // Make the target visible at the start (opacity 0 -> 1)
      tl.from(chars, {
        duration: 1,
        opacity: 0,
        rotationY: 115,
        transformOrigin: "100% 0% 0",
        stagger: 0.03,
      });

      tl.restart(); // Trigger the animation
    }
  }

  // Intersection Observer to check if any .letter-animation element is in view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initializeAnimation(entry.target); // Initialize the animation for each element
          observer.unobserve(entry.target); // Stop observing after initialization
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  // Get all elements with the class 'letter-animation' (or use any other selector)
  const targets = document.querySelectorAll(".letter-animation");
  if (targets.length) {
    targets.forEach((target) => {
      observer.observe(target); // Observe each element with the class
    });
  }
});

// Text animation 2

document.addEventListener("DOMContentLoaded", () => {
  // Function to create the structure of the text (SplitText and wrapping)
  const createTextStructure = (element) => {
    // Apply SplitText only if it hasn't been applied already
    if (!element.classList.contains("split-text-applied")) {
      const splitText = new SplitText(element, {
        type: "lines",
        linesClass: "lineParent",
      });

      // Mark that SplitText has been applied
      element.classList.add("split-text-applied");

      // Wrap each line in a "lineChild" class
      const lines = element.querySelectorAll(".lineParent");
      lines.forEach((line) => {
        const lineChild = document.createElement("div");
        lineChild.classList.add("lineChild");
        lineChild.style.display = "block";
        lineChild.style.position = "relative";

        // Move the line's text content into the new child
        while (line.firstChild) {
          lineChild.appendChild(line.firstChild);
        }
        line.appendChild(lineChild);
      });
    }
  };

  // Function to animate elements when they come into view
  const animateSlideInText = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // If the element has already been animated, prevent re-animation
        if (element.classList.contains("animated")) {
          return;
        }

        // Mark element as animated
        element.classList.add("animated");

        // Ensure the text element becomes visible once it enters the viewport
        gsap.set(element, { opacity: 1 }); // Set opacity to 1 before animation

        // GSAP animation: Animate each line from its initial state
        gsap.to(element.querySelectorAll(".lineChild"), {
          opacity: 1, // Fade in
          y: 0, // Move to its original position
          stagger: 0, // Stagger each line's animation
          ease: "power3.out", // Smooth easing
          duration: 0.6, // Duration of each animation
        });

        // Unobserve the element after the animation triggers
        observer.unobserve(element);
      }
    });
  };

  // Set up the IntersectionObserver
  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.2, // Trigger when 20% of the element is in view
  };

  const observer = new IntersectionObserver(
    animateSlideInText,
    observerOptions
  );

  // Observe all <p>, <h2>, and <li> elements inside elements with the class "slide-in-text"
  const slideInTextElements = document.querySelectorAll(
    ".slide-in-text p, .slide-in-text h2, .slide-in-text h4, .slide-in-text .animate-btn"
  );
  slideInTextElements.forEach((el) => {
    // Create the text structure right away
    createTextStructure(el);

    // Observe the element for animation when it comes into view
    observer.observe(el);
  });
});

function initAnimations() {
  const animated = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(".fade-in-text");

          if (elements.length) {
            const toAnimate = Array.from(elements).filter(
              (el) => !animated.has(el)
            );

            if (toAnimate.length) {
              gsap.fromTo(
                toAnimate,
                { opacity: 0, y: 200 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "expo.out",
                  stagger: 0.1,
                  onStart: () => toAnimate.forEach((el) => animated.add(el)),
                }
              );
            }
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe existing and handle new elements
  const observeElements = () => {
    document
      .querySelectorAll(".text-animate")
      .forEach((section) => observer.observe(section));
  };

  observeElements();

  // Handle dynamic content
  new MutationObserver(observeElements).observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Initialize when GSAP is ready
(function checkGSAP() {
  if (typeof gsap !== "undefined") {
    initAnimations();
  } else {
    setTimeout(checkGSAP, 100);
  }
})();

// paralax effect

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 1024) {
    // Apply animations to elements inside each .pSection
    document.querySelectorAll(".pSection").forEach((section) => {
      const pContents = section.querySelectorAll(".pContent");
      const pImages = section.querySelectorAll(".pImage");
      const pBox = section.querySelectorAll(".pBox");

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

      // Animate .pBox elements
      if (pBox.length > 0) {
        gsap.to(pBox, {
          yPercent: -40,
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
