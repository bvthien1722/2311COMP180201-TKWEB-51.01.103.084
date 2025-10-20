// --- Lấy dữ liệu từ localStorage ---
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

// --- Lưu dữ liệu ---
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// --- Hiển thị danh sách sản phẩm ---
function renderProducts(filter = "") {
  const products = getProducts();
  const table = document.getElementById("productTable");
  table.innerHTML = "";

  products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((p, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.price.toLocaleString()} ₫</td>
        <td>${p.desc || ""}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editProduct(${index})">Sửa</button>
          <button class="action-btn delete-btn" onclick="deleteProduct(${index})">Xóa</button>
        </td>`;
      table.appendChild(row);
    });
}

// --- Thêm hoặc sửa sản phẩm ---
document.getElementById("productForm").addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const desc = document.getElementById("productDesc").value.trim();

  let products = getProducts();

  if (id) {
    // Sửa
    products[id] = { name, price, desc };
  } else {
    // Thêm mới
    products.push({ name, price, desc });
  }

  saveProducts(products);
  renderProducts();
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
});

// --- Xóa sản phẩm ---
function deleteProduct(index) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    renderProducts();
  }
}

// --- Sửa sản phẩm ---
function editProduct(index) {
  const p = getProducts()[index];
  document.getElementById("productId").value = index;
  document.getElementById("productName").value = p.name;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productDesc").value = p.desc;
}

// --- Tìm kiếm ---
document.getElementById("searchInput").addEventListener("input", e => {
  renderProducts(e.target.value);
});

// --- Làm mới form ---
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
});

// --- Khởi tạo ---
renderProducts();
