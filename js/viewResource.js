document.addEventListener('DOMContentLoaded', function () {
    // Handle search button click
    document.getElementById('apply-search').addEventListener('click', function () {
        const searchTerm = document.getElementById('skills-search').value.trim();
        if (searchTerm) {
            fetchResources(searchTerm);
        } else {
            displayMessage('Please enter a search term.');
        }
    });

    // Handle Enter key press for search
    document.getElementById('skills-search').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const searchTerm = document.getElementById('skills-search').value.trim();
            if (searchTerm) {
                fetchResources(searchTerm);
            } else {
                displayMessage('Please enter a search term.');
            }
        }
    });
});

// Function to fetch resources from the backend API based on the search term
function fetchResources(searchTerm) {
    const url = `http://localhost:8080/resources/by-skills?skills=${searchTerm}`;

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
