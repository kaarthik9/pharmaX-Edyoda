// If visited from LogOut button
if (localStorage.getItem('pharmxLoggedIn')) {
  localStorage.setItem('pharmxLoggedIn', false);
}

// Get alert and login form
const alert = document.getElementById('login-alert');
const loginForm = document.getElementById('login-form');
// Login API endpoint
const loginAPI = 'https://604f0794c20143001744c33d.mockapi.io/login'

loginForm.addEventListener('submit', function(e) {

  // Prevent submission 
  e.preventDefault();

  // Get username and password
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  // Display alert if the credentials are not valid
  if (username !== password || (username === '' || password === '')) {
    alert.style.display = 'block';
    setTimeout(function() {
      alert.style.display = 'none'
    }, 1500)
    return
  }

  // Send AJAX POST request of Login
  let xhr = new XMLHttpRequest();
  xhr.open('POST', loginAPI, true);

  xhr.onreadystatechange = function() {
    
    if (this.readyState === 4 && this.status === 201) {

      // Login successfull alert
      alert.style.display = 'block';
      alert.textContent = 'Login successful!! Redirecting...'
      alert.style.backgroundColor = 'green';
      setTimeout(function() {
      alert.style.display = 'none'

      // Set localStorage data for login
      localStorage.setItem("pharmxLoggedIn", true);
      // Open orders page
      window.location.href = 'orders.html';
      }, 2000)
      
    }
  }
  xhr.send(JSON.stringify({
    name: username,
    password: password
  }));
})