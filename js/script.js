document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightboxImg.classList.add('lightbox-content');
    lightbox.appendChild(lightboxImg);

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('lightbox-close');
    closeBtn.innerHTML = '&times;';
    lightbox.appendChild(closeBtn);

    const prevBtn = document.createElement('span');
    prevBtn.classList.add('lightbox-prev');
    prevBtn.innerHTML = '&#10094;';
    lightbox.appendChild(prevBtn);

    const nextBtn = document.createElement('span');
    nextBtn.classList.add('lightbox-next');
    nextBtn.innerHTML = '&#10095;';
    lightbox.appendChild(nextBtn);

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
        lightboxImg.src = imgSrc;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    // Event Listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
