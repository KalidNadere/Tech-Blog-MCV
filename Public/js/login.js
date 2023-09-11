// Function to handle login form submission
async function loginFormHandler(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the username and password values from the form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) { // Check if both username and password are provided
    // Send POST request to the '/api/login' route with user credentials
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }), // Convert to JSON format
      headers: { 'Content-Type': 'application/json' }, // Set request headers
    });

    if (response.ok) {
      // If response status is OK (200), redirect to dashboard or another page
      document.location.replace('/dashboard'); // Redirect to dashboard or another page after successful login
    } else {
      // If response status is not OK, show an alert indicating login failure
      alert('Login failed. Please check your credentials.');
    }
  }
}

// Event listener to the login form to call the loginFormHandler function on form submission
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
