// elements from the HTML form
const titleInput = document.querySelector('input[name="post-title"]');
const contentInput = document.querySelector('textarea[name="post-content"]');
const newPostForm = document.querySelector('.new-post-form');

// Function to handle new post submission
async function newFormHandler(event) {
    event.preventDefault();

    // values from form inputs
    const title = titleInput.value;
    const postContent = contentInput.value;

    // Send a POST request to the server to create a new post
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content: postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to the dashboard
    } else {
        alert('Failed to create a new post.');
    }
}

// Event listener for the form submission
newPostForm.addEventListener('submit', newFormHandler);
