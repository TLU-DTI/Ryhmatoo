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

    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    const ratingValues = {};

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const criteria = this.closest('.stars').dataset.criteria;
            const value = parseInt(this.dataset.value);
            
            // Reset all stars in this criteria
            const criteriaStars = this.closest('.stars').querySelectorAll('.star');
            criteriaStars.forEach(s => s.classList.remove('active'));
            
            // Activate stars up to clicked one
            for (let i = 0; i < value; i++) {
                criteriaStars[i].classList.add('active');
            }
            
            // Store the rating
            ratingValues[criteria] = value;
        });
    });

    // Photo upload functionality
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

    // Remove photo functionality
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

    // Form submission handling
    const feedbackForm = document.getElementById('feedbackForm');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    // Validate date range
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
        
        // Collect form data
        const formData = {
            country: document.getElementById('country').value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            ratings: ratingValues,
            experience: document.getElementById('experience').value,
            recommendations: document.getElementById('recommendations').value,
            photos: Array.from(photoInputs).map(input => input.files[0])
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Aitäh tagasiside eest! Teie arvamus on saadetud.');
        
        // Reset form
        feedbackForm.reset();
        stars.forEach(star => star.classList.remove('active'));
        Object.keys(ratingValues).forEach(key => delete ratingValues[key]);
        
        // Reset photos
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