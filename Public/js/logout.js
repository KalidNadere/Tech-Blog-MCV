// Function to handle logout when the logout link is clicked
async function logout() {
  // Send a POST request to '/api/logout' route to log user out
  const response = await fetch('/api//users/logout', {
    method: 'POST', // Use the POST method for logging out
    headers: { 'Content-Type': 'application/json' }, // Set request headers
  });

  if (response.ok) {
    // If the response status is OK, redirect to the homepage or another page
    document.location.replace('/');
  } else {
    // If response status is not OK, show an alert indicating logout failure
    alert('Logout failed. Please try again.');
  }
}

// Event listener to the logout link to call the logoutHandler function when the link is clicked
document.querySelector('#logout').addEventListener('click', logout);
