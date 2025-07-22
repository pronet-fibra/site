// Global Variables
const globoplayStandardPrice = 22.90;
const globoplayPremiumPrice = 39.90;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initScrollAnimations();
    initHeaderEffects();
    initServiceTabs();
    initMap();
    initPlanPriceCalculation();
    initRecommendationModal();
    initComparisonChart();
    initContactButtons();
    initSmoothScrolling();
    initFloatingWhatsApp();
    initParallaxEffects();
    initPageLoadAnimation();  
});

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Header Scroll Effects
function initHeaderEffects() {
    const mainHeader = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            mainHeader.style.transform = 'translateY(-100%)';
        } else {
            mainHeader.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Service Tabs Functionality
function initServiceTabs() {
    const services = {
        internet: {
            title: 'Internet Fibra Ótica de Ponta',
            description: 'Utilizamos a tecnologia **FTTH (Fiber to the Home)**, que leva a fibra ótica diretamente até a sua casa. Isso garante a máxima velocidade, estabilidade e a menor latência do mercado. Ideal para streaming em 4K, jogos online competitivos e home office sem interrupções.',
            icon: '<i class="fa-solid fa-wifi text-4xl text-pronet-accent"></i>',
            stats: ['⚡ Velocidade até 1 Gbps', '📡 Latência ultra-baixa', '🔒 Conexão segura e estável']
        },
        tv: {
            title: 'TV Digital e Streaming',
            description: 'Oferecemos uma solução completa de entretenimento com nossa plataforma de **IPTV (Televisão por Protocolo de Internet)**. Tenha acesso a uma vasta grade de canais em HD e 4K, além da facilidade de integrar seus serviços de streaming favoritos como GloboPlay, Netflix e outros, tudo em um só lugar.',
            icon: '<i class="fa-solid fa-tv text-4xl text-pronet-accent"></i>',
            stats: ['📺 Canais em HD e 4K', '🎬 Streaming integrado', '📱 Acesso multi-dispositivo']
        },
        telefonia: {
            title: 'Telefonia Digital (VoIP)',
            description: 'Com a tecnologia **VoIP (Voz sobre IP)**, suas ligações são feitas através da internet com qualidade de som superior e custos reduzidos. Oferecemos planos com ligações ilimitadas para fixo e móvel, garantindo que você se mantenha conectado com quem importa.',
            icon: '<i class="fa-solid fa-phone-volume text-4xl text-pronet-accent"></i>',
            stats: ['☎️ Ligações ilimitadas', '🔊 Qualidade HD', '💰 Economia de até 70%']
        }
    };

    const serviceDescriptionContainer = document.getElementById('service-description');
    const serviceButtons = document.querySelectorAll('.service-icon');

    function updateServiceDescription(serviceKey) {
        const service = services[serviceKey];
        serviceDescriptionContainer.innerHTML = `
            <div class="flex items-center mb-6 fade-in-left">
                <span class="mr-4">${service.icon}</span> 
                <h4 class="text-3xl font-bold text-pronet-darkblue gradient-text">${service.title}</h4>
            </div>
            <p class="text-pronet-text-light text-lg mb-6 fade-in-up">${service.description}</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in-up">
                ${service.stats.map(stat => `
                    <div class="bg-white/50 p-4 rounded-lg text-center">
                        <span class="text-sm font-semibold text-pronet-darkblue">${stat}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Reset all buttons
        serviceButtons.forEach(button => button.classList.remove('active'));
        // Activate current button
        document.getElementById(`btn-${serviceKey}`).classList.add('active');
    }

    serviceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const serviceKey = event.currentTarget.id.split('-')[1];
            updateServiceDescription(serviceKey);
        });
    });

    // Initialize with 'internet' description
    updateServiceDescription('internet');
}

// Enhanced Interactive Map
function initMap() {
    const mapCenter = [-3.35, -39.2];
    const map = L.map('map').setView(mapCenter, 9);

    // DEPOIS (tema claro padrão)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const pronetIcon = L.divIcon({
        html: '<div class="pronet-map-icon">P</div>',
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    const coveragePoints = [
        { lat: -3.275, lng: -39.268, name: 'Trairi (Sede)', description: 'Centro da cidade com cobertura total' },
        { lat: -3.28, lng: -39.35, name: 'Carnaúba Torta (Trairi)', description: 'Distrito rural com fibra ótica' },
        { lat: -3.24, lng: -39.22, name: 'Novo Oriente (Trairi)', description: 'Área residencial moderna' },
        { lat: -3.434, lng: -39.145, name: 'Paraipaba (Sede)', description: 'Centro urbano com alta velocidade' },
        { lat: -3.42, lng: -39.145, name: 'Messejana (Paraipaba)', description: 'Zona comercial conectada' },
        { lat: -3.450, lng: -39.050, name: 'Calumbi 1 (Paraipaba)', description: 'Bairro residencial' },
        { lat: -3.455, lng: -39.055, name: 'Calumbi 2 (Paraipaba)', description: 'Expansão urbana' },
        { lat: -3.400, lng: -39.100, name: 'Boa Vista (Paraipaba)', description: 'Área rural conectada' },
        { lat: -3.380, lng: -39.080, name: 'Jatobá (Paraipaba)', description: 'Distrito com internet de alta velocidade' }
    ];

    coveragePoints.forEach(point => {
        L.marker([point.lat, point.lng], { icon: pronetIcon }).addTo(map)
            .bindPopup(`
                <div class="text-center p-2">
                    <h6 class="font-bold text-pronet-darkblue">${point.name}</h6>
                    <p class="text-sm text-gray-600">${point.description}</p>
                    <span class="inline-block bg-pronet-accent text-pronet-darkblue px-2 py-1 rounded-full text-xs font-semibold mt-2">
                        ✓ Cobertura Ativa
                    </span>
                </div>
            `);
    });
}

// Enhanced Plan Price Calculation
function initPlanPriceCalculation() {
    document.querySelectorAll('.globoplay-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const planId = this.dataset.planId;
            const streamingType = this.dataset.streamingType;
            const planCard = document.querySelector(`.plan-card[data-plan-speed="${planId} Mega"]`);
            let basePrice = parseFloat(planCard.dataset.basePrice);
            let currentPriceElement = document.getElementById(`price-${planId}`);
            let currentTotal = basePrice;

            // Ensure only one checkbox is selected per plan
            document.querySelectorAll(`.globoplay-checkbox[data-plan-id="${planId}"]`).forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });

            // Calculate total with streaming
            document.querySelectorAll(`.globoplay-checkbox[data-plan-id="${planId}"]:checked`).forEach(checkedBox => {
                if (checkedBox.dataset.streamingType === 'standard') {
                    currentTotal += globoplayStandardPrice;
                } else if (checkedBox.dataset.streamingType === 'premium') {
                    currentTotal += globoplayPremiumPrice;
                }
            });

            // Animate price change
            currentPriceElement.style.transform = 'scale(1.1)';
            currentPriceElement.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                currentPriceElement.textContent = `R${currentTotal.toFixed(2).replace('.', ',')}`;
                currentPriceElement.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Enhanced Recommendation Modal
function initRecommendationModal() {
    const recommenderModal = document.getElementById('recommender-modal');
    const openRecommenderModalBtn = document.getElementById('open-recommender-modal-btn');
    const closeRecommenderModalBtn = document.getElementById('close-recommender-modal');
    const generateRecommendationBtn = document.getElementById('generate-recommendation');
    const loadingSpinner = document.getElementById('loading-spinner');
    const recommendationResult = document.getElementById('recommendation-result');
    const recommendedPlanName = document.getElementById('recommended-plan-name');
    const recommendedPlanPrice = document.getElementById('recommended-plan-price');
    const recommendedJustification = document.getElementById('recommended-justification');
    const recommendationContactBtn = document.getElementById('recommendation-contact-btn');
    const navRecommendationLink = document.getElementById('open-recommender-modal');

    function openModal() {
        recommenderModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // Reset form
        document.getElementById('num-people').value = 1;
        document.getElementById('main-use').value = 'streaming';
        document.getElementById('streaming-interest').value = 'no';
        recommendationResult.classList.add('hidden');
        recommendationContactBtn.classList.add('hidden');
    }

    function closeModal() {
        recommenderModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    openRecommenderModalBtn.addEventListener('click', openModal);
    navRecommendationLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    closeRecommenderModalBtn.addEventListener('click', closeModal);
    recommenderModal.addEventListener('click', (e) => {
        if (e.target === recommenderModal) {
            closeModal();
        }
    });

    generateRecommendationBtn.addEventListener('click', () => {
        loadingSpinner.classList.remove('hidden');
        recommendationResult.classList.add('hidden');
        generateRecommendationBtn.disabled = true;

        const numPeople = parseInt(document.getElementById('num-people').value);
        const mainUse = document.getElementById('main-use').value;
        const streamingInterest = document.getElementById('streaming-interest').value;

        // Enhanced recommendation logic
        let recommendedSpeed = 300;
        let basePrice = 79.99;
        let justification = 'O plano de **300 MEGA** é ótimo para navegação básica, redes sociais e streaming ocasional. Perfeito para até 2 pessoas.';
        let planNameText = '300 MEGA';

        if (numPeople >= 3 || mainUse === 'gaming' || mainUse === 'work' || mainUse === 'all') {
            recommendedSpeed = 400;
            basePrice = 99.99;
            justification = 'O plano de **400 MEGA** é perfeito para residências com múltiplos usuários, home office, estudos e jogos online, garantindo fluidez e sem travamentos. Ideal para famílias de 3-4 pessoas.';
            planNameText = '400 MEGA';
        }

        if (numPeople >= 5 || (mainUse === 'gaming' && streamingInterest === 'yes') || (mainUse === 'all' && streamingInterest === 'yes')) {
            recommendedSpeed = 500;
            basePrice = 129.99;
            justification = 'Para heavy users, gamers exigentes e casas com muitos dispositivos conectados e interesse em streaming premium, o plano de **500 MEGA** oferece a melhor experiência sem lag. Perfeito para famílias grandes.';
            planNameText = '500 MEGA';
        }

        let streamingAddon = 0;
        let streamingTextForMessage = '';
        let streamingTextForDisplay = '';

        if (streamingInterest === 'yes') {
            streamingAddon = globoplayPremiumPrice;
            streamingTextForDisplay = ' 🎬 com GloboPlay Premium incluso!';
            streamingTextForMessage = ' com GloboPlay Premium';
        } else if (streamingInterest === 'some') {
            streamingAddon = globoplayStandardPrice;
            streamingTextForDisplay = ' 📺 com GloboPlay incluso.';
            streamingTextForMessage = ' com GloboPlay';
        }

        const finalPrice = basePrice + streamingAddon;
        const formattedPrice = finalPrice.toFixed(2).replace('.', ',');

        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            generateRecommendationBtn.disabled = false;
            
            recommendedPlanName.textContent = `${recommendedSpeed} MEGA`;
            recommendedPlanPrice.textContent = `R${formattedPrice}`;
            recommendedJustification.innerHTML = justification + streamingTextForDisplay;

            const whatsappMessage = encodeURIComponent(`Olá! Vim através do Site e gostaria de saber mais sobre o plano ${planNameText}${streamingTextForMessage}, no valor de R$ ${formattedPrice}.`);
            recommendationContactBtn.href = `https://wa.me/5585989932950?text=${whatsappMessage}`;
            recommendationContactBtn.target = "_blank";

            recommendationResult.classList.remove('hidden');
            recommendationContactBtn.classList.remove('hidden');

            // Add success animation
            recommendationResult.style.animation = 'scale-in 0.6s ease-out forwards';
        }, 2000);
    });
}

// Enhanced Chart.js Comparison Chart
function initComparisonChart() {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    let comparisonChart;

    const chartData = {
        plano300: {
            labels: ['Pronet Fibra Combo', 'Concorrente A', 'Streaming Separado'],
            data: [79.99 + globoplayStandardPrice, 89.90, globoplayStandardPrice],
            backgroundColor: ['#0F4C81', '#FFD700', '#FF6B6B'],
            borderColor: ['#0F4C81', '#FFD700', '#FF6B6B']
        },
        plano400: {
            labels: ['Pronet Fibra Combo', 'Concorrente B', 'Streaming Separado'],
            data: [99.99 + globoplayStandardPrice, 119.90, globoplayStandardPrice],
            backgroundColor: ['#0F4C81', '#FFD700', '#FF6B6B'],
            borderColor: ['#0F4C81', '#FFD700', '#FF6B6B']
        },
        plano500: {
            labels: ['Pronet Fibra Combo', 'Concorrente C', 'Streaming Premium'],
            data: [129.99 + globoplayPremiumPrice, 149.90, globoplayPremiumPrice],
            backgroundColor: ['#0F4C81', '#FFD700', '#FF6B6B'],
            borderColor: ['#0F4C81', '#FFD700', '#FF6B6B']
        }
    };

    function createOrUpdateChart(planKey) {
        const data = chartData[planKey];
        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Preço Mensal (R$)',
                    data: data.data,
                    backgroundColor: data.backgroundColor,
                    borderColor: data.borderColor,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 76, 129, 0.9)',
                        titleColor: '#A7FF00',
                        bodyColor: '#ffffff',
                        borderColor: '#A7FF00',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return 'R$ ' + context.parsed.y.toFixed(2).replace('.', ',');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Preço Mensal (R$)',
                            color: '#0F4C81',
                            font: {
                                weight: 'bold',
                                size: 14
                            }
                        },
                        ticks: {
                            color: '#1e293b',
                            font: {
                                weight: '500'
                            }
                        },
                        grid: {
                            color: 'rgba(15, 76, 129, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#1e293b',
                            font: {
                                weight: '500'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        };

        if (comparisonChart) {
            comparisonChart.data = config.data;
            comparisonChart.update('active');
        } else {
            comparisonChart = new Chart(ctx, config);
        }

        // Update button styles with enhanced animations
        document.querySelectorAll('.plan-btn').forEach(btn => {
            if (btn.dataset.plan === planKey) {
                btn.className = 'plan-btn modern-btn py-3 px-6 transform scale-105';
            } else {
                btn.className = 'plan-btn bg-gray-200 text-pronet-text-light font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-300 hover:scale-105';
            }
        });
    }

    document.querySelectorAll('.plan-btn').forEach(button => {
        button.addEventListener('click', function() {
            createOrUpdateChart(this.dataset.plan);
        });
    });

    // Initialize chart
    createOrUpdateChart('plano300');
}

// Contact Plan Button Enhancement
function initContactButtons() {
    document.querySelectorAll('.contact-plan-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const planCard = this.closest('.plan-card');
            const planSpeed = planCard.dataset.planSpeed;
            const basePrice = parseFloat(planCard.dataset.basePrice);
            
            // Check for streaming addons
            let streamingAddon = 0;
            let streamingText = '';
            const checkedStreamingBoxes = planCard.querySelectorAll('.globoplay-checkbox:checked');
            
            checkedStreamingBoxes.forEach(checkbox => {
                if (checkbox.dataset.streamingType === 'standard') {
                    streamingAddon = globoplayStandardPrice;
                    streamingText = ' com GloboPlay';
                } else if (checkbox.dataset.streamingType === 'premium') {
                    streamingAddon = globoplayPremiumPrice;
                    streamingText = ' com GloboPlay Premium';
                }
            });
            
            const finalPrice = (basePrice + streamingAddon).toFixed(2).replace('.', ',');
            const message = encodeURIComponent(`Olá! Gostaria de contratar o plano ${planSpeed}${streamingText} no valor de R$ ${finalPrice}/mês. Quando posso fazer a instalação?`);
            
            window.open(`https://wa.me/5585989932950?text=${message}`, '_blank');
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add floating action button for WhatsApp
function initFloatingWhatsApp() {
    const floatingWhatsApp = document.createElement('div');
    floatingWhatsApp.className = 'floating-whatsapp';
    floatingWhatsApp.innerHTML = `
        <a href="https://wa.me/5585989932950?text=Olá! Gostaria de mais informações sobre os planos da Pronet Fibra." 
           target="_blank" 
           title="Fale conosco no WhatsApp">
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>
    `;
    document.body.appendChild(floatingWhatsApp);
}

// Add parallax effect to hero section
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add loading animation to page
function initPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced Mobile Menu (Optional)
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    mobileMenuBtn.className = 'md:hidden text-pronet-darkblue hover:text-pronet-accent transition-colors';
    
    // Add to header if needed
    // Implementation would go here for mobile menu toggle
}

// Performance Monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformance();

// Error Handling
window.addEventListener('error', function(e) {
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.show');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
});

// Touch Gestures for Mobile (Optional Enhancement)
function initTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
    
    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could trigger next action
            } else {
                // Swipe right - could trigger previous action
            }
        }
    }
}

// Initialize touch gestures for mobile
if ('ontouchstart' in window) {
    initTouchGestures();
}