document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-container form');
    const responseMessage = document.querySelector('.response-message');

    if (contactForm && responseMessage) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            responseMessage.textContent = 'Thanks! Your message was sent.';
            responseMessage.style.color = '#0077cc';
            responseMessage.style.marginTop = '1rem';
            responseMessage.style.textAlign = 'center';
            responseMessage.style.display = 'block';
            responseMessage.style.padding = '10px';
            responseMessage.style.backgroundColor = '#f0f8ff';
            responseMessage.style.border = '1px solid #0077cc';
            responseMessage.style.borderRadius = '5px';

            contactForm.reset();
            
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 5000);
        });
    }
});