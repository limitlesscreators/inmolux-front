import '../scss/main.scss';

import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

Alpine.plugin(collapse);

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', () => {
    const formatCounterValue = (value) => String(value).padStart(2, '0');

    const createSwiper = ({ slider, prevEl, nextEl, counterEl, options = {} }) => {
        if (!slider || slider.dataset.swiperInitialized === 'true') {
            return null;
        }

        const totalSlides = slider.querySelectorAll('.swiper-slide').length;
        const updateCounter = (swiper) => {
            if (!counterEl) {
                return;
            }

            const current = formatCounterValue(swiper.realIndex + 1);
            const total = formatCounterValue(totalSlides);
            counterEl.textContent = `${current}/${total}`;
        };

        const swiper = new Swiper(slider, {
            modules: [Navigation],
            loop: false,
            watchOverflow: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl,
                prevEl,
            },
            on: {
                init() {
                    updateCounter(this);
                },
                slideChange() {
                    updateCounter(this);
                }
            },
            ...options,
        });

        slider.dataset.swiperInitialized = 'true';
        window.requestAnimationFrame(() => swiper.update());

        return swiper;
    };

    const initCardSliders = () => {
        document.querySelectorAll('.property-card-slider').forEach((slider) => {
            createSwiper({
                slider,
                prevEl: slider.parentElement.querySelector('.swiper-button-prev'),
                nextEl: slider.parentElement.querySelector('.swiper-button-next'),
                counterEl: slider.parentElement.querySelector('.swiper-counter'),
                options: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            });
        });
    };

    const initAboutSliders = () => {
        createSwiper({
            slider: document.querySelector('.about-team-slider'),
            prevEl: document.querySelector('.about-team-prev'),
            nextEl: document.querySelector('.about-team-next'),
            counterEl: document.querySelector('.about-team-counter'),
            options: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        });

        createSwiper({
            slider: document.querySelector('.about-reviews-slider'),
            prevEl: document.querySelector('.about-reviews-prev'),
            nextEl: document.querySelector('.about-reviews-next'),
            counterEl: document.querySelector('.about-reviews-counter'),
            options: {
                slidesPerView: 1,
                spaceBetween: 0,
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    1200: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    1920: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                },
            },
        });
    };

    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            initCardSliders();
            initAboutSliders();
        });
    });
});
