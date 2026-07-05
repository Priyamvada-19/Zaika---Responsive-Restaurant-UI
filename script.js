let allMenuItems = [
            { name: 'Tandoori Jhinga', category: 'starters', price: '₹330', description: 'Jumbo prawns marinated in saffron and spices, char-grilled for a luxurious bite.' },
            { name: 'Subz Galoutti Kebab', category: 'starters', price: '₹320', description: 'A delicate vegetarian take on the Lucknowi classic, spiced patties that dissolve on the tongue.' },
            { name: 'Dakshini Crab Cake', category: 'starters', price: '₹475', description: 'Coastal crab delicacy spiced with curry leaves and coconut.' },
            { name: 'Raan Tandoori', category: 'starters', price: '₹385', description: 'Slow-marinated leg of lamb, roasted to perfection with bold flavors.' },
            { name: 'Navratna Korma', category: 'mains', price: '₹540', description: 'A royal medley of nine vegetables and nuts in a mildly spiced, creamy sauce.' },
            { name: 'Chettinad Chicken', category: 'mains', price: '₹480', description: 'Fiery South Indian chicken curry layered with roasted spices and coconut.' },
            { name: 'Avial ', category: 'mains', price: '₹520', description: 'A medley of vegetables in yogurt-coconut gravy, tempered with curry leaves.' },
            { name: 'Lobster Thermidor', category: 'mains', price: '₹580', description: 'Maine lobster, cognac cream sauce, gruyère, fresh herbs' },
            { name: 'Laal Maas', category: 'mains', price: '₹380', description: 'Fiery red chili lamb curry, bold yet balanced for gourmet palates.' },
            { name: 'Khubani Ka Meetha', category: 'desserts', price: '₹160', description: 'Apricot compote topped with cream, a regal Nizami dessert.' },
            { name: 'Payasam', category: 'desserts', price: '₹109', description: 'Creamy vermicelli pudding simmered in milk and jaggery, perfumed with ghee.' },
            { name: 'Malpua and Rabri', category: 'desserts', price: '₹150', description: 'Crisp pancakes drizzled with thickened sweetened milk, a festive indulgence.' },
            { name: 'Rose Sherbet', category: 'beverages', price: '₹210', description: 'Delicate rose-flavored drink, chilled and garnished with petals for elegance.' },
            { name: 'Kokum Cooler', category: 'beverages', price: '₹160', description: 'Tart kokum fruit drink tempered with cumin, a coastal delicacy.' },
            { name: 'Thandai', category: 'beverages', price: '₹220', description: 'Festive milk-based drink infused with nuts, fennel, and saffron, traditionally served chilled.' }
        ];

        // Load menu items
        function loadMenu(category = 'all', searchTerm = '') {
            const grid = document.getElementById('menu-grid');
            grid.innerHTML = '';
            
            let filtered = category === 'all' ? allMenuItems : allMenuItems.filter(item => item.category === category);
            
            if (searchTerm) {
                filtered = filtered.filter(item => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            filtered.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <div class="menu-item-header">
                        <h3>${item.name}</h3>
                        <div class="price">${item.price}</div>
                    </div>
                    <p>${item.description}</p>
                `;
                grid.appendChild(menuItem);
            });
            
            if (filtered.length === 0) {
                grid.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); grid-column: 1/-1;">No items found matching your search.</p>';
            }
        }

        // Filter menu
        function filterMenu(category) {
            const searchTerm = document.getElementById('searchInput').value;
            loadMenu(category, searchTerm);
            
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Search menu
        function searchMenu() {
            const searchTerm = document.getElementById('searchInput').value;
            const activeCategory = document.querySelector('.category-btn.active');
            const category = activeCategory ? activeCategory.textContent.toLowerCase() : 'all';
            loadMenu(category === 'all' ? 'all' : category, searchTerm);
        }

        // Toggle mobile menu
        function toggleMenu() {
            const menu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        // Close mobile menu
        function closeMenu() {
            const menu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Handle form submission
        document.getElementById('reservationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const successMsg = document.getElementById('successMessage');
            successMsg.style.display = 'block';
            
            this.reset();
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
            
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        // Set minimum date for reservation to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').setAttribute('min', today);

        // Initialize menu
        loadMenu();