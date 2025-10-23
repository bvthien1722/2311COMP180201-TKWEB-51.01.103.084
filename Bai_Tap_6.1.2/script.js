/* =============================
   🎃 HALLOWEEN FESTIVAL SCRIPT
   ============================= */

/* ---------- 🔸 GIAN HÀNG SẢN PHẨM (index.html) ---------- */
if (document.getElementById('productForm')) {
  console.log("🛍️ Loaded: Product Management");

  function getProducts() {
    return JSON.parse(localStorage.getItem('hp_products') || '[]');
  }
  function saveProducts(p) {
    localStorage.setItem('hp_products', JSON.stringify(p));
  }

  function renderProducts(filter = '') {
    const el = document.getElementById('products');
    el.innerHTML = '';
    const products = getProducts().filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (products.length === 0) {
      el.innerHTML = '<p style="opacity:.7">Không có sản phẩm nào.</p>';
      return;
    }

    products.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <h4>${escapeHtml(p.name)}</h4>
        <div class="p-desc">${escapeHtml(p.desc || '')}</div>
        <div class="p-meta">${Number(p.price).toLocaleString()} ₫</div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="btn" data-edit="${i}">Sửa</button>
          <button class="btn alt" data-del="${i}">Xóa</button>
        </div>`;
      el.appendChild(div);
    });
  }

  // Sự kiện lưu / cập nhật sản phẩm
  document.getElementById('productForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const price = Number(document.getElementById('productPrice').value);
    const desc = document.getElementById('productDesc').value.trim();
    if (!name) return alert('Vui lòng nhập tên sản phẩm.');

    const products = getProducts();
    if (id !== '') products[Number(id)] = { name, price, desc };
    else products.push({ name, price, desc });

    saveProducts(products);
    renderProducts();
    e.target.reset();
    document.getElementById('productId').value = '';
  });

  // Làm mới form
  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
  });

  // Xử lý sửa / xóa
  document.getElementById('products').addEventListener('click', e => {
    const edit = e.target.getAttribute('data-edit');
    const del = e.target.getAttribute('data-del');

    if (edit != null) {
      const p = getProducts()[Number(edit)];
      document.getElementById('productId').value = edit;
      document.getElementById('productName').value = p.name;
      document.getElementById('productPrice').value = p.price;
      document.getElementById('productDesc').value = p.desc;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (del != null) {
      if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        const ps = getProducts();
        ps.splice(Number(del), 1);
        saveProducts(ps);
        renderProducts();
      }
    }
  });

  // Tìm kiếm sản phẩm
  document
    .getElementById('searchInput')
    .addEventListener('input', e => renderProducts(e.target.value));

  renderProducts();
}

/* ---------- 🔸 FORM LIÊN HỆ (index.html) ---------- */
if (document.getElementById('contactForm')) {
  console.log("📧 Loaded: Contact Form");

  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg = document.getElementById('cMessage').value.trim();

    if (!name || !email || !msg)
      return alert('Vui lòng điền đầy đủ thông tin.');

    alert(`🎃 Cảm ơn ${name}! Tin nhắn của bạn đã được gửi (mô phỏng).`);
    e.target.reset();
  });
}

/* ---------- 🔸 FORM ĐĂNG KÝ LỄ HỘI (dangky.html) ---------- */
if (document.getElementById('regForm')) {
  console.log("🧛 Loaded: Registration Page");

  function getRegs() {
    return JSON.parse(localStorage.getItem('hp_regs') || '[]');
  }
  function saveRegs(r) {
    localStorage.setItem('hp_regs', JSON.stringify(r));
  }
  function renderRegs() {
    const box = document.getElementById('regList');
    box.innerHTML = '';
    const regs = getRegs();

    if (regs.length === 0) {
      box.innerHTML = '<p style="opacity:.7">Chưa có người đăng ký.</p>';
      return;
    }

    regs.forEach((r, i) => {
      const d = document.createElement('div');
      d.className = 'reg-item';
      d.innerHTML = `
        <strong>${escapeHtml(r.name)}</strong> • ${escapeHtml(r.phone)} • 
        <em>${r.count} người</em>
        <div style="margin-top:6px;color:#cfcfcf">${escapeHtml(
          r.note || ''
        )}</div>
        <div style="margin-top:8px">
          <button class="btn alt" data-del="${i}">Xóa</button>
        </div>`;
      box.appendChild(d);
    });
  }

  // Đăng ký
  document.getElementById('regForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('rName').value.trim();
    const phone = document.getElementById('rPhone').value.trim();
    const count = Number(document.getElementById('rCount').value) || 1;
    const note = document.getElementById('rNote').value.trim();

    if (!name || !phone)
      return alert('Vui lòng nhập đầy đủ họ tên và số điện thoại.');

    const regs = getRegs();
    regs.push({ name, phone, count, note, ts: Date.now() });
    saveRegs(regs);
    renderRegs();
    e.target.reset();
  });

  // Xóa từng đăng ký
  document.getElementById('regList').addEventListener('click', e => {
    const del = e.target.getAttribute('data-del');
    if (del != null) {
      if (confirm('Xóa đăng ký này?')) {
        const rs = getRegs();
        rs.splice(Number(del), 1);
        saveRegs(rs);
        renderRegs();
      }
    }
  });

  // Xóa toàn bộ
  document
    .getElementById('clearRegs')
    .addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn xóa toàn bộ danh sách đăng ký?')) {
        saveRegs([]);
        renderRegs();
      }
    });

  renderRegs();
}

/* ---------- 🔸 TIỆN ÍCH CHUNG ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[m];
  });
}
