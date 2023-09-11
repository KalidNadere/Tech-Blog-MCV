async function editPostHandler(event) {
  event.preventDefault();

  // post title and content
  const postId = document.querySelector('input[name="post-id"]').value;
  const updatedTitle = document.querySelector('input[name="post-title"]').value;
  const updatedContent = document.querySelector('textarea[name="post-content"]').value.trim();

  if (postId && updatedTitle && updatedContent) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: updatedTitle,
        post_content: updatedContent,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Redirect to the post's detail page or update the UI as needed
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to update the post');
    }
  }
}

// form with specific class or ID for editing
document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);
