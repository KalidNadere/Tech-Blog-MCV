const loginForm = document.getElementById('login-form');
const loginStatusEl = document.getElementById('signin-status');
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      loginStatusEl.textContent = 'Email or Password is incorrect';
      loginStatusEl.style.color = 'red';
      setTimeout(() => {
        loginStatusEl.textContent = 'Fill in required values';
        loginStatusEl.style.color = 'black';
      }, 2500);
    }
  }
}

// Event handler for form submission
loginForm.addEventListener('submit', loginFormHandler);
