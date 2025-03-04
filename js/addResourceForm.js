// index.js

document.getElementById('resource-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Gather the form data
    const resourceName = document.getElementById('resourceName').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());

    // Construct the request body
    const requestBody = {
        resourceName: resourceName,
        experience: parseInt(experience), // Ensure experience is an integer
        skills: skills
    };

    // Make the POST request to the backend API
    fetch('http://localhost:8080/resources', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => {
        if (response.status !== 201) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        // Display a success message
        document.getElementById('responseMessage').textContent = 'Resource request submitted successfully!';
    })
    .catch(error => {
        // Handle errors
        document.getElementById('responseMessage').textContent = `Error: ${error.message}`;
        document.getElementById('responseMessage').style.color = 'red';
    });
});
