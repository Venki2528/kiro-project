// Outfit database
const outfits = [
    // Casual outfits
    { id: 1, category: 'casual', title: 'Weekend Brunch', description: 'Light blue jeans, white tee, denim jacket, white sneakers', icon: '👖' },
    { id: 2, category: 'casual', title: 'Coffee Run', description: 'Leggings, oversized sweater, ankle boots, crossbody bag', icon: '☕' },
    { id: 3, category: 'casual', title: 'Park Stroll', description: 'Floral sundress, cardigan, sandals, straw hat', icon: '🌸' },
    { id: 4, category: 'casual', title: 'Shopping Day', description: 'Black jeans, striped top, blazer, loafers', icon: '🛍️' },
    { id: 5, category: 'casual', title: 'Movie Night', description: 'Joggers, graphic tee, hoodie, comfortable sneakers', icon: '🎬' },
    { id: 6, category: 'casual', title: 'Beach Vibes', description: 'Shorts, tank top, kimono, flip flops, sunglasses', icon: '🏖️' },
    
    // Office outfits
    { id: 7, category: 'office', title: 'Classic Professional', description: 'Black pencil skirt, white blouse, blazer, pumps', icon: '💼' },
    { id: 8, category: 'office', title: 'Modern Business', description: 'Tailored pants, silk camisole, structured jacket, heels', icon: '👔' },
    { id: 9, category: 'office', title: 'Smart Casual', description: 'Midi skirt, tucked-in blouse, cardigan, flats', icon: '📊' },
    { id: 10, category: 'office', title: 'Power Suit', description: 'Navy suit set, crisp shirt, pointed heels, minimal jewelry', icon: '⚡' },
    { id: 11, category: 'office', title: 'Friday Casual', description: 'Dark jeans, blazer, nice top, ankle boots', icon: '📅' },
    { id: 12, category: 'office', title: 'Meeting Ready', description: 'Sheath dress, statement necklace, blazer, classic pumps', icon: '🤝' },
    
    // Party outfits
    { id: 13, category: 'party', title: 'Cocktail Chic', description: 'Little black dress, strappy heels, clutch, statement earrings', icon: '🍸' },
    { id: 14, category: 'party', title: 'Glam Night', description: 'Sequin top, leather pants, heels, bold makeup', icon: '✨' },
    { id: 15, category: 'party', title: 'Birthday Bash', description: 'Wrap dress, heeled sandals, mini bag, layered necklaces', icon: '🎂' },
    { id: 16, category: 'party', title: 'Club Ready', description: 'Bodycon dress, stilettos, metallic clutch, smokey eyes', icon: '🎵' },
    { id: 17, category: 'party', title: 'Dinner Date', description: 'Midi dress, heeled boots, leather jacket, delicate jewelry', icon: '🍽️' },
    { id: 18, category: 'party', title: 'Rooftop Soirée', description: 'Jumpsuit, block heels, statement bag, bold lipstick', icon: '🌃' }
];

// State management
let currentCategory = 'casual';
let favorites = JSON.parse(localStorage.getItem('outfitFavorites')) || [];

// DOM elements
const categoryButtons = document.querySelectorAll('.category-btn');
const outfitsContainer = document.getElementById('outfitsContainer');

// Initialize app
function init() {
    renderOutfits(currentCategory);
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update current category and render
            currentCategory = category;
            renderOutfits(category);
        });
    });
}

// Render outfits based on category
function renderOutfits(category) {
    outfitsContainer.innerHTML = '';
    
    let outfitsToShow = [];
    
    if (category === 'favorites') {
        outfitsToShow = outfits.filter(outfit => favorites.includes(outfit.id));
        
        if (outfitsToShow.length === 0) {
            outfitsContainer.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 4rem;">💔</div>
                    <p>No favorites yet! Start adding outfits you love.</p>
                </div>
            `;
            return;
        }
    } else {
        outfitsToShow = outfits.filter(outfit => outfit.category === category);
    }
    
    outfitsToShow.forEach(outfit => {
        const card = createOutfitCard(outfit);
        outfitsContainer.appendChild(card);
    });
}

// Create outfit card element
function createOutfitCard(outfit) {
    const card = document.createElement('div');
    card.className = 'outfit-card';
    
    const isFavorite = favorites.includes(outfit.id);
    
    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${outfit.id}">
            ${isFavorite ? '❤️' : '🤍'}
        </button>
        <div class="outfit-icon">${outfit.icon}</div>
        <h3>${outfit.title}</h3>
        <p>${outfit.description}</p>
    `;
    
    // Add favorite toggle listener
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => toggleFavorite(outfit.id));
    
    return card;
}

// Toggle favorite status
function toggleFavorite(outfitId) {
    const index = favorites.indexOf(outfitId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(outfitId);
    }
    
    // Save to localStorage
    localStorage.setItem('outfitFavorites', JSON.stringify(favorites));
    
    // Re-render current view
    renderOutfits(currentCategory);
}

// Start the app
init();
