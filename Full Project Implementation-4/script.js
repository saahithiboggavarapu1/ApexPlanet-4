/* ---------- Section toggle ---------- */
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ---------- To-Do List ---------- */
function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) return;
  const li = document.createElement('li');
  li.textContent = task;
  document.getElementById('taskList').appendChild(li);
  storeTask(task);
  input.value = '';
}

function storeTask(t) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(t);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  (JSON.parse(localStorage.getItem('tasks') || '[]'))
    .forEach(t => { const li = document.createElement('li'); li.textContent = t; taskList.appendChild(li); });
}

/* ---------- Products ---------- */
const products = [
  { name: 'Smartphone', category: 'Electronics', price: 300, rating: 4.5 },
  { name: 'Laptop',     category: 'Electronics', price: 700, rating: 4.7 },
  { name: 'Novel',      category: 'Books',       price:  20, rating: 4.2 },
  { name: 'Headphones', category: 'Electronics', price:  50, rating: 4.0 },
  { name: 'Tablet',     category: 'Electronics', price: 250, rating: 4.3 },
  { name: 'Notebook',   category: 'Books',       price:  10, rating: 3.9 }
];

let viewList = [...products];

function display(list = viewList) {
  const box = document.getElementById('products');
  box.innerHTML = '';
  list.forEach(p => {
    box.insertAdjacentHTML('beforeend', `
      <div class="product">
        <h4>${p.name}</h4>
        <p>Category: ${p.category} | Price: $${p.price} | Rating: ${p.rating}</p>
        <button onclick="addToCart('${p.name}')">Add to Cart</button>
      </div>
    `);
  });
}

function filterProducts() {
  const cat = document.getElementById('categoryFilter').value;
  viewList = (cat === 'All') ? [...products] : products.filter(p => p.category === cat);
  sortProducts();          // keep existing sort order
  display();
}

function sortProducts() {
  const sort = document.getElementById('sortBy').value;
  if (sort === 'price')   viewList.sort((a,b) => a.price  - b.price);
  if (sort === 'rating')  viewList.sort((a,b) => b.rating - a.rating);
  display();
}

function searchProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const result = viewList.filter(p => p.name.toLowerCase().includes(q));
  display(result);
}

function addToCart(name) { alert(`✅ "${name}" added to cart!`); }

/* ---------- Init ---------- */
window.onload = () => { loadTasks(); display(); };