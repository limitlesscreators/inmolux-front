import '../scss/main.scss';

// Alpine.js + plugins
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

// Swiper
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Register Alpine plugins
Alpine.plugin(collapse);

// Setup Alpine on window object
window.Alpine = Alpine;
Alpine.start();

// Initialize Swiper instances when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const initCardSliders = () => {
        const cardSliders = document.querySelectorAll('.property-card-slider');

        cardSliders.forEach(slider => {
            if (slider.dataset.swiperInitialized === 'true') {
                return;
            }

            const counterEl = slider.parentElement.querySelector('.swiper-counter');
            const totalSlides = slider.querySelectorAll('.swiper-slide').length;
            const updateCounter = (swiper) => {
                if (!counterEl) {
                    return;
                }

                const current = String(swiper.realIndex + 1).padStart(2, '0');
                const total = String(totalSlides).padStart(2, '0');
                counterEl.textContent = `${current}/${total}`;
            };

            const swiper = new Swiper(slider, {
                modules: [Navigation],
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                watchOverflow: true,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: slider.parentElement.querySelector('.swiper-button-next'),
                    prevEl: slider.parentElement.querySelector('.swiper-button-prev'),
                },
                on: {
                    init() {
                        updateCounter(this);
                    },
                    slideChange() {
                        updateCounter(this);
                    }
                }
            });

            slider.dataset.swiperInitialized = 'true';
            window.requestAnimationFrame(() => swiper.update());
        });
    };

    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(initCardSliders);
    });
});

console.log('Innolux Theme Initialized');
