document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 16; // 16px is the gap between slides
    const visibleSlides = Math.floor(carousel.offsetWidth / slideWidth);
    const maxIndex = slides.length - visibleSlides;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
    
    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Adjust on window resize
    window.addEventListener('resize', () => {
        currentIndex = 0; // Reset to prevent issues
        updateCarousel();
    });
});