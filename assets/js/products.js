// If not logged in, redirect to login page
if (!(localStorage.getItem('pharmxLoggedIn') === 'true')) {
  window.location.href = 'login.html'
}

// product API endpoint
const productAPI = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products'

// Get the table and count and filter
const productsTable = document.getElementById('products-table')
const productsCount = document.getElementById('products-count')
const productsFilter = document.getElementById('products-filter')

// Initialize a filter Object
const filterObj = {
  expiryDate: true,
  stock: true,
}

// Get the data from API and insert into DOM
function getData() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', productAPI, true);

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Clear the table data
      clearProductTable();

      // Get all products
      const products = JSON.parse(this.response);
      let productCount = 0;

      // Iterate over values of all products
      Object.values(products).forEach(product => {
        // Proceed only if product status is true
        // in filter
        if (shouldBeMounted(product.expiryDate, product.stock)) {

          // Create table row
          const tableRow = document.createElement('tr')

          // Create relevent cells and populate them
          // with relevent data
          const IDCell = document.createElement('td')
          IDCell.className = 'text-secondary';
          IDCell.textContent = product.id;

          const productCell = document.createElement('td')
          productCell.textContent = product.medicineName;

          const brandCell = document.createElement('td')
          brandCell.className = 'text-secondary'
          brandCell.textContent = product.medicineBrand;

          const dateCell = document.createElement('td')
          dateCell.textContent = product.expiryDate

          const priceCell = document.createElement('td')
          priceCell.className = 'text-secondary'
          priceCell.textContent = product.unitPrice;

          const stockCell = document.createElement('td')
          stockCell.className = 'text-secondary'
          stockCell.textContent = product.stock;


          // Append all cells into the  row
          tableRow.append(IDCell, productCell, brandCell, dateCell, priceCell, stockCell);
          // Animation to display
          tableRow.style.animation = 'moveInBottom .1s ease-out backwards '+(productCount/10)+'s';
          // Append to products table on the DOM
          productsTable.append(tableRow)
          // Increment product count
          productCount++;
        }
      })
      // Add count to DOM
      productsCount.textContent = productCount;
    }
  }
  xhr.send();
}
// Populate the table initially
getData();

// Clears the table
function clearProductTable() {     
  while(productsTable.children[1]) { 
      productsTable.removeChild(productsTable.children[1]); 
  } 
} 

// Listen for click on checkboxs
productsFilter.addEventListener('click', function(e) {
  if (e.target.tagName === 'INPUT') {
    // Change the filter status is checkbox is clicked
    filterObj[e.target.name] = e.target.checked;
    // Reload the table
    getData();
  }
})

// Checks for filter status of item
function shouldBeMounted(date, stock) {
  // If expiryDate is unchecked
  if (!filterObj.expiryDate) {
    const productDate = new Date(date)
    const presentDate = new Date()
    if (productDate < presentDate) {
      return false
    }
  }
  // If low stock is unchecked
  if (!filterObj.stock) {
    if (stock < 100) {
      return false
    }
  }
  // Else return true
  return true;
}