// elements from the HTML form and page
const commentForm = document.querySelector('.comment-form');
const commentList = document.querySelector('.comment-list');

// Function to handle comment submission
async function commentFormHandler(event) {
    event.preventDefault();

    // values from the comment form
    const commentText = document.querySelector('textarea[name="comment-text"]').value.trim();
    const postId = commentForm.getAttribute('data-post-id'); // data attribute for the post ID

    // Send a POST request to the server to create a new comment
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            text: commentText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload(); // Refresh the page to display the new comment
    } else {
        alert('Failed to add a comment.');
    }
}

// Event listener for the comment form submission
commentForm.addEventListener('submit', commentFormHandler);