
    // ============================================
    // Starfield Background Animation
    // ============================================
    function createStarfield() {
      const starfield = document.getElementById('starfield');
      // Clear existing stars
      starfield.innerHTML = '';
      
      const starCount = 150;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position across entire viewport
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random drift direction (gentle)
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 40;
        const driftX = Math.cos(angle) * distance;
        const driftY = Math.sin(angle) * distance;
        
        // Random size (smaller stars)
        const size = Math.random() * 1.5 + 0.5;
        
        // Random animation duration (60-100s for smooth, continuous drift)
        const duration = Math.random() * 40 + 60;
        const delay = Math.random() * 20;
        
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.setProperty('--drift-x', driftX + 'px');
        star.style.setProperty('--drift-y', driftY + 'px');
        star.style.setProperty('--duration', duration);
        star.style.setProperty('--start-opacity', Math.random() * 0.6 + 0.2);
        star.style.animationDelay = delay + 's';
        
        starfield.appendChild(star);
      }
    }
    
    // Initialize starfield on page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createStarfield);
    } else {
      createStarfield();
    }
    
    // Reinitialize starfield when window resizes (for responsiveness)
    window.addEventListener('resize', () => {
      createStarfield();
    });

    // ============================================
    // Configuration and Default Values
    // ============================================
    const defaultConfig = {
      hotel_name: 'Luxury Stay',
      hero_subtitle: 'Book Your Perfect Stay',
      cta_button_text: 'Book Now',
      phone_number: '+1 (555) 123-4567',
      email_address: 'info@luxurystay.com',
      hotel_address: '123 Luxury Avenue,\nBeverly Hills, CA 90210',
      background_color: '#0a1121',
      surface_color: '#1a2744',
      text_color: '#ffffff',
      accent_color: '#d4af37',
      secondary_color: '#0f172a',
      font_family: 'Montserrat',
      font_size: 16
    };

    // Room pricing configuration
    const roomPrices = {
      single: 150,
      double: 250,
      suite: 450
    };

    const roomNames = {
      single: 'Single Room',
      double: 'Double Room',
      suite: 'Luxury Suite'
    };

    // ============================================
    // Element SDK Initialization
    // ============================================
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
          // Update hotel name in navigation and footer
          const hotelName = config.hotel_name || defaultConfig.hotel_name;
          document.getElementById('nav-hotel-name').textContent = hotelName;
          document.getElementById('footer-hotel-name').textContent = hotelName;
          
          // Update hero section
          const heroTitle = document.getElementById('hero-title');
          heroTitle.innerHTML = `<span class="text-white">${hotelName.split(' ')[0] || 'Luxury'}</span><span class="text-gold-400"> ${hotelName.split(' ').slice(1).join(' ') || 'Stay'}</span><span class="text-white"> Hotel</span>`;
          
          document.getElementById('hero-subtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
          document.getElementById('hero-cta').textContent = config.cta_button_text || defaultConfig.cta_button_text;
          
          // Update footer contact info
          document.getElementById('footer-phone').textContent = config.phone_number || defaultConfig.phone_number;
          document.getElementById('footer-email').textContent = config.email_address || defaultConfig.email_address;
          document.getElementById('footer-address').innerHTML = (config.hotel_address || defaultConfig.hotel_address).replace(/\n/g, '<br>');
          
          // Update colors
          const bgColor = config.background_color || defaultConfig.background_color;
          const surfaceColor = config.surface_color || defaultConfig.surface_color;
          const textColor = config.text_color || defaultConfig.text_color;
          const accentColor = config.accent_color || defaultConfig.accent_color;
          
          document.documentElement.style.setProperty('--bg-color', bgColor);
          document.documentElement.style.setProperty('--surface-color', surfaceColor);
          document.documentElement.style.setProperty('--text-color', textColor);
          document.documentElement.style.setProperty('--accent-color', accentColor);
          
          // Update font
          const fontFamily = config.font_family || defaultConfig.font_family;
          const baseFontStack = 'sans-serif';
          document.body.style.fontFamily = `${fontFamily}, ${baseFontStack}`;
          
          // Update font size scaling
          const baseSize = config.font_size || defaultConfig.font_size;
          document.documentElement.style.fontSize = `${baseSize}px`;
        },
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => { config.background_color = value; window.elementSdk.setConfig({ background_color: value }); }
            },
            {
              get: () => config.surface_color || defaultConfig.surface_color,
              set: (value) => { config.surface_color = value; window.elementSdk.setConfig({ surface_color: value }); }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => { config.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
            },
            {
              get: () => config.accent_color || defaultConfig.accent_color,
              set: (value) => { config.accent_color = value; window.elementSdk.setConfig({ accent_color: value }); }
            },
            {
              get: () => config.secondary_color || defaultConfig.secondary_color,
              set: (value) => { config.secondary_color = value; window.elementSdk.setConfig({ secondary_color: value }); }
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => { config.font_family = value; window.elementSdk.setConfig({ font_family: value }); }
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => { config.font_size = value; window.elementSdk.setConfig({ font_size: value }); }
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['hotel_name', config.hotel_name || defaultConfig.hotel_name],
          ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
          ['cta_button_text', config.cta_button_text || defaultConfig.cta_button_text],
          ['phone_number', config.phone_number || defaultConfig.phone_number],
          ['email_address', config.email_address || defaultConfig.email_address],
          ['hotel_address', config.hotel_address || defaultConfig.hotel_address]
        ])
      });
    }

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // ============================================
    // Date Input Initialization
    // ============================================
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    // Set minimum date to today
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    checkinInput.min = todayStr;
    checkoutInput.min = todayStr;

    // Set default dates (today and tomorrow)
    checkinInput.value = todayStr;
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkoutInput.value = tomorrow.toISOString().split('T')[0];

    // ============================================
    // Booking Summary Update Functions
    // ============================================
    function updateSummary() {
      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const roomType = document.getElementById('room-type').value;
      const adults = parseInt(document.getElementById('adults').value);
      const children = parseInt(document.getElementById('children').value);

      // Update room display
      const summaryRoom = document.getElementById('summary-room');
      summaryRoom.textContent = roomType ? roomNames[roomType] : 'Not selected';

      // Update date displays
      const summaryCheckin = document.getElementById('summary-checkin');
      const summaryCheckout = document.getElementById('summary-checkout');
      
      if (checkin) {
        summaryCheckin.textContent = formatDate(checkin);
      } else {
        summaryCheckin.textContent = '—';
      }
      
      if (checkout) {
        summaryCheckout.textContent = formatDate(checkout);
      } else {
        summaryCheckout.textContent = '—';
      }

      // Update guest count
      const summaryGuests = document.getElementById('summary-guests');
      summaryGuests.textContent = `${adults} Adult${adults !== 1 ? 's' : ''}, ${children} Child${children !== 1 ? 'ren' : ''}`;

      // Calculate and update nights and total price
      const summaryNights = document.getElementById('summary-nights');
      const summaryPricePerNight = document.getElementById('summary-price-per-night');
      const summaryTotal = document.getElementById('summary-total');

      if (checkin && checkout && roomType) {
        const nights = calculateNights(checkin, checkout);
        const pricePerNight = roomPrices[roomType];
        const total = nights * pricePerNight;

        summaryNights.textContent = nights > 0 ? nights : 0;
        summaryPricePerNight.textContent = `$${pricePerNight}`;
        summaryTotal.textContent = `$${total > 0 ? total.toLocaleString() : 0}`;
      } else {
        summaryNights.textContent = '0';
        summaryPricePerNight.textContent = '$0';
        summaryTotal.textContent = '$0';
      }
    }

    // Calculate number of nights between two dates
    function calculateNights(checkin, checkout) {
      const start = new Date(checkin);
      const end = new Date(checkout);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }

    // Format date for display
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    // ============================================
    // Event Listeners for Form Updates
    // ============================================
    checkinInput.addEventListener('change', () => {
      // Ensure checkout is after checkin
      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        const newCheckout = new Date(checkinInput.value);
        newCheckout.setDate(newCheckout.getDate() + 1);
        checkoutInput.value = newCheckout.toISOString().split('T')[0];
      }
      checkoutInput.min = checkinInput.value;
      updateSummary();
    });

    checkoutInput.addEventListener('change', updateSummary);
    document.getElementById('room-type').addEventListener('change', updateSummary);

    // Guest count adjustment
    function adjustGuests(type, delta) {
      const input = document.getElementById(type);
      const currentValue = parseInt(input.value);
      const min = parseInt(input.min);
      const max = parseInt(input.max);
      const newValue = Math.min(max, Math.max(min, currentValue + delta));
      input.value = newValue;
      updateSummary();
    }

    // Select room from room cards
    function selectRoom(roomType, price) {
      const roomSelect = document.getElementById('room-type');
      roomSelect.value = roomType;
      updateSummary();
      
      // Scroll to booking section
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
      
      // Show toast notification
      showToast(`${roomNames[roomType]} selected - $${price}/night`, 'success');
    }

    // ============================================
    // Form Validation
    // ============================================
    function validateForm() {
      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const roomType = document.getElementById('room-type').value;
      const adults = parseInt(document.getElementById('adults').value);

      const errors = [];

      // Check if dates are selected
      if (!checkin) {
        errors.push('Please select a check-in date.');
      }
      if (!checkout) {
        errors.push('Please select a check-out date.');
      }

      // Validate date logic
      if (checkin && checkout) {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if (checkinDate < todayDate) {
          errors.push('Check-in date cannot be in the past.');
        }
        if (checkoutDate <= checkinDate) {
          errors.push('Check-out date must be after check-in date.');
        }
      }

      // Validate room selection
      if (!roomType) {
        errors.push('Please select a room type.');
      }

      // Validate guest count
      if (adults < 1) {
        errors.push('At least one adult is required.');
      }

      return errors;
    }

    // Show/hide error message
    function showError(message) {
      const errorDiv = document.getElementById('error-message');
      const errorText = document.getElementById('error-text');
      errorText.textContent = message;
      errorDiv.classList.remove('hidden');
    }

    function hideError() {
      const errorDiv = document.getElementById('error-message');
      errorDiv.classList.add('hidden');
    }

    // ============================================
    // Form Submission
    // ============================================
    const bookingForm = document.getElementById('booking-form');
    
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideError();

      // Validate form
      const errors = validateForm();
      if (errors.length > 0) {
        showError(errors[0]);
        return;
      }

      // Show loading state
      const submitBtn = document.getElementById('submit-btn');
      const submitText = document.getElementById('submit-text');
      const submitSpinner = document.getElementById('submit-spinner');
      
      submitBtn.disabled = true;
      submitText.textContent = 'Processing...';
      submitSpinner.classList.remove('hidden');

      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Gather booking details
      const bookingDetails = {
        roomType: roomNames[document.getElementById('room-type').value],
        checkin: formatDate(checkinInput.value),
        checkout: formatDate(checkoutInput.value),
        nights: calculateNights(checkinInput.value, checkoutInput.value),
        adults: document.getElementById('adults').value,
        children: document.getElementById('children').value,
        total: document.getElementById('summary-total').textContent,
        confirmationNumber: 'LXS' + Math.random().toString(36).substr(2, 9).toUpperCase()
      };

      // Show success modal
      showSuccessModal(bookingDetails);

      // Reset form and loading state
      submitBtn.disabled = false;
      submitText.textContent = 'Complete Booking';
      submitSpinner.classList.add('hidden');
    });

    // ============================================
    // Success Modal Functions
    // ============================================
    function showSuccessModal(details) {
      const modal = document.getElementById('success-modal');
      const modalContent = document.getElementById('modal-content');
      const confirmationDiv = document.getElementById('booking-confirmation');

      // Populate confirmation details
      confirmationDiv.innerHTML = `
        <div class="flex justify-between"><span class="text-white/60">Confirmation #:</span><span class="text-gold-400 font-mono">${details.confirmationNumber}</span></div>
        <div class="flex justify-between"><span class="text-white/60">Room:</span><span class="text-white">${details.roomType}</span></div>
        <div class="flex justify-between"><span class="text-white/60">Check-in:</span><span class="text-white">${details.checkin}</span></div>
        <div class="flex justify-between"><span class="text-white/60">Check-out:</span><span class="text-white">${details.checkout}</span></div>
        <div class="flex justify-between"><span class="text-white/60">Duration:</span><span class="text-white">${details.nights} night${details.nights !== 1 ? 's' : ''}</span></div>
        <div class="flex justify-between"><span class="text-white/60">Guests:</span><span class="text-white">${details.adults} Adults, ${details.children} Children</span></div>
        <div class="flex justify-between pt-2 border-t border-gold-400/20 mt-2"><span class="text-white font-semibold">Total:</span><span class="text-gold-400 font-bold">${details.total}</span></div>
      `;

      // Show modal with animation
      modal.classList.remove('hidden');
      setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
      }, 50);

      // Reset form
      bookingForm.reset();
      document.getElementById('adults').value = 2;
      document.getElementById('children').value = 0;
      checkinInput.value = todayStr;
      checkoutInput.value = tomorrow.toISOString().split('T')[0];
      updateSummary();
    }

    function closeSuccessModal() {
      const modal = document.getElementById('success-modal');
      const modalContent = document.getElementById('modal-content');

      modalContent.classList.remove('scale-100', 'opacity-100');
      modalContent.classList.add('scale-95', 'opacity-0');
      
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    }

    // ============================================
    // Toast Notification System
    // ============================================
    function showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      
      const bgColor = type === 'success' ? 'bg-green-500/20 border-green-500/50' : 
                      type === 'error' ? 'bg-red-500/20 border-red-500/50' : 
                      'bg-gold-400/20 border-gold-400/50';
      
      const textColor = type === 'success' ? 'text-green-300' : 
                        type === 'error' ? 'text-red-300' : 
                        'text-gold-400';

      toast.className = `toast ${bgColor} border rounded-lg p-4 shadow-lg backdrop-blur-sm max-w-sm`;
      toast.innerHTML = `
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 ${textColor} flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' : 
              type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>' :
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
          </svg>
          <span class="${textColor} text-sm">${message}</span>
        </div>
      `;

      container.appendChild(toast);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    // ============================================
    // Newsletter Form
    // ============================================
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing!', 'success');
      newsletterForm.reset();
    });

    // ============================================
    // Initialize Summary on Page Load
    // ============================================
    updateSummary();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // ============================================
    // Scroll Animation System
    // ============================================
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          // Get animation type from data attribute or determine by element
          let animationType = target.dataset.animate || 'up';
          
          // Determine animation based on position for card grids
          if (target.classList.contains('card-hover')) {
            const parent = target.parentElement;
            const index = Array.from(parent.children).indexOf(target);
            const totalItems = parent.children.length;
            
            // Alternate left/right/center animations for visual variety
            if (totalItems === 3 && index === 0) {
              animationType = 'left';
            } else if (totalItems === 3 && index === 2) {
              animationType = 'right';
            } else if (index % 2 === 0) {
              animationType = 'left';
            } else {
              animationType = 'right';
            }
          }
          
          // Apply animation class with stagger
          const parent = target.parentElement;
          if (parent && parent.children.length > 1) {
            const index = Array.from(parent.children).indexOf(target);
            target.style.animationDelay = (index * 0.12) + 's';
          }
          
          // Add appropriate animation class
          if (animationType === 'left') {
            target.classList.add('scroll-animate-left');
          } else if (animationType === 'right') {
            target.classList.add('scroll-animate-right');
          } else if (animationType === 'scale') {
            target.classList.add('scroll-animate-scale');
          } else {
            target.classList.add('scroll-animate');
          }
          
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Animate section headings
    document.querySelectorAll('h2').forEach(heading => {
      heading.classList.add('scroll-animate');
      observer.observe(heading);
    });

    // Animate room cards with alternating directions
    document.querySelectorAll('#rooms .card-hover').forEach(card => {
      observer.observe(card);
    });

    // Animate amenity cards with alternating directions
    document.querySelectorAll('#amenities .card-hover').forEach(card => {
      observer.observe(card);
    });

    // Animate amenity icons with scale
    document.querySelectorAll('.icon-wrapper').forEach(icon => {
      icon.classList.add('scroll-animate-scale');
      observer.observe(icon);
    });

    // Animate booking form sections
    const bookingSection = document.getElementById('booking-form');
    if (bookingSection) {
      const formGroups = bookingSection.querySelectorAll('div > div:first-child, .grid');
      formGroups.forEach((group, index) => {
        group.classList.add('scroll-animate');
        group.style.animationDelay = (index * 0.1) + 's';
        observer.observe(group);
      });
    }

    // Animate footer columns
    document.querySelectorAll('footer .grid > div').forEach((column, index) => {
      column.classList.add('scroll-animate');
      column.style.animationDelay = (index * 0.15) + 's';
      observer.observe(column);
    });

    // Animate decorative elements
    document.querySelectorAll('.w-24.h-1').forEach(divider => {
      divider.classList.add('scroll-animate-scale');
      observer.observe(divider);
    });



    