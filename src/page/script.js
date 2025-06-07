var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Global variables
var allProducts = [];
var filteredProducts = [];
// DOM elements
var searchInput = document.getElementById("search-input");
var categoryFilter = document.getElementById("category-filter");
var priceRange = document.getElementById("price-range");
var priceValue = document.getElementById("price-value");
var ratingFilter = document.getElementById("rating-filter");
var sortBy = document.getElementById("sort-by");
var productsContainer = document.getElementById("products-container");
var resultsCount = document.getElementById("results-count");
// Function to fetch products
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://fakestoreapi.com/products")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch products");
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
// Function to render star ratings
function renderStars(rating) {
    var fullStars = Math.floor(rating);
    var hasHalfStar = rating % 1 >= 0.5;
    var stars = "";
    for (var i = 0; i < fullStars; i++) {
        stars += "★";
    }
    if (hasHalfStar) {
        stars += "½";
    }
    for (var i = stars.length; i < 5; i++) {
        stars += "☆";
    }
    return stars;
}
// Function to create responsive product cards
function createProductCard(product) {
    var card = document.createElement("div");
    card.className = "\n    bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 \n    flex flex-col h-full border border-gray-200\n  ";
    var imageContainer = document.createElement("div");
    imageContainer.className = "\n    overflow-hidden \n    h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56 2xl:h-60 \n    flex items-center justify-center p-4 bg-gray-100\n  ";
    var image = document.createElement("img");
    image.className = "\n    h-full object-contain transition-transform duration-300 hover:scale-110\n    max-w-full\n  ";
    image.src = product.image;
    image.alt = product.title;
    image.loading = "lazy";
    imageContainer.appendChild(image);
    var content = document.createElement("div");
    content.className = "p-4 flex flex-col flex-grow";
    var category = document.createElement("span");
    category.className = "\n    text-xs font-semibold text-blue-600 uppercase tracking-wider \n    mb-1\n  ";
    category.textContent = product.category;
    var title = document.createElement("h3");
    title.className = "\n    text-sm sm:text-base md:text-lg font-medium text-gray-900 \n    line-clamp-2 mb-2\n  ";
    title.textContent = product.title;
    var description = document.createElement("p");
    description.className = "\n    text-xs sm:text-sm text-gray-600 \n    line-clamp-2 sm:line-clamp-3 mb-3\n  ";
    description.textContent = product.description;
    var ratingContainer = document.createElement("div");
    ratingContainer.className = "flex items-center";
    var stars = document.createElement("span");
    stars.className = "text-yellow-500 text-xs sm:text-sm";
    stars.textContent = renderStars(product.rating.rate);
    var ratingCount = document.createElement("span");
    ratingCount.className = "ml-1 text-gray-500 text-xs";
    ratingCount.textContent = "(".concat(product.rating.count, ")");
    ratingContainer.appendChild(stars);
    ratingContainer.appendChild(ratingCount);
    var price = document.createElement("div");
    price.className = "\n    text-base sm:text-lg font-bold text-gray-900 \n    mt-2 sm:mt-3\n  ";
    price.textContent = "$".concat(product.price.toFixed(2));
    var footer = document.createElement("div");
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
function filterProducts() {
    var searchTerm = searchInput.value.toLowerCase();
    var category = categoryFilter.value;
    var maxPrice = parseFloat(priceRange.value);
    var minRating = ratingFilter.value ? parseFloat(ratingFilter.value) : 0;
    return allProducts.filter(function (product) {
        var matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);
        var matchesCategory = category === "all" || product.category === category;
        var matchesPrice = product.price <= maxPrice;
        var matchesRating = product.rating.rate >= minRating;
        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
}
// Function to sort products
function sortProducts(products) {
    var sortValue = sortBy.value;
    switch (sortValue) {
        case "price-asc":
            return __spreadArray([], products, true).sort(function (a, b) { return a.price - b.price; });
        case "price-desc":
            return __spreadArray([], products, true).sort(function (a, b) { return b.price - a.price; });
        case "rating":
            return __spreadArray([], products, true).sort(function (a, b) { return b.rating.rate - a.rating.rate; });
        case "popularity":
            return __spreadArray([], products, true).sort(function (a, b) { return b.rating.count - a.rating.count; });
        default:
            return products;
    }
}
// Function to render products
function renderProducts(products) {
    productsContainer.innerHTML = "";
    if (products.length === 0) {
        productsContainer.innerHTML = "\n      <div class=\"col-span-full text-center py-12\">\n        <div class=\"text-gray-400 text-5xl mb-4\">\uD83D\uDD0D</div>\n        <h3 class=\"text-lg font-medium text-gray-900\">No products found</h3>\n        <p class=\"mt-2 text-gray-600\">Try adjusting your search or filter criteria</p>\n      </div>\n    ";
        resultsCount.textContent = "0";
        return;
    }
    var grid = document.createElement("div");
    grid.className = "\n    grid \n    grid-cols-1 \n    sm:grid-cols-2 \n    md:grid-cols-2 \n    lg:grid-cols-3 \n    xl:grid-cols-4 \n    2xl:grid-cols-5 \n    gap-4 sm:gap-5 md:gap-6 \n    px-4 sm:px-6 \n    py-6\n  ";
    var sortedProducts = sortProducts(products);
    sortedProducts.forEach(function (product) {
        var card = createProductCard(product);
        grid.appendChild(card);
    });
    productsContainer.appendChild(grid);
    resultsCount.textContent = products.length.toString();
}
// Function to populate category filter
function populateCategories() {
    var categories = new Set(["all"]);
    allProducts.forEach(function (product) { return categories.add(product.category); });
    categoryFilter.innerHTML = "";
    categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}
// Function to update price range display
function updatePriceDisplay() {
    var maxPrice = Math.max.apply(Math, allProducts.map(function (p) { return p.price; }));
    priceRange.max = maxPrice.toString();
    priceRange.value = maxPrice.toString();
    priceValue.textContent = "$".concat(maxPrice);
}
// Function to handle search and filtering
function handleSearch() {
    filteredProducts = filterProducts();
    renderProducts(filteredProducts);
}
// Function to initialize the app
function initializeApp() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    productsContainer.innerHTML = "\n      <div class=\"col-span-full text-center py-12\">\n        <div class=\"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto\"></div>\n        <p class=\"mt-4 text-gray-600\">Loading products...</p>\n      </div>\n    ";
                    return [4 /*yield*/, fetchProducts()];
                case 1:
                    allProducts = _a.sent();
                    filteredProducts = __spreadArray([], allProducts, true);
                    populateCategories();
                    updatePriceDisplay();
                    renderProducts(filteredProducts);
                    // Add event listeners
                    searchInput.addEventListener("input", handleSearch);
                    categoryFilter.addEventListener("change", handleSearch);
                    priceRange.addEventListener("input", function () {
                        priceValue.textContent = "$".concat(priceRange.value);
                        handleSearch();
                    });
                    ratingFilter.addEventListener("change", handleSearch);
                    sortBy.addEventListener("change", function () { return renderProducts(filteredProducts); });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    productsContainer.innerHTML = "\n      <div class=\"col-span-full text-center py-12\">\n        <div class=\"text-red-500 text-4xl mb-4\">\u26A0\uFE0F</div>\n        <h3 class=\"text-lg font-medium text-gray-900\">Failed to load products</h3>\n        <p class=\"mt-2 text-gray-600\">".concat(error_1 instanceof Error ? error_1.message : "Please try again later", "</p>\n        <button onclick=\"initializeApp()\" class=\"mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors\">\n          Retry\n        </button>\n      </div>\n    ");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
