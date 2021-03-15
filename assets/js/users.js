// If not logged in, redirect to login page
if (!(localStorage.getItem('pharmxLoggedIn') === 'true')) {
  window.location.href = 'login.html'
}

// Users API endpoint
const usersAPI = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users'

// Get the table, Form, Reset button and Alert
const usersTable = document.getElementById('users-table')
const resetBtn = document.getElementById('user-reset-btn')
const UserSearchForm = document.getElementById('user-search-form')
const userAlert = document.getElementById('user-alert')

// Gets data and update DOM
function getUsersData(URL) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', URL, true);

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Clear existing Table data
      clearUserTable();
      // Parse the response data
      const users = JSON.parse(this.response)
      // User count
      let userCount = 0;

      // Iterate over valuse of all user objects
      Object.values(users).forEach(user => {

        // Create table row
        const tableRow = document.createElement('tr')

        // Create relevent cells and populate them
        // with relevent data
        const IDCell = document.createElement('td')
        IDCell.className = 'text-secondary';
        IDCell.textContent = user.id; 

        const avatar = document.createElement('img')
        avatar.src = user.profilePic
        const avatarCell = document.createElement('td')
        avatarCell.append(avatar)

        const nameCell = document.createElement('td')
        nameCell.className = 'text-secondary'
        nameCell.textContent = user.fullName

        const dobCell = document.createElement('td')
        dobCell.textContent = user.dob

        const genderCell = document.createElement('td')
        genderCell.className = 'text-secondary'
        genderCell.textContent = user.gender

        const locationCell = document.createElement('td')
        locationCell.className = 'text-secondary'
        locationCell.textContent = user.currentCity + ', ' + user.currentCountry


        // Append all tabel cells to the Table row
        tableRow.append(IDCell, avatarCell, nameCell, dobCell, genderCell, locationCell)
        // Animation to display
        tableRow.style.animation = 'moveInBottom .1s ease-out backwards '+(userCount/10)+'s';
        // Append to orders table on the DOM
        usersTable.append(tableRow)
        // Increment user count for animation delay calculation
        userCount++;
      })
    }
  }
  xhr.send();
}
// Populate the table initially
getUsersData(usersAPI);

// Clears the users table except for heading
function clearUserTable() {
  while(usersTable.children[1]) {
    usersTable.removeChild(usersTable.children[1]);
  }
}

// Searches for users by name
UserSearchForm.addEventListener("submit", function(e) {
  // Stop form submitting
  e.preventDefault();

  // Get search input value
  const searchInput = document.getElementById('user-search-input').value

  // Alert for 1.5s if input is less than 2 characters
  if(searchInput.length < 2) {
    userAlert.style.display = 'block'
    setTimeout(function() {
      userAlert.style.display = 'none'
    }, 1500)
    return;
  }

  // fetch the searched users and display
  getUsersData(usersAPI + '?fullName=' + searchInput);
})

// Reset the search input and table
resetBtn.addEventListener('click', function() {
  const input = document.getElementById('user-search-input')
  
  if(input.value) {
    // Remove search query
    input.value = ''
    // Reset the table
    getUsersData(usersAPI)
  }
})
