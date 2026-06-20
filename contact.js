// Contact Page JavaScript

console.log("Contact page loaded!");

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Form Elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const formResponse = document.getElementById('form-response');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Character counter for message
    messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 500) {
            this.value = this.value.substring(0, 500);
            charCount.textContent = 500;
        }
        
        // Change color based on length
        if (length > 450) {
            charCount.style.color = '#FF6B6B';
        } else if (length > 400) {
            charCount.style.color = '#FFD93D';
        } else {
            charCount.style.color = '#999';
        }
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');

        // Clear previous errors
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';

        // Validate name
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Please enter your name (at least 2 characters)';
            nameInput.style.borderColor = '#FF6B6B';
            isValid = false;
        } else {
            nameInput.style.borderColor = '#7ED957';
        }

        // Validate email
        if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#FF6B6B';
            isValid = false;
        } else {
            emailInput.style.borderColor = '#7ED957';
        }

        // Validate subject
        if (subjectSelect.value === '') {
            subjectError.textContent = 'Please select a subject';
            subjectSelect.style.borderColor = '#FF6B6B';
            isValid = false;
        } else {
            subjectSelect.style.borderColor = '#7ED957';
        }

        // Validate message
        if (messageTextarea.value.trim().length < 10) {
            messageError.textContent = 'Please enter a message (at least 10 characters)';
            messageTextarea.style.borderColor = '#FF6B6B';
            isValid = false;
        } else {
            messageTextarea.style.borderColor = '#7ED957';
        }

        return isValid;
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Get form data
                const formData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    age: document.getElementById('age').value,
                    subject: subjectSelect.value,
                    message: messageTextarea.value,
                    newsletter: document.getElementById('newsletter').checked
                };

                console.log('Form submitted:', formData);

                // Show success message
                formResponse.textContent = '✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon!';
                formResponse.className = 'form-response success';
                formResponse.classList.remove('hidden');

                // Reset form
                contactForm.reset();
                charCount.textContent = '0';
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Send Message';

                // Reset border colors
                nameInput.style.borderColor = '#E0E0E0';
                emailInput.style.borderColor = '#E0E0E0';
                subjectSelect.style.borderColor = '#E0E0E0';
                messageTextarea.style.borderColor = '#E0E0E0';

                // Scroll to response
                formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Hide message after 5 seconds
                setTimeout(() => {
                    formResponse.classList.add('hidden');
                }, 5000);

            }, 1500);
        } else {
            // Show error message
            formResponse.textContent = '❌ Please fix the errors above before submitting.';
            formResponse.className = 'form-response error';
            formResponse.classList.remove('hidden');

            // Hide error after 3 seconds
            setTimeout(() => {
                formResponse.classList.add('hidden');
            }, 3000);
        }
    });

    // Real-time validation on blur
    nameInput.addEventListener('blur', function() {
        if (this.value.trim().length > 0 && this.value.trim().length < 2) {
            document.getElementById('name-error').textContent = 'Name too short';
            this.style.borderColor = '#FF6B6B';
        } else if (this.value.trim().length >= 2) {
            document.getElementById('name-error').textContent = '';
            this.style.borderColor = '#7ED957';
        }
    });

    emailInput.addEventListener('blur', function() {
        if (this.value.trim().length > 0 && !isValidEmail(this.value.trim())) {
            document.getElementById('email-error').textContent = 'Invalid email format';
            this.style.borderColor = '#FF6B6B';
        } else if (isValidEmail(this.value.trim())) {
            document.getElementById('email-error').textContent = '';
            this.style.borderColor = '#7ED957';
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Fun Facts Feature
    const funFacts = [
        "The Bible contains 66 books written by over 40 different authors!",
        "The shortest verse in the Bible is 'Jesus wept.' (John 11:35)",
        "The Bible has been translated into over 3,000 languages!",
        "David was about 15 years old when he fought Goliath!",
        "Noah's ark was about 450 feet long - bigger than a football field!",
        "The Bible mentions rainbows as God's promise to never flood the earth again!",
        "Jesus told over 40 parables during his ministry!",
        "The longest chapter in the Bible is Psalm 119 with 176 verses!",
        "Moses wrote the first five books of the Bible!",
        "The word 'Christian' appears only 3 times in the Bible!",
        "Methuselah lived to be 969 years old - the oldest person in the Bible!",
        "The Bible says faith, hope, and love are important, but love is the greatest!"
    ];

    let currentFactIndex = -1;
    const funFactText = document.getElementById('fun-fact');
    const newFactBtn = document.getElementById('new-fact-btn');

    function getRandomFact() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * funFacts.length);
        } while (newIndex === currentFactIndex && funFacts.length > 1);
        
        currentFactIndex = newIndex;
        return funFacts[currentFactIndex];
    }

    function displayNewFact() {
        funFactText.style.opacity = '0';
        setTimeout(() => {
            funFactText.textContent = getRandomFact();
            funFactText.style.opacity = '1';
        }, 300);
    }

    // Display initial fact
    displayNewFact();

    newFactBtn.addEventListener('click', displayNewFact);

    // Add smooth transition to fun fact
    funFactText.style.transition = 'opacity 0.3s ease';

    // Auto-rotate fun facts every 10 seconds
    setInterval(displayNewFact, 10000);

    // Add focus animations to form inputs
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });

    // Social link tracking (optional)
    const socialLinks = document.querySelectorAll('.social-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent;
            console.log(`User clicked ${platform} link`);
            alert(`${platform} page opening soon! 🎉`);
        });
    });

    // Add typing indicator for textarea
    let typingTimer;
    messageTextarea.addEventListener('input', function() {
        clearTimeout(typingTimer);
        this.style.borderColor = '#4ABFF2';
        
        typingTimer = setTimeout(() => {
            if (this.value.trim().length >= 10) {
                this.style.borderColor = '#7ED957';
            }
        }, 1000);
    });

    console.log('Contact page fully initialized!');
});
