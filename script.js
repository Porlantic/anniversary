document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const giftContainer = document.getElementById('giftContainer');
    const contentContainer = document.getElementById('contentContainer');
    const giftLid = document.querySelector('.gift-lid');
    
    // Correct password: 04-13-25
    const correctPassword = '04-13-25';
    
    // Auto-dash formatting for password input
    passwordInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = value.substring(0, 2);
            if (value.length > 2) {
                formattedValue += '-' + value.substring(2, 4);
            }
            if (value.length > 4) {
                formattedValue += '-' + value.substring(4, 6);
            }
        }
        
        e.target.value = formattedValue;
    });
    
    // Unlock functionality
    function unlockGift() {
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === correctPassword) {
            // Open the gift box
            giftLid.classList.add('open');
            
            // Wait for animation, then show content
            setTimeout(() => {
                giftContainer.style.display = 'none';
                contentContainer.classList.remove('hidden');
                
                // Scroll to top smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Play video if it exists
                const video = document.getElementById('mainVideo');
                if (video) {
                    video.play().catch(e => {
                        console.log('Auto-play prevented, user will need to click play');
                    });
                }
            }, 600);
        } else {
            // Wrong password animation
            passwordInput.style.animation = 'shake 0.5s';
            passwordInput.style.borderColor = '#FF0000';
            
            setTimeout(() => {
                passwordInput.style.animation = '';
                passwordInput.style.borderColor = '#FFD700';
            }, 500);
        }
    }
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    unlockBtn.addEventListener('click', unlockGift);
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            unlockGift();
        }
    });
    
    // Photo gallery lightbox effect
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.photo-caption').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${caption}">
                    <div class="lightbox-caption">${caption}</div>
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            // Add lightbox styles
            const lightboxStyle = document.createElement('style');
            lightboxStyle.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    cursor: pointer;
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                
                .lightbox-content img {
                    width: 100%;
                    height: auto;
                    border-radius: 15px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                }
                
                .lightbox-caption {
                    position: absolute;
                    bottom: -40px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    color: white;
                    font-size: 18px;
                    padding: 10px;
                }
                
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 36px;
                    cursor: pointer;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                }
                
                .lightbox-close:hover {
                    color: #FF1493;
                }
            `;
            
            if (!document.querySelector('style[data-lightbox]')) {
                lightboxStyle.setAttribute('data-lightbox', 'true');
                document.head.appendChild(lightboxStyle);
            }
            
            document.body.appendChild(lightbox);
            
            // Close lightbox on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // Close on close button
            lightbox.querySelector('.lightbox-close').addEventListener('click', function(e) {
                e.stopPropagation();
                document.body.removeChild(lightbox);
            });
        });
    });
    
    // Smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});
