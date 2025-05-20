

//FETCHING AND RENDERING THE PROFILE SECTION FROM THE PROFILE.JSON
fetch('./data/profile.json')
    .then(response => response.json())
    .then(data => {
        const profile = data.profile;
        // console.log(profile)
        // Function to create profile
        function renderProfile() {
            const profileContainer = document.getElementById('profiles');

            //create <div> elements
            const listItem = document.createElement('div');
            listItem.className = 'profile'
            listItem.innerHTML = `
                        <div class="logo">
                        <img src="${profile.logoUrl}" alt="${profile.profilePictureUrl}">
                        </div>
                        <div class="social-icons">
                            <a href="${profile.linkedIn}"><i class='bx bxl-linkedin' ></i></a>
                            <a href="${profile.github}"><i class='bx bxl-github' ></i></a>
                            <a href="${profile.Twitter}"><i class='bx bxl-twitter'></i></a>
                            <a href="${profile.discord}"><i class='bx bxl-discord'></i></a>
                        </div>
                `;
            profileContainer.appendChild(listItem);
        }

        // Call the function to render the details when the page loads
        renderProfile();
    })
    .catch(error => console.error('Error loading JSON:', error));


//FETCHING AND RENDERING THE NAVIGATION PANEL { SIDEBAR } FROM STRUCTURE.JSON
fetch('../data/structure.json')
    .then(response => response.json())
    .then(data => {
        const sections = data.sections;
        // console.log(sections)
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

//FETCHING AND RENDERING THE TESTIMONIALS SECTION FROM THE COVER.JSON
fetch('./data/sections/cover.json')
    .then(response => response.json())
    .then(data => {
        const testimonials = data.articles[2].items;
        console.log(testimonials)
        // Function to create testimonials
        function renderTestimonials() {
            const testimonialsContainer = document.getElementById('testimonials');

            // Loop through the testimonials array and create <div> elements
            testimonials.forEach(testimonial => {
                const listItem = document.createElement('div');
                listItem.className = 'quote-box'
                listItem.innerHTML = 
                `<div class="quote-mark"><i class="fa fa-quote-left" aria-hidden="true"></i></div>
                            <div class="verse">${testimonial.locales.en.text}
                            </div>
                            <div class="reference">
                                <div class="ref-img" href="${testimonial.links.href}">
                                   <img src="${testimonial.icon.img}" alt="${testimonial.value}">
                                </div>
                                <div class="ref-name">
                                    <h4>${testimonial.value}</</h4>
                                    <p>${testimonial.locales.en.info}</p>
                                </div>
                            </div>`;
                testimonialsContainer.appendChild(listItem);
            });
        }

        // Call the function to render the testimonials when the page loads
        renderTestimonials();
    })
    .catch(error => console.error('Error loading JSON:', error));

//FETCHING AND RENDERING THE SKILLS CARDS FROM SKILLS.JSON
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
        const cardWidth = 320 + 32;
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