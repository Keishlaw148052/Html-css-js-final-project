// Characters Page JavaScript

console.log("Characters page loaded!");

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const characterCards = document.querySelectorAll('.character-card');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const searchInput = document.getElementById('search-input');
    const noResults = document.getElementById('no-results');

    // Current filter state
    let currentFilter = 'all';

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the type to filter
            currentFilter = this.getAttribute('data-type');
            
            // Clear search when filtering
            searchInput.value = '';
            
            // Apply filter
            applyFilter();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // Reset filter to 'all' when searching
        if (searchTerm !== '') {
            currentFilter = 'all';
            filterBtns.forEach(b => b.classList.remove('active'));
            filterBtns[0].classList.add('active');
        }
        
        applyFilter(searchTerm);
    });

    // Apply filter function
    function applyFilter(searchTerm = '') {
        let visibleCount = 0;

        characterCards.forEach(card => {
            const cardTypes = card.getAttribute('data-type');
            const characterName = card.querySelector('h3').textContent.toLowerCase();
            const characterDesc = card.querySelector('.character-description').textContent.toLowerCase();
            
            // Check filter match
            const matchesFilter = currentFilter === 'all' || cardTypes.includes(currentFilter);
            
            // Check search match
            const matchesSearch = searchTerm === '' || 
                                  characterName.includes(searchTerm) || 
                                  characterDesc.includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
                // Re-trigger animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease';
                }, 10);
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }

        console.log(`Showing ${visibleCount} characters`);
    }

    // Learn More button functionality
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const characterCard = this.closest('.character-card');
            const characterName = characterCard.querySelector('h3').textContent;
            const characterDesc = characterCard.querySelector('.character-description').textContent;
            const characterBadge = characterCard.querySelector('.character-badge').textContent;
            
            // Create detailed message
            const message = `📖 ${characterName} - ${characterBadge}\n\n${characterDesc}\n\nThis would open a detailed page about ${characterName}!`;
            
            alert(message);
            
            // Add animation feedback
            this.textContent = '✨ Loading...';
            this.style.animation = 'pulse 0.5s ease';
            
            setTimeout(() => {
                this.textContent = 'Learn More';
                this.style.animation = '';
            }, 1500);
        });
    });

    // Add hover sound effect (visual indication)
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.character-badge');
            badge.style.transform = 'scale(1.1)';
            badge.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.character-badge');
            badge.style.transform = 'scale(1)';
        });
    });

    // Add typing effect to search placeholder (optional enhancement)
    const placeholders = [
        '🔍 Search for a character...',
        '🔍 Try "Moses" or "David"...',
        '🔍 Find your favorite hero...',
        '🔍 Search for prophets...'
    ];
    
    let placeholderIndex = 0;
    setInterval(() => {
        if (document.activeElement !== searchInput) {
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            searchInput.placeholder = placeholders[placeholderIndex];
        }
    }, 3000);

    // Character stats display
    function displayStats() {
        const totalCharacters = characterCards.length;
        const prophets = document.querySelectorAll('[data-type*="prophet"]').length;
        const kings = document.querySelectorAll('[data-type*="king"]').length;
        const disciples = document.querySelectorAll('[data-type*="disciple"]').length;
        const heroes = document.querySelectorAll('[data-type*="hero"]').length;
        
        console.log('=== Character Stats ===');
        console.log(`Total Characters: ${totalCharacters}`);
        console.log(`Prophets: ${prophets}`);
        console.log(`Kings: ${kings}`);
        console.log(`Disciples: ${disciples}`);
        console.log(`Heroes: ${heroes}`);
        console.log('=====================');
    }

    // Display stats on load
    displayStats();

    // Smooth scroll to top when filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 300,
                behavior: 'smooth'
            });
        });
    });

    // Easter egg: Konami code for fun
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiPattern.join('')) {
            alert('🎉 You found the secret code! God bless you! 🙏');
            document.body.style.animation = 'pulse 2s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });

});
