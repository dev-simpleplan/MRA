document.addEventListener('DOMContentLoaded', function () {
    const sliderElement = document.getElementById('testimonial-slider');
    if (sliderElement) {
        var splide = new Splide( '.splide', {
            type  : 'fade',
            pagination : false,
            rewind: false,
          } );
          
          splide.mount();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const tipsContainer = document.querySelector('.tips');
    if (tipsContainer) {
        document.querySelectorAll('.tip-item').forEach(function (item) {
            item.addEventListener('click', function () {
                if (!this.classList.contains('full')) {
                    // Remove the 'open' class from all .tip-item elements
                    document.querySelectorAll('.tip-item.open').forEach(function (openItem) {
                        openItem.classList.remove('open');
                    });

                    // Add the 'open' class to the clicked element
                    this.classList.add('open');
                }
            });
        });
    }
});
