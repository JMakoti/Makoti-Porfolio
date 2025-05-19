// Function to fetch and render the nav links based on JSON data
// console.log("js working")




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

