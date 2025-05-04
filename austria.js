
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');

let currentIndex = 0;

function updateCarousel() {
  const imageWidth = images[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});


window.addEventListener('resize', updateCarousel);



