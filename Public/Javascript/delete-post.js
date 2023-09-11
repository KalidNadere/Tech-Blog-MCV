async function deletePostHandler(event) {
  event.preventDefault();

  // data-id attribute
  const postId = event.target.getAttribute('data-id');

  if (postId) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Reload the page or update the UI as needed
      document.location.reload();
    } else {
      alert('Failed to delete the post');
    }
  }
}

document.querySelector('.delete-post-btn').addEventListener('click', deletePostHandler);
