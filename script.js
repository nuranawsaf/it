// Mock API data
const itemsData = [
  {
    id: 1,
    name: "Cheese Burger",
    category: "burger",
    image: "/images/burger.jpg",
  },
  {
    id: 2,
    name: "Saussage Pizza",
    category: "pizza",
    image: "/images/pizza.jpg",
  },
  {
    id: 3,
    name: "Chicken Burger",
    category: "burger",
    image: "/images/burger.jpg",
  },
  {
    id: 4,
    name: "Cheese Pizza",
    category: "pizza",
    image: "/images/pizza.jpg",
  },
  // Add more items
];

// Variables to keep track of the cart and item list
let cartCount = 0;
let itemList = itemsData;

// Function to render the item list
function renderItems() {
  const itemListDiv = document.getElementById("item-list");
  itemListDiv.innerHTML = "";

  itemList.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>Category: ${item.category}</p>
        <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
      `;
    itemListDiv.appendChild(itemCard);
  });
}

// Function to update the cart count
function updateCartCount() {
  const cartCountDiv = document.getElementById("cart-count");
  cartCountDiv.textContent = cartCount.toString();
}

// Function to filter items by category
function filterItemsByCategory(category) {
  if (category === "") {
    itemList = itemsData;
  } else {
    itemList = itemsData.filter((item) => item.category === category);
  }
  renderItems();
}

// Event listener for search functionality
document.getElementById("search-input").addEventListener("input", (event) => {
  const searchKeyword = event.target.value.toLowerCase();
  itemList = itemsData.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword)
  );
  renderItems();
});

// Event listener for filter functionality
document
  .getElementById("category-filter")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    filterItemsByCategory(selectedCategory);
  });

// Event listener for "Add to Cart" button
document.getElementById("item-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    cartCount++;
    updateCartCount();
  }
});

// Event listener for cart increment button
document.getElementById("cart-increment").addEventListener("click", () => {
  cartCount++;
  updateCartCount();
});

// Event listener for cart decrement button
document.getElementById("cart-decrement").addEventListener("click", () => {
  cartCount = Math.max(cartCount - 1, 0);
  updateCartCount();
});

// Event listener for admin button
document.getElementById("admin-btn").addEventListener("click", () => {
  document.getElementById("admin-popup").style.display = "block";
});

// Event listener for admin login button
document.getElementById("admin-login-btn").addEventListener("click", () => {
  const usernameInput = document.getElementById("admin-username").value;
  const passwordInput = document.getElementById("admin-password").value;

  if (usernameInput === "iits" && passwordInput === "23") {
    document.getElementById("add-item-form-popup").style.display = "block";
    document.getElementById("admin-popup").style.display = "none";
  } else {
    alert("Wrong credentials!");
  }
});

// Event listener for close button of "Add new item" form
document.getElementById("close-add-item-form").addEventListener("click", () => {
  document.getElementById("add-item-form-popup").style.display = "none";
});

// Event listener for "Add new item" form submission
document.getElementById("add-item-btn").addEventListener("click", () => {
  const itemName = document.getElementById("item-name").value;
  const itemCategory = document.getElementById("item-category").value;

  if (itemCategory !== "") {
    const newItem = {
      id: itemsData.length + 1,
      name: itemName,
      category: itemCategory,
      image: "newitem.jpg", // Provide a default image for new items
    };

    itemsData.push(newItem);
    filterItemsByCategory(itemCategory);
    document.getElementById("add-item-form-popup").style.display = "none";
  } else {
    alert("Please choose the appropriate type of the item!");
  }
});

// Initial render of the items
renderItems();
updateCartCount();
