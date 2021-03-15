// If not logged in, redirect to login page
if (!(localStorage.getItem('pharmxLoggedIn') === 'true')) {
  window.location.href = 'login.html'
}

// Order API endpoint
const orderAPI = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders'

// Get the table and count and filter
const ordersTable = document.getElementById('orders-table')
const ordersCount = document.getElementById('orders-count')
const ordersFilter = document.getElementById('orders-filter')

// Initialize a filter Object
const filterObj = {
  New: true,
  Packed: true,
  InTransit: true,
  Delivered: true,
}

// Get the data from API and insert into DOM
function getData() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', orderAPI, true);

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Clear the table data
      clearOrderTable();

      // Get all orders
      const orders = JSON.parse(this.response);
      let orderCount = 0;

      // Iterate over values of all orders
      Object.values(orders).forEach(order => {
        // Proceed only if order status is true
        // in filter
        if (filterObj[order.orderStatus]) {

          // Create table row
          const tableRow = document.createElement('tr')

          // Create relevent cells and populate them
          // with relevent data

          const IDCell = document.createElement('td')
          IDCell.className = 'text-secondary';
          IDCell.textContent = order.id;

          const customerCell = document.createElement('td')
          customerCell.textContent = order.customerName;

          // Append date and time into date cells
          const dateCell = document.createElement('td')

          const date = document.createElement('p')
          date.textContent = order.orderDate;

          const time = document.createElement('p')
          time.className = 'text-secondary'
          time.textContent = order.orderTime;
          dateCell.append(date, time)

          const amountCell = document.createElement('td')
          amountCell.className = 'text-secondary'
          amountCell.textContent = order.amount;

          const statusCell = document.createElement('td')
          statusCell.textContent = order.orderStatus;


          // Append all cells into the  row
          tableRow.append(IDCell, customerCell, dateCell, amountCell, statusCell)
          // Animation to display
          tableRow.style.animation = 'moveInBottom .1s ease-out backwards '+(orderCount/10)+'s';
          // Append to orders table on the DOM
          ordersTable.append(tableRow)
          // Increment order count
          orderCount++;
        }
      })

      // Add count to DOM
      ordersCount.textContent = orderCount;
    }
  }

  xhr.send();
}
// Populate the table initially
getData();

// Clears the table
function clearOrderTable() {     
  while(ordersTable.children[1]) { 
    ordersTable.removeChild(ordersTable.children[1]); 
  } 
} 

// Listen for click on checkboxs
ordersFilter.addEventListener('click', function(e) {
  if (e.target.tagName === 'INPUT') {
    // Change the filter status is checkbox is clicked
    filterObj[e.target.name] = e.target.checked;
    // Reload the table
    getData();
  }
})
