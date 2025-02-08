// Get all products
fetch('/products')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Description: ${product.description}</p>
        <img src="${product.imageUrl}" alt="${product.name}">
        <button onclick="addToCart('${product._id}', 1)">Add to Cart</button> <!-- Updated to call addToCart -->
      `;
      productList.appendChild(productCard);
    });
  })
  .catch(error => console.error(error));

// Function to add item to cart
const addToCart = async (productId, quantity) => {
  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Handle form submissions
const form = document.getElementById('product-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const productData = {
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    stock: formData.get('stock')
  };

  try {
    const response = await fetch('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const newProduct = await response.json();
    console.log(newProduct);
  } catch (error) {
    console.error(error);
  }
});

// Search functionality
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('search-input').value;
  const productList = document.getElementById('product-list'); // Added to display results
  productList.innerHTML = ''; // Clear previous results
  try {
    const response = await fetch(`/products/search?q=${query}`);
    const products = await response.json();
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Description: ${product.description}</p>
        <img src="${product.imageUrl}" alt="${product.name}">
      `;
      productList.appendChild(productCard); // Display each product
    }); // Closing bracket for forEach
  } catch (error) {
    console.error(error);
  }
});
