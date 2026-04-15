// Main Application Logic - CRUD & Content Management

class ContentManager {
  constructor() {
    this.loadData();
    this.initializeEditMode();
  }

  loadData() {
    // Try to load from localStorage first, then fallback to data.json
    const storedData = localStorage.getItem('siteData');
    if (storedData) {
      this.data = JSON.parse(storedData);
    } else {
      // Load default data
      fetch('/data/data.json')
        .then(res => res.json())
        .then(data => {
          this.data = data;
          localStorage.setItem('siteData', JSON.stringify(data));
          this.render();
        })
        .catch(() => this.loadDefaultData());
    }
  }

  loadDefaultData() {
    this.data = {
      site: {
        title: "QORAQQALPOG'ISTON RESPUBLIKASI SHUMANAY TUMANI HOKIMLIG",
        subtitle: "O'ZBEKISTON RESPUBLIKASI HUQUMAT PORTALI",
        phone: "+99861-346-24-73",
        address: "BARCHA RAQAMLAR",
      },
      navigation: [
        { id: 1, label: "HOKIMIYAT HAQIDA", url: "#about" },
        { id: 2, label: "FAOLIYAT", url: "#activity" },
        { id: 3, label: "DAVLAT XIZMATLARI", url: "#services" },
        { id: 4, label: "HUJJATAR", url: "#documents" },
        { id: 5, label: "RAQAMLI HUQUMAT", url: "#digital" },
        { id: 6, label: "AXBOROT XIZMATI", url: "#info" },
        { id: 7, label: "BOG'LANISH", url: "#contact" }
      ],
      news: [],
      activities: [],
      sidebar: []
    };
  }

  // Save data to localStorage
  saveData() {
    localStorage.setItem('siteData', JSON.stringify(this.data));
  }

  // RENDER FUNCTIONS
  render() {
    this.renderHeader();
    this.renderNavigation();
    this.renderNews();
    this.renderActivities();
    this.renderSidebar();
    this.attachEventListeners();
  }

  renderHeader() {
    const header = document.getElementById('header');
    if (header) {
      header.innerHTML = `
        <div class="container mx-auto px-4 flex items-center justify-between py-4">
          <div class="flex items-center gap-4">
            <div>
              <h1 class="text-lg font-bold text-blue-900">${this.data.site.title}</h1>
              <p class="text-sm text-gray-700">${this.data.site.subtitle}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-blue-900">ISHONCH TELEFONI</div>
            <div class="text-xl font-bold text-blue-900">${this.data.site.phone}</div>
            <div class="text-xs text-gray-600">${this.data.site.address}</div>
          </div>
        </div>
      `;
    }
  }

  renderNavigation() {
    const nav = document.getElementById('navigation');
    if (nav) {
      nav.innerHTML = this.data.navigation
        .map(item => `<a href="${item.url}" class="px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 edit-nav" data-id="${item.id}">${item.label}</a>`)
        .join('');
    }
  }

  renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
      newsGrid.innerHTML = this.data.news
        .map(news => `
          <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition" data-id="${news.id}">
            <img src="${news.image}" alt="${news.title}" class="w-full h-48 object-cover">
            <div class="p-4">
              <div class="flex gap-4 mb-2">
                <div class="bg-gray-100 p-2 rounded text-center min-w-12">
                  <div class="text-lg font-bold text-blue-900">${news.dateNum}</div>
                  <div class="text-xs text-gray-600">${news.month}</div>
                </div>
                <div>
                  <h3 class="font-bold text-sm text-gray-800 edit-news-title" data-id="${news.id}">${news.title}</h3>
                  <p class="text-xs text-gray-600 mt-1 edit-news-desc" data-id="${news.id}">${news.description}</p>
                </div>
              </div>
              <div class="flex justify-between items-center mt-3 text-xs">
                <span class="text-gray-500">${news.date}</span>
                <a href="#" class="text-blue-600 hover:underline edit-news-link" data-id="${news.id}">yangiliklar</a>
              </div>
              ${auth.isAdmin() ? `
                <div class="mt-3 flex gap-2">
                  <button class="edit-btn text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" data-id="${news.id}">Tahrirlash</button>
                  <button class="delete-btn text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" data-id="${news.id}">O'chirish</button>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('');
    }
  }

  renderActivities() {
    const activitiesGrid = document.getElementById('activitiesGrid');
    if (activitiesGrid) {
      activitiesGrid.innerHTML = this.data.activities
        .map(activity => `
          <div class="bg-white p-6 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition" data-id="${activity.id}">
            <div class="flex items-start gap-4">
              <div class="text-3xl">${activity.icon}</div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-800 edit-activity-title" data-id="${activity.id}">${activity.title}</h3>
                <p class="text-sm text-gray-600 mt-1 edit-activity-desc" data-id="${activity.id}">${activity.description}</p>
              </div>
              <span class="text-gray-400">⟩</span>
            </div>
            ${auth.isAdmin() ? `
              <div class="mt-3 flex gap-2">
                <button class="edit-btn text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" data-id="${activity.id}">Tahrirlash</button>
                <button class="delete-btn text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" data-id="${activity.id}">O'chirish</button>
              </div>
            ` : ''}
          </div>
        `).join('');
    }
  }

  renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.innerHTML = this.data.sidebar
        .map(item => `
          <div class="mb-4 pb-4 border-b edit-sidebar" data-id="${item.id}">
            <div class="flex gap-3">
              <div class="bg-blue-600 text-white p-2 rounded text-center min-w-14 flex flex-col items-center justify-center">
                <div class="text-lg font-bold">${item.date}</div>
                <div class="text-xs">${item.month}</div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-800 edit-sidebar-title" data-id="${item.id}">${item.title}</p>
              </div>
            </div>
            ${auth.isAdmin() ? `
              <div class="mt-2 flex gap-2 ml-20">
                <button class="edit-btn text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" data-id="${item.id}">Tahrirlash</button>
                <button class="delete-btn text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" data-id="${item.id}">O'chirish</button>
              </div>
            ` : ''}
          </div>
        `).join('');
    }
  }

  // EDIT FUNCTIONS
  initializeEditMode() {
    if (!auth.isAdmin()) return;

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const id = e.target.dataset.id;
        const section = e.target.closest('[data-id]')?.parentElement?.id || e.target.closest('[data-id]').id;
        this.openEditModal(id, section);
      }
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        this.deleteItem(id);
      }
    });
  }

  openEditModal(itemId, section) {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');

    if (!modal) {
      this.createEditModal();
      return;
    }

    // Determine which item type we're editing
    let item = null;
    let itemType = 'news'; // default

    if (document.getElementById('newsGrid').querySelector(`[data-id="${itemId}"]`)) {
      item = this.data.news.find(n => n.id == itemId);
      itemType = 'news';
    } else if (document.getElementById('activitiesGrid').querySelector(`[data-id="${itemId}"]`)) {
      item = this.data.activities.find(a => a.id == itemId);
      itemType = 'activity';
    } else if (document.getElementById('sidebar').querySelector(`[data-id="${itemId}"]`)) {
      item = this.data.sidebar.find(s => s.id == itemId);
      itemType = 'sidebar';
    }

    if (!item) return;

    // Build form based on item type
    let formHTML = `
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ID: ${itemId}</label>
      </div>
    `;

    if (itemType === 'news') {
      formHTML += `
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Sarlavha</label>
          <input type="text" id="editTitle" class="w-full border px-3 py-2 rounded" value="${item.title}">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Tavsifi</label>
          <textarea id="editDesc" class="w-full border px-3 py-2 rounded h-20">${item.description}</textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Rasm URL</label>
          <input type="text" id="editImage" class="w-full border px-3 py-2 rounded" value="${item.image}">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Sana</label>
          <input type="text" id="editDate" class="w-full border px-3 py-2 rounded" value="${item.date}">
        </div>
      `;
    } else if (itemType === 'activity') {
      formHTML += `
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Nomi</label>
          <input type="text" id="editTitle" class="w-full border px-3 py-2 rounded" value="${item.title}">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Tavsifi</label>
          <input type="text" id="editDesc" class="w-full border px-3 py-2 rounded" value="${item.description}">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Emoji/Icon</label>
          <input type="text" id="editIcon" class="w-full border px-3 py-2 rounded" value="${item.icon}">
        </div>
      `;
    } else if (itemType === 'sidebar') {
      formHTML += `
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Sarlavha</label>
          <input type="text" id="editTitle" class="w-full border px-3 py-2 rounded" value="${item.title}">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Sana</label>
          <input type="text" id="editDate" class="w-full border px-3 py-2 rounded" value="${item.date}">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Oy</label>
          <input type="text" id="editMonth" class="w-full border px-3 py-2 rounded" value="${item.month}">
        </div>
      `;
    }

    formHTML += `
      <div class="flex gap-2 justify-end">
        <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded" onclick="document.getElementById('editModal').style.display='none'">Bekor qilish</button>
        <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded" onclick="app.saveEdit('${itemType}', ${itemId})">Saqlash</button>
      </div>
    `;

    form.innerHTML = formHTML;
    modal.style.display = 'block';
  }

  saveEdit(itemType, itemId) {
    if (itemType === 'news') {
      const item = this.data.news.find(n => n.id == itemId);
      if (item) {
        item.title = document.getElementById('editTitle')?.value || item.title;
        item.description = document.getElementById('editDesc')?.value || item.description;
        item.image = document.getElementById('editImage')?.value || item.image;
        item.date = document.getElementById('editDate')?.value || item.date;
      }
    } else if (itemType === 'activity') {
      const item = this.data.activities.find(a => a.id == itemId);
      if (item) {
        item.title = document.getElementById('editTitle')?.value || item.title;
        item.description = document.getElementById('editDesc')?.value || item.description;
        item.icon = document.getElementById('editIcon')?.value || item.icon;
      }
    } else if (itemType === 'sidebar') {
      const item = this.data.sidebar.find(s => s.id == itemId);
      if (item) {
        item.title = document.getElementById('editTitle')?.value || item.title;
        item.date = document.getElementById('editDate')?.value || item.date;
        item.month = document.getElementById('editMonth')?.value || item.month;
      }
    }

    this.saveData();
    document.getElementById('editModal').style.display = 'none';
    this.render();
    showMessage('Saqlandi!', 'success');
  }

  deleteItem(itemId) {

    // Check which array contains this item
    if (this.data.news.find(n => n.id == itemId)) {
      this.data.news = this.data.news.filter(n => n.id != itemId);
    } else if (this.data.activities.find(a => a.id == itemId)) {
      this.data.activities = this.data.activities.filter(a => a.id != itemId);
    } else if (this.data.sidebar.find(s => s.id == itemId)) {
      this.data.sidebar = this.data.sidebar.filter(s => s.id != itemId);
    }

    this.saveData();
    this.render();
    showMessage('O\'chirildi!', 'success');
  }

  createEditModal() {
    const modal = document.createElement('div');
    modal.id = 'editModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Tahrirlash</h2>
        <form id="editForm"></form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  attachEventListeners() {
    // Close modal when clicking outside
    const modal = document.getElementById('editModal');
    if (modal) {
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }

  // Add new item functions
  addNews(title, description, image, date) {
    const newNews = {
      id: Math.max(...this.data.news.map(n => n.id), 0) + 1,
      title,
      description,
      image,
      date,
      dateNum: new Date().getDate(),
      month: 'APREL',
      link: 'yangiliklar'
    };
    this.data.news.push(newNews);
    this.saveData();
    this.renderNews();
  }

  addActivity(title, description, icon) {
    const newActivity = {
      id: Math.max(...this.data.activities.map(a => a.id), 0) + 1,
      title,
      description,
      icon
    };
    this.data.activities.push(newActivity);
    this.saveData();
    this.renderActivities();
  }
}

// Initialize app
const app = new ContentManager();
document.addEventListener('DOMContentLoaded', () => {
  app.render();
});
