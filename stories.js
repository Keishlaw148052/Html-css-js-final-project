// Stories Page JavaScript

console.log("Stories page loaded!");

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all filter buttons and story cards
    const filterBtns = document.querySelectorAll('.filter-btn');
    const storyCards = document.querySelectorAll('.story-card');
    const readBtns = document.querySelectorAll('.read-btn');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category to filter
            const category = this.getAttribute('data-category');
            
            // Show/hide story cards based on category
            storyCards.forEach(card => {
                if (category === 'all') {
                    card.classList.remove('hidden');
                    // Re-trigger animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.5s ease';
                    }, 10);
                } else {
                    const cardCategories = card.getAttribute('data-category');
                    if (cardCategories.includes(category)) {
                        card.classList.remove('hidden');
                        // Re-trigger animation
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = 'fadeIn 0.5s ease';
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Read button functionality
    readBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const storyCard = this.closest('.story-card');
            const storyTitle = storyCard.querySelector('h3').textContent;
            
            // Show alert with story title (can be replaced with modal or navigation)
            alert(`Opening: ${storyTitle}\n\nThis would open the full story page!`);
            
            // Optional: Add a fun animation
            this.textContent = '📖 Opening...';
            setTimeout(() => {
                this.textContent = 'Read Story';
            }, 1500);
        });
    });

    // Add hover effect sound indicator (visual only)
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '5px solid #FF74B1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });

    // Count visible stories
    function updateStoryCount() {
        const visibleStories = document.querySelectorAll('.story-card:not(.hidden)');
        console.log(`Showing ${visibleStories.length} stories`);
    }

    // Call count on page load
    updateStoryCount();

    // Update count when filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', updateStoryCount);
    });

    // Optional: Scroll to top animation when filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 300,
                behavior: 'smooth'
            });
        });
    });

});
