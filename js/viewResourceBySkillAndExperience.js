
document.addEventListener('DOMContentLoaded', function () {
    // Handle search button click
    document.getElementById('apply-search').addEventListener('click', function () {
        const skillsSearchTerm = document.getElementById('skills-search').value.trim();
        const experienceSearchTerm = document.getElementById('experience-search').value.trim();

        if (skillsSearchTerm && experienceSearchTerm) {
            fetchResources(skillsSearchTerm, experienceSearchTerm);
        } else {
            displayMessage('Please enter both skills and experience limit.');
        }
    });

    // Handle Enter key press for search
    document.getElementById('skills-search').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const skillsSearchTerm = document.getElementById('skills-search').value.trim();
            const experienceSearchTerm = document.getElementById('experience-search').value.trim();

            if (skillsSearchTerm && experienceSearchTerm) {
                fetchResources(skillsSearchTerm, experienceSearchTerm);
            } else {
                displayMessage('Please enter both skills and experience limit.');
            }
        }
    });

    document.getElementById('experience-search').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const skillsSearchTerm = document.getElementById('skills-search').value.trim();
            const experienceSearchTerm = document.getElementById('experience-search').value.trim();

            if (skillsSearchTerm && experienceSearchTerm) {
                fetchResources(skillsSearchTerm, experienceSearchTerm);
            } else {
                displayMessage('Please enter both skills and experience limit.');
            }
        }
    });
});

// Function to fetch resources from the backend API based on the skill and experience
function fetchResources(skillsSearchTerm, experienceSearchTerm) {
    const url = `http://localhost:8080/resources/by-skills-and-experience?skills=${skillsSearchTerm}&experienceLimit=${experienceSearchTerm}`;

    // Show loading message
    document.getElementById('responseMessage').textContent = 'Loading resources...';

    // Make API request
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.statusCode === 302) {
                displayResources(data.data);
            } else {
                displayMessage('No resources found for the selected filter.');
            }
        })
        .catch(error => {
            displayMessage(`Error: ${error.message}`);
        });
}

// Function to display the resources in the table
function displayResources(resources) {
    const tableBody = document.getElementById('resources-body');
    tableBody.innerHTML = ''; // Clear any existing rows

    // Check if no resources are found
    if (resources.length === 0) {
        displayMessage('No resources found for the selected filter.');
        return;
    }

    // Populate the table with resource names
    resources.forEach(resource => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${resource.resourceName}</td>`;
        tableBody.appendChild(row);
    });

    // Show success message and make table visible
    document.getElementById('responseMessage').textContent = 'Resources found successfully!';
    document.getElementById('resources-table').style.display = 'table'; // Make table visible
}

// Function to display a message when no resources are found or in case of an error
function displayMessage(message) {
    document.getElementById('responseMessage').textContent = message;
    document.getElementById('resources-table').style.display = 'none'; // Hide table if no results
}
