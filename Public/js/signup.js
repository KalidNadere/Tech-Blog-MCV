// Function to handle user registration when the signup form is submitted
async function signupForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Getting username and password values entered by the user
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Checking if both username and password are provided
  if (username && password) { 
    // Sending POST request to the '/api/register' route with the username and password data
    const response = await fetch('/api/register', {
      method: 'POST', // Using POST method for registration
      body: JSON.stringify({ username, password }), // Converting data to JSON format
      headers: { 'Content-Type': 'application/json' }, // Setting request headers
    });

    if (response.ok) { // If response status is OK (200), registration is successful
      document.location.replace('/dashboard'); // Redirect to dashboard
    } else {
      // If response status is not OK, show alert indicating registration failure
      alert('Registration failed. Please try again.');
    }
  }
}

// Event listener to the signup form to call the signupFormHandler function when the form is submitted
document.querySelector('.signup-form').addEventListener('submit', signupForm);
