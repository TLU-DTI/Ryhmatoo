document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 16; // 16px is the gap between slides
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % (slides.length - 2); // Show 3 slides at a time
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + (slides.length - 3)) % (slides.length - 3);
        updateCarousel();
    }
    
    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
});
