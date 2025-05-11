
// Valib karusselli pildi "raja" konteineri (see, mis liigub)
const track = document.querySelector('.carousel-track');
// Valib kõik karussellis olevad pildid
const images = document.querySelectorAll('.carousel img');
// Valib nupu "eelmine"
const prevBtn = document.querySelector('.carousel-button.prev');
// Valib nupu "järgmine"
const nextBtn = document.querySelector('.carousel-button.next');

// Aktiivse (kuvatava) pildi indeks, alustame nullist
let currentIndex = 0;

// Funktsioon, mis liigutab karusselli õigele pildile vastavalt indeksile
function updateCarousel() {
  const imageWidth = images[0].clientWidth; // ühe pildi laius
  track.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // liigutab raja vasakule
}

// Kui vajutatakse nupule "järgmine"
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length; // liigub järgmise pildi peale, tagasi algusesse kui lõppu jõuab
  updateCarousel();  //uuendab karusselli vaadet
});

// Kui vajutatakse nupule "eelmine"
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // liigub eelmise pildi peale, lõppu kui algusesse jõuab
  updateCarousel();
});

// Kui akna suurust muudetakse, uuendatakse karusselli vaadet
window.addEventListener('resize', updateCarousel);



