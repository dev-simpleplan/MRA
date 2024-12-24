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
