// Product type definition
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// Global variables
let allProducts: Product[] = [];
let filteredProducts: Product[] = [];

// DOM elements
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const categoryFilter = document.getElementById(
  "category-filter"
) as HTMLSelectElement;
const priceRange = document.getElementById("price-range") as HTMLInputElement;
const priceValue = document.getElementById("price-value") as HTMLSpanElement;
const ratingFilter = document.getElementById(
  "rating-filter"
) as HTMLSelectElement;
const sortBy = document.getElementById("sort-by") as HTMLSelectElement;
const productsContainer = document.getElementById(
  "products-container"
) as HTMLDivElement;
const resultsCount = document.getElementById(
  "results-count"
) as HTMLSpanElement;

// Function to fetch products
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

// Function to render star ratings
function renderStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += "★";
  }
  if (hasHalfStar) {
    stars += "½";
  }
  for (let i = stars.length; i < 5; i++) {
    stars += "☆";
  }

  return stars;
}

// Function to create responsive product cards
function createProductCard(product: Product): HTMLElement {
  const card = document.createElement("div");
  card.className = `
    bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 
    flex flex-col h-full border border-gray-200
  `;

  const imageContainer = document.createElement("div");
  imageContainer.className = `
    overflow-hidden 
    h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56 2xl:h-60 
    flex items-center justify-center p-4 bg-gray-100
  `;

  const image = document.createElement("img");
  image.className = `
    h-full object-contain transition-transform duration-300 hover:scale-110
    max-w-full
  `;
  image.src = product.image;
  image.alt = product.title;
  image.loading = "lazy";

  imageContainer.appendChild(image);

  const content = document.createElement("div");
  content.className = "p-4 flex flex-col flex-grow";

  const category = document.createElement("span");
  category.className = `
    text-xs font-semibold text-blue-600 uppercase tracking-wider 
    mb-1
  `;
  category.textContent = product.category;

  const title = document.createElement("h3");
  title.className = `
    text-sm sm:text-base md:text-lg font-medium text-gray-900 
    line-clamp-2 mb-2
  `;
  title.textContent = product.title;

  const description = document.createElement("p");
  description.className = `
    text-xs sm:text-sm text-gray-600 
    line-clamp-2 sm:line-clamp-3 mb-3
  `;
  description.textContent = product.description;

  const ratingContainer = document.createElement("div");
  ratingContainer.className = "flex items-center";

  const stars = document.createElement("span");
  stars.className = "text-yellow-500 text-xs sm:text-sm";
  stars.textContent = renderStars(product.rating.rate);

  const ratingCount = document.createElement("span");
  ratingCount.className = "ml-1 text-gray-500 text-xs";
  ratingCount.textContent = `(${product.rating.count})`;

  ratingContainer.appendChild(stars);
  ratingContainer.appendChild(ratingCount);

  const price = document.createElement("div");
  price.className = `
    text-base sm:text-lg font-bold text-gray-900 
    mt-2 sm:mt-3
  `;
  price.textContent = `$${product.price.toFixed(2)}`;

  const footer = document.createElement("div");
  footer.className = "mt-auto pt-2 sm:pt-3 flex justify-between items-center";

  footer.appendChild(ratingContainer);
  footer.appendChild(price);

  content.appendChild(category);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(footer);

  card.appendChild(imageContainer);
  card.appendChild(content);

  return card;
}

// Function to filter products based on search criteria
function filterProducts(): Product[] {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const maxPrice = parseFloat(priceRange.value);
  const minRating = ratingFilter.value ? parseFloat(ratingFilter.value) : 0;

  return allProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = product.price <= maxPrice;
    const matchesRating = product.rating.rate >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });
}

// Function to sort products
function sortProducts(products: Product[]): Product[] {
  const sortValue = sortBy.value;

  switch (sortValue) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "rating":
      return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
    case "popularity":
      return [...products].sort((a, b) => b.rating.count - a.rating.count);
    default:
      return products;
  }
}

// Function to render products
function renderProducts(products: Product[]) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-gray-400 text-5xl mb-4">🔍</div>
        <h3 class="text-lg font-medium text-gray-900">No products found</h3>
        <p class="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    `;
    resultsCount.textContent = "0";
    return;
  }

  const grid = document.createElement("div");
  grid.className = `
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-2 
    lg:grid-cols-3 
    xl:grid-cols-4 
    2xl:grid-cols-5 
    gap-4 sm:gap-5 md:gap-6 
    px-4 sm:px-6 
    py-6
  `;

  const sortedProducts = sortProducts(products);

  sortedProducts.forEach((product) => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });

  productsContainer.appendChild(grid);
  resultsCount.textContent = products.length.toString();
}

// Function to populate category filter
function populateCategories() {
  const categories = new Set<string>(["all"]);
  allProducts.forEach((product) => categories.add(product.category));

  categoryFilter.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Function to update price range display
function updatePriceDisplay() {
  const maxPrice = Math.max(...allProducts.map((p) => p.price));
  priceRange.max = maxPrice.toString();
  priceRange.value = maxPrice.toString();
  priceValue.textContent = `$${maxPrice}`;
}

// Function to handle search and filtering
function handleSearch() {
  filteredProducts = filterProducts();
  renderProducts(filteredProducts);
}

// Function to initialize the app
async function initializeApp() {
  try {
    productsContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading products...</p>
      </div>
    `;

    allProducts = await fetchProducts();
    filteredProducts = [...allProducts];

    populateCategories();
    updatePriceDisplay();
    renderProducts(filteredProducts);

    // Add event listeners
    searchInput.addEventListener("input", handleSearch);
    categoryFilter.addEventListener("change", handleSearch);
    priceRange.addEventListener("input", () => {
      priceValue.textContent = `$${priceRange.value}`;
      handleSearch();
    });
    ratingFilter.addEventListener("change", handleSearch);
    sortBy.addEventListener("change", () => renderProducts(filteredProducts));
  } catch (error) {
    productsContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 class="text-lg font-medium text-gray-900">Failed to load products</h3>
        <p class="mt-2 text-gray-600">${
          error instanceof Error ? error.message : "Please try again later"
        }</p>
        <button onclick="initializeApp()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Retry
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
