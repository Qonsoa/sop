document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.navbar, .main, .counter-container, #course-section, .channels, #social-icon, #games-projects, footer');
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);

                if (entry.target.id === 'games-projects') {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    const counters = document.querySelectorAll('.counter');
    const counterItems = document.querySelectorAll('.counter-item');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counterItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 300);
                });

                counters.forEach(counter => {
                    startCounter(counter);
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const counterContainer = document.querySelector('.counter-container');
    counterObserver.observe(counterContainer);

    function startCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const speed = +counter.getAttribute('data-speed');
        const start = +counter.getAttribute('data-start') || 0;
        let current = start;

        const increment = Math.ceil((target - start) / 100);

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;

                counter.innerText = current;
                setTimeout(updateCounter, speed);
            } else {
                counter.innerText = target;
                if (counter.nextSibling && counter.nextSibling.nodeValue.trim() === 'M') {
                    counter.innerText += 'M';
                }

                const counterItem = counter.closest('.counter-item');
                if (counterItem) {
                    setTimeout(() => {
                        counterItem.classList.add('show-text');
                    }, 700);
                }
            }
        };
        

        updateCounter();
    }
});

    