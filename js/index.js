// Ootame, kuni kogu HTML on laaditud
document.addEventListener('DOMContentLoaded', () => {
    // Valime karusselli raja (liikuv konteiner)
    const track = document.querySelector('.carousel-track');
    
    // Valime kõik slaidid karussellis
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Nupud: eelmine ja järgmine
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    // Karusselli konteiner
    const carousel = document.querySelector('.carousel');
    
    // Aktiivne slaidi indeks
    let currentIndex = 0;

    // Arvutame ühe slaidi laiuse koos vahega (16px)
    const slideWidth = slides[0].offsetWidth + 16;
    
    // Kui mitu slaidi mahub nähtavale alale
    const visibleSlides = Math.floor(carousel.offsetWidth / slideWidth);
    
    // Maksimaalne indeks, kuhu saame liikuda
    const maxIndex = slides.length - visibleSlides;

    // Funktsioon karusselli uuendamiseks (liigutab slaide)
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // Liigu järgmisele slaidile
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Liigu eelmisele slaidile
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Keelame horisontaalse kerimise
    document.body.style.overflowX = 'hidden';
    
    // Nupuvajutuste kuulajad
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Uuendame karusselli akna suuruse muutumisel
    window.addEventListener('resize', () => {
        currentIndex = 0; // Lähtesta, et vältida probleeme
        updateCarousel();
    });

    // Tähtede hindamise funktsionaalsus
    const stars = document.querySelectorAll('.star');
    const ratingValues = {};

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const criteria = this.closest('.stars').dataset.criteria;
            const value = parseInt(this.dataset.value);
            
            // Eemaldame aktiivsuse kõigilt tähtedelt selles kriteeriumis
            const criteriaStars = this.closest('.stars').querySelectorAll('.star');
            criteriaStars.forEach(s => s.classList.remove('active'));
            
            // Aktiveerime kõik tähed kuni klikitud tähiseni
            for (let i = 0; i < value; i++) {
                criteriaStars[i].classList.add('active');
            }
            
            // Salvestame antud hinnangu
            ratingValues[criteria] = value;
        });
    });

    // Fotode üleslaadimise funktsionaalsus
    const photoInputs = document.querySelectorAll('.photo-input');
    const photoPreviews = document.querySelectorAll('.photo-preview');

    photoInputs.forEach((input, index) => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                const preview = photoPreviews[index];
                const previewImage = preview.querySelector('.preview-image');
                const placeholder = preview.querySelector('.photo-placeholder');
                const removeButton = preview.querySelector('.remove-photo');

                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    placeholder.style.display = 'none';
                    removeButton.style.display = 'block';
                }

                reader.readAsDataURL(file);
            }
        });
    });

    // Foto eemaldamise funktsionaalsus
    document.querySelectorAll('.remove-photo').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const preview = this.closest('.photo-preview');
            const input = preview.querySelector('.photo-input');
            const previewImage = preview.querySelector('.preview-image');
            const placeholder = preview.querySelector('.photo-placeholder');

            input.value = '';
            previewImage.style.display = 'none';
            placeholder.style.display = 'flex';
            this.style.display = 'none';
        });
    });

    // Tagasisidevormi töötlemine
    const feedbackForm = document.getElementById('feedbackForm');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    // Kuupäevavahemiku valideerimine
    function validateDateRange() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        
        if (startDate > endDate) {
            alert('Lõppkuupäev peab olema hilisem kui alguskuupäev!');
            return false;
        }
        return true;
    }
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateDateRange()) {
            return;
        }
        
        // Kogume vormi andmed
        const formData = {
            country: document.getElementById('country').value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            ratings: ratingValues,
            experience: document.getElementById('experience').value,
            recommendations: document.getElementById('recommendations').value,
            photos: Array.from(photoInputs).map(input => input.files[0])
        };
        
        // Tavaliselt saadetaks need andmed serverisse
        console.log('Vorm saadetud:', formData);
        
        // Näitame edukuse teadet
        alert('Aitäh tagasiside eest! Teie arvamus on saadetud.');
        
        // Lähtestame vormi
        feedbackForm.reset();
        stars.forEach(star => star.classList.remove('active'));
        Object.keys(ratingValues).forEach(key => delete ratingValues[key]);
        
        // Lähtestame fotode eelvaated
        photoPreviews.forEach(preview => {
            const previewImage = preview.querySelector('.preview-image');
            const placeholder = preview.querySelector('.photo-placeholder');
            const removeButton = preview.querySelector('.remove-photo');
            
            previewImage.style.display = 'none';
            placeholder.style.display = 'flex';
            removeButton.style.display = 'none';
        });
    });
});
