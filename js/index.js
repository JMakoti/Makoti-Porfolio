
//mapping the navigation panel {sidebar}
fetch('../data/structure.json')
    .then(response => response.json()) // Fetch the JSON data
    .then(data => {
        const sections = data.sections; // Get the sections array from the JSON
        console.log(sections)
        // Function to create navigation links
        function renderNavLinks() {
            const navLinksContainer = document.getElementById('navLinks');

            // Loop through the sections array and create <li> elements
            sections.forEach(section => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <a href="#${section.id}">
                        <i class="${section.faIcon}"></i> ${capitalizeFirstLetter(section.id)}
                    </a>
                `;
                navLinksContainer.appendChild(listItem);
            });
        }

        // Function to capitalize the first letter of the section name
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Call the function to render the nav links when the page loads
        renderNavLinks();
    })
    .catch(error => console.error('Error loading JSON:', error));


// Fetch and render service cards from skills.json
fetch('./data/sections/skills.json')
    .then(response => response.json())
    .then(data => {
        // Get the first article's items (capabilities)
        const items = data.articles[0].items;
        const serviceCardsContainer = document.getElementById('skills');
        serviceCardsContainer.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'e-card playing';
            card.innerHTML = `
                <div class="image"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="infotop">
                    <div class="icons">
                        <i class="${item.icon.fa}" aria-hidden="true"></i>
                    </div>
                    <h4>${item.locales.en.title.replace(/\*\*/g, '')}</h4>
                    <p>${item.locales.en.text}</p>
                </div>
            `;
            serviceCardsContainer.appendChild(card);
        });

        // --- Automated continuous slider ---
        const slider = serviceCardsContainer;
        const cardWidth = 320 + 32; // card width + gap (2rem ≈ 32px)
        let autoScroll;

        // Clone all cards for seamless looping
        const cards = Array.from(slider.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            slider.appendChild(clone);
        });

        function scrollRight() {
            if (slider.scrollLeft >= cardWidth * cards.length) {
                slider.scrollLeft = 0;
            } else {
                slider.scrollLeft += 2;
            }
        }

        function startAutoScroll() {
            autoScroll = setInterval(scrollRight, 10);
        }
        function stopAutoScroll() {
            clearInterval(autoScroll);
        }

        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    })
    .catch(error => console.error('Error loading skills.json:', error));