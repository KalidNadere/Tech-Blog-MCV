// Get elements from the HTML form
const createPostForm = document.querySelector('.create-post-form');

// Function to handle new post submission
async function createPostFormHandler(event) {
    event.preventDefault();

    // Get values from the create post form
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const postContent = document.querySelector('textarea[name="post-content"]').value.trim();

    // Send a POST request to the server to create a new post
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to the dashboard after successful post creation
    } else {
        alert('Failed to create a new post.');
    }
}

// Event listener for the create post form submission
createPostForm.addEventListener('submit', createPostFormHandler);
