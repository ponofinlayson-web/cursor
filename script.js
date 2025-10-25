class HomepageManager {
    constructor() {
        this.cards = this.loadCards();
        this.currentEditingCard = null;
        this.pendingDeletion = null;
        this.currentLinks = [];
        this.draggedElement = null;
        this.themes = this.defineThemes();
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.initializeSearch();
        this.loadThemeStyles();
        this.renderCards();
        this.bindEvents();
        this.bindGlobalEvents();
    }

    loadCards() {
        const saved = localStorage.getItem('homepage-cards');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Pre-populated cards with sample data
        return [
            {
                id: 'work',
                title: 'Work',
                links: [
                    { name: 'Gmail', url: 'https://gmail.com', icon: 'fas fa-envelope' },
                    { name: 'Google Drive', url: 'https://drive.google.com', icon: 'fas fa-cloud' },
                    { name: 'Slack', url: 'https://slack.com', icon: 'fab fa-slack' },
                    { name: 'Zoom', url: 'https://zoom.us', icon: 'fas fa-video' },
                    { name: 'Trello', url: 'https://trello.com', icon: 'fab fa-trello' }
                ]
            },
            {
                id: 'social',
                title: 'Social',
                links: [
                    { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
                    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin' },
                    { name: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram' },
                    { name: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook' },
                    { name: 'Discord', url: 'https://discord.com', icon: 'fab fa-discord' }
                ]
            },
            {
                id: 'development',
                title: 'Development',
                links: [
                    { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
                    { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'fab fa-stack-overflow' },
                    { name: 'MDN', url: 'https://developer.mozilla.org', icon: 'fas fa-code' },
                    { name: 'VS Code', url: 'https://code.visualstudio.com', icon: 'fas fa-code' },
                    { name: 'Codepen', url: 'https://codepen.io', icon: 'fab fa-codepen' }
                ]
            },
            {
                id: 'entertainment',
                title: 'Entertainment',
                links: [
                    { name: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
                    { name: 'Netflix', url: 'https://netflix.com', icon: 'fas fa-film' },
                    { name: 'Spotify', url: 'https://spotify.com', icon: 'fab fa-spotify' },
                    { name: 'Twitch', url: 'https://twitch.tv', icon: 'fab fa-twitch' },
                    { name: 'Reddit', url: 'https://reddit.com', icon: 'fab fa-reddit' }
                ]
            },
            {
                id: 'news',
                title: 'News',
                links: [
                    { name: 'BBC News', url: 'https://bbc.com/news', icon: 'fas fa-newspaper' },
                    { name: 'CNN', url: 'https://cnn.com', icon: 'fas fa-globe' },
                    { name: 'TechCrunch', url: 'https://techcrunch.com', icon: 'fas fa-laptop' },
                    { name: 'Hacker News', url: 'https://news.ycombinator.com', icon: 'fas fa-hacker-news' }
                ]
            },
            {
                id: 'shopping',
                title: 'Shopping',
                links: [
                    { name: 'Amazon', url: 'https://amazon.com', icon: 'fab fa-amazon' },
                    { name: 'eBay', url: 'https://ebay.com', icon: 'fab fa-ebay' },
                    { name: 'Etsy', url: 'https://etsy.com', icon: 'fab fa-etsy' },
                    { name: 'Target', url: 'https://target.com', icon: 'fas fa-shopping-cart' }
                ]
            }
        ];
    }

    saveCards() {
        localStorage.setItem('homepage-cards', JSON.stringify(this.cards));
    }

    // Search functionality
    initializeSearch() {
        const searchInput = document.getElementById('googleSearchInput');
        const searchForm = document.getElementById('googleSearchForm');
        
        // Focus search on page load
        searchInput.focus();
        
        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });
        
        // Handle search button click
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch();
        });
    }
    
    performSearch() {
        const searchInput = document.getElementById('googleSearchInput');
        const query = searchInput.value.trim();
        
        if (query) {
            // Open Google search in new tab
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            searchInput.value = '';
        }
    }

    editLink(cardId, linkIndex) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card || !card.links[linkIndex]) return;

        const link = card.links[linkIndex];
        
        // Create edit form modal
        this.showEditLinkModal(cardId, linkIndex, link);
    }

    showEditLinkModal(cardId, linkIndex, link) {
        // Create modal HTML
        const modalHTML = `
            <div class="modal" id="editLinkModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Link</h3>
                        <button class="modal-close" id="editLinkModalClose">&times;</button>
                    </div>
                                         <div class="modal-body">
                         <div class="form-group">
                             <label for="editLinkName">Link Name:</label>
                             <input type="text" id="editLinkName" value="${link.name}" placeholder="Enter link name">
                         </div>
                         <div class="form-group">
                             <label for="editLinkUrl">URL:</label>
                             <input type="url" id="editLinkUrl" value="${link.url}" placeholder="https://example.com">
                         </div>
                         <div class="form-group">
                             <label for="editLinkCard">Group:</label>
                             <select id="editLinkCard" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: inherit;">
                                 ${this.cards.map(c => `<option value="${c.id}" ${c.id === cardId ? 'selected' : ''}>${c.title}</option>`).join('')}
                             </select>
                         </div>
                     </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" id="editLinkDelete">Delete</button>
                        <button class="btn btn-secondary" id="editLinkCancel">Cancel</button>
                        <button class="btn btn-primary" id="editLinkSave">Save</button>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('editLinkModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get modal elements
        const modal = document.getElementById('editLinkModal');
        
        // Show the modal
        modal.classList.add('show');
        const nameInput = document.getElementById('editLinkName');
        const urlInput = document.getElementById('editLinkUrl');
        const cardSelect = document.getElementById('editLinkCard');
        const saveBtn = document.getElementById('editLinkSave');
        const cancelBtn = document.getElementById('editLinkCancel');
        const deleteBtn = document.getElementById('editLinkDelete');
        const closeBtn = document.getElementById('editLinkModalClose');

        // Focus on name input
        nameInput.focus();
        nameInput.select();

        // Handle form submission
        const handleSave = () => {
            const newName = nameInput.value.trim();
            const newUrl = urlInput.value.trim();
            const newCardId = cardSelect.value;

            if (!newName) {
                alert('Please enter a link name');
                nameInput.focus();
                return;
            }

            if (!newUrl) {
                alert('Please enter a URL');
                urlInput.focus();
                return;
            }

            // Validate URL
            try {
                new URL(newUrl);
            } catch {
                alert('Please enter a valid URL (e.g., https://example.com)');
                urlInput.focus();
                return;
            }

            // Find the current card and link
            const card = this.cards.find(c => c.id === cardId);
            if (card && card.links[linkIndex]) {
                const updatedLink = {
                    name: newName,
                    url: newUrl,
                    icon: this.getIconForUrl(newUrl)
                };

                // If moving to a different group
                if (newCardId !== cardId) {
                    // Remove from current card
                    card.links.splice(linkIndex, 1);
                    
                    // Add to new card
                    const newCard = this.cards.find(c => c.id === newCardId);
                    if (newCard) {
                        newCard.links.push(updatedLink);
                    }
                } else {
                    // Update in place
                    card.links[linkIndex] = updatedLink;
                }

                this.saveCards();
                this.renderCards();
            }

            // Close modal
            this.hideEditLinkModal();
        };

        // Handle cancel
        const handleCancel = () => {
            this.hideEditLinkModal();
        };

        // Handle delete
        const handleDelete = () => {
            if (confirm('Are you sure you want to delete this link?')) {
                const card = this.cards.find(c => c.id === cardId);
                if (card && card.links[linkIndex]) {
                    card.links.splice(linkIndex, 1);
                    this.saveCards();
                    this.renderCards();
                    console.log('Link deleted successfully');
                }
                this.hideEditLinkModal();
            }
        };

        // Event listeners
        saveBtn.addEventListener('click', handleSave);
        cancelBtn.addEventListener('click', handleCancel);
        deleteBtn.addEventListener('click', handleDelete);
        closeBtn.addEventListener('click', handleCancel);

        // Handle Enter key in inputs
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                urlInput.focus();
                urlInput.select();
            }
        });

        urlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSave();
            }
        });

        // Handle Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                handleCancel();
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Store escape handler for cleanup
        modal.dataset.escapeHandler = 'true';
        modal._escapeHandler = handleEscape;

        // Handle backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                handleCancel();
            }
        });
    }

    hideEditLinkModal() {
        const modal = document.getElementById('editLinkModal');
        if (modal) {
            // Remove escape handler
            if (modal._escapeHandler) {
                document.removeEventListener('keydown', modal._escapeHandler);
            }
            // Hide modal first
            modal.classList.remove('show');
            // Remove from DOM after a short delay to allow animation
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 150);
        }
    }

    sortCards() {
        this.cards.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderCards() {
        const grid = document.getElementById('cardsGrid');
        this.sortCards();
        
        if (this.cards.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-plus-circle"></i>
                    <h3>No cards yet</h3>
                    <p>Click "Add Card" to create your first card</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.cards.map(card => this.createCardHTML(card)).join('');
        this.bindCardEvents();
    }

    createCardHTML(card) {
        const linksHTML = card.links.map((link, index) => `
            <div class="link-item hvr-float" 
                 data-card-id="${card.id}" 
                 data-link-index="${index}" 
                 data-aos="fade-up" 
                 data-aos-delay="${index * 100}" 
                 title="Ctrl + click to open - stay">
                <a href="${link.url}" target="_blank" class="link-main">
                    <i class="${link.icon}"></i>
                    <span>${link.name}</span>
                </a>
                <button class="link-edit-btn" data-card-id="${card.id}" data-link-index="${index}" title="Edit link">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        `).join('');

        return `
            <div class="card hvr-float-shadow animate__animated animate__fadeInUp" data-card-id="${card.id}" data-aos="zoom-in" data-aos-delay="${Math.random() * 200}">
                <div class="card-header">
                    <input type="text" class="card-title" value="${card.title}" data-card-id="${card.id}">
                    <div class="card-actions">
                        <button class="action-btn add-link-btn hvr-pulse" data-card-id="${card.id}" title="Add Link">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="action-btn edit-btn hvr-pulse" data-card-id="${card.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn hvr-pulse" data-card-id="${card.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="card-links">
                    ${linksHTML}
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Add card button
        document.getElementById('addCardBtn').addEventListener('click', () => {
            this.showAddCardModal();
        });

        // Modal events
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.hideAddCardModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideAddCardModal();
        });

        document.getElementById('saveCardBtn').addEventListener('click', () => {
            this.saveNewCard();
        });

        // Close modal on backdrop click
        document.getElementById('addCardModal').addEventListener('click', (e) => {
            if (e.target.id === 'addCardModal') {
                this.hideAddCardModal();
            }
        });

        // Close modal on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.hideAddCardModal();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        
        // Store escape handler for cleanup
        const modal = document.getElementById('addCardModal');
        if (modal) {
            modal._escapeHandler = handleEscape;
        }

        // Search functionality is handled in initializeSearch()

        // Confirmation dialog events
        document.getElementById('confirmationCancel').addEventListener('click', () => {
            this.hideConfirmationDialog();
        });

        document.getElementById('confirmationDelete').addEventListener('click', () => {
            this.confirmDeletion();
        });

        // Close confirmation dialog on backdrop click
        document.getElementById('confirmationDialog').addEventListener('click', (e) => {
            if (e.target.id === 'confirmationDialog') {
                this.hideConfirmationDialog();
            }
        });

        // Enhanced link management events
        document.getElementById('addLinkBtn').addEventListener('click', () => {
            this.addLinkEntry();
        });

        document.getElementById('bulkImportBtn').addEventListener('click', () => {
            this.toggleBulkImport();
        });

        document.getElementById('cancelBulkImport').addEventListener('click', () => {
            this.toggleBulkImport();
        });

        document.getElementById('processBulkImport').addEventListener('click', () => {
            this.processBulkImport();
        });

        // Theme selector button
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.showThemeModal();
        });

        // Theme modal close button
        document.getElementById('closeThemeModal').addEventListener('click', () => {
            this.hideThemeModal();
        });

        // Close theme modal on backdrop click
        document.getElementById('themeModal').addEventListener('click', (e) => {
            if (e.target.id === 'themeModal') {
                this.hideThemeModal();
            }
        });
    }

    bindGlobalEvents() {
        // Edit link button (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.link-edit-btn')) {
                e.stopPropagation();
                const cardId = e.target.closest('.link-edit-btn').dataset.cardId;
                const linkIndex = parseInt(e.target.closest('.link-edit-btn').dataset.linkIndex);
                this.editLink(cardId, linkIndex);
            }
        });

        // Add link button (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-link-btn')) {
                e.stopPropagation();
                const cardId = e.target.closest('.add-link-btn').dataset.cardId;
                console.log('Add link button clicked for card:', cardId);
                this.showAddLinkDialog(cardId);
            }
        });

                 // Drag and drop functionality removed
    }

    setupDragAndDrop() {
        // Drag start
        document.addEventListener('dragstart', (e) => {
            if (e.target.closest('.draggable')) {
                const linkItem = e.target.closest('.draggable');
                const cardId = linkItem.dataset.cardId;
                const linkIndex = parseInt(linkItem.dataset.linkIndex);
                
                // Set allowed effects
                e.dataTransfer.effectAllowed = 'move';
                
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    cardId: cardId,
                    linkIndex: linkIndex
                }));
                
                linkItem.classList.add('dragging');
                this.draggedElement = linkItem;
                
                console.log('Drag started:', { cardId, linkIndex });
            }
        });

        // Drag end
        document.addEventListener('dragend', (e) => {
            if (e.target.closest('.draggable')) {
                const linkItem = e.target.closest('.draggable');
                linkItem.classList.remove('dragging');
                this.draggedElement = null;
                
                // Remove all drop indicators
                document.querySelectorAll('.drop-target').forEach(target => {
                    target.classList.remove('drop-target');
                });
                
                console.log('Drag ended');
            }
        });

        // Drag over
        document.addEventListener('dragover', (e) => {
            // Always allow drop and set move effect
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = 'move';
                e.dataTransfer.effectAllowed = 'move';
            }
            
            const card = e.target.closest('.card');
            if (card && this.draggedElement) {
                const cardId = card.dataset.cardId;
                const draggedCardId = this.draggedElement.dataset.cardId;
                
                // Add drop indicator to card
                if (cardId !== draggedCardId) {
                    card.classList.add('drop-target');
                }
            }
        });

        // Drag leave
        document.addEventListener('dragleave', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                card.classList.remove('drop-target');
            }
        });

        // Drop
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            
            const card = e.target.closest('.card');
            if (card && this.draggedElement) {
                const targetCardId = card.dataset.cardId;
                const draggedCardId = this.draggedElement.dataset.cardId;
                
                // Remove drop indicator
                card.classList.remove('drop-target');
                
                try {
                    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                    const sourceCardId = dragData.cardId;
                    const sourceLinkIndex = dragData.linkIndex;
                    
                    if (sourceCardId === targetCardId) {
                        // Same card - reorder
                        this.reorderLinkInCard(sourceCardId, sourceLinkIndex, targetCardId);
                    } else {
                        // Different card - move link
                        this.moveLinkBetweenCards(sourceCardId, sourceLinkIndex, targetCardId);
                    }
                } catch (error) {
                    console.error('Error handling drop:', error);
                }
            }
        });
    }

    bindCardEvents() {
        // Card title editing
        document.querySelectorAll('.card-title').forEach(input => {
            input.addEventListener('blur', (e) => {
                this.updateCardTitle(e.target.dataset.cardId, e.target.value);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.target.blur();
                }
            });
        });

        // Edit card button
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.editCard(e.target.closest('.edit-btn').dataset.cardId);
            });
        });

        // Delete card button
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showDeleteCardConfirmation(e.target.closest('.delete-btn').dataset.cardId);
            });
        });

        // Delete link functionality moved to edit modal

        // Card click to add link - moved to global events to prevent duplication
    }

    showAddCardModal() {
        this.currentLinks = [];
        document.getElementById('addCardModal').classList.add('show');
        document.getElementById('cardTitle').focus();
        this.renderLinksContainer();
    }

    hideAddCardModal() {
        const modal = document.getElementById('addCardModal');
        if (modal) {
            // Remove escape handler
            if (modal._escapeHandler) {
                document.removeEventListener('keydown', modal._escapeHandler);
            }
            modal.classList.remove('show');
        }
        
        document.getElementById('cardTitle').value = '';
        document.getElementById('linksContainer').innerHTML = '';
        document.getElementById('bulkImportSection').style.display = 'none';
        document.getElementById('bulkLinks').value = '';
        this.currentLinks = [];
    }

    showAddLinkDialog(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card) {
            console.error('Card not found:', cardId);
            return;
        }

        console.log('Showing add link dialog for card:', card.title);
        
        // Create add link form modal (same as edit link modal)
        this.showAddLinkModal(cardId, card);
    }

    showAddLinkModal(cardId, card) {
        // Create modal HTML (same structure as edit link modal)
        const modalHTML = `
            <div class="modal" id="addLinkModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add Link to "${card.title}"</h3>
                        <button class="modal-close" id="addLinkModalClose">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="addLinkName">Link Name:</label>
                            <input type="text" id="addLinkName" placeholder="Enter link name">
                        </div>
                        <div class="form-group">
                            <label for="addLinkUrl">URL:</label>
                            <input type="url" id="addLinkUrl" placeholder="https://example.com">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="addLinkCancel">Cancel</button>
                        <button class="btn btn-primary" id="addLinkSave">Add Link</button>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('addLinkModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get modal elements
        const modal = document.getElementById('addLinkModal');
        const nameInput = document.getElementById('addLinkName');
        const urlInput = document.getElementById('addLinkUrl');
        const saveBtn = document.getElementById('addLinkSave');
        const cancelBtn = document.getElementById('addLinkCancel');
        const closeBtn = document.getElementById('addLinkModalClose');

        // Focus on name input
        nameInput.focus();

        // Handle form submission
        const handleSave = () => {
            const newName = nameInput.value.trim();
            const newUrl = urlInput.value.trim();

            if (!newName) {
                alert('Please enter a link name');
                nameInput.focus();
                return;
            }

            if (!newUrl) {
                alert('Please enter a URL');
                urlInput.focus();
                return;
            }

            // Validate URL
            try {
                new URL(newUrl);
            } catch {
                alert('Please enter a valid URL (e.g., https://example.com)');
                urlInput.focus();
                return;
            }

            // Add the link to the card
            const newLink = {
                name: newName,
                url: newUrl,
                icon: this.getIconForUrl(newUrl)
            };

            const card = this.cards.find(c => c.id === cardId);
            if (card) {
                card.links.push(newLink);
                this.saveCards();
                this.renderCards();
                console.log('Link added successfully:', newLink);
            }

            // Close modal
            this.hideAddLinkModal();
        };

        // Handle cancel
        const handleCancel = () => {
            this.hideAddLinkModal();
        };

        // Event listeners
        saveBtn.addEventListener('click', handleSave);
        cancelBtn.addEventListener('click', handleCancel);
        closeBtn.addEventListener('click', handleCancel);

        // Handle Enter key in inputs
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                urlInput.focus();
                urlInput.select();
            }
        });

        urlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSave();
            }
        });

        // Handle Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                handleCancel();
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Store escape handler for cleanup
        modal.dataset.escapeHandler = 'true';
        modal._escapeHandler = handleEscape;

        // Handle backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                handleCancel();
            }
        });

        // Show the modal
        modal.classList.add('show');
    }

    hideAddLinkModal() {
        const modal = document.getElementById('addLinkModal');
        if (modal) {
            // Remove escape handler
            if (modal._escapeHandler) {
                document.removeEventListener('keydown', modal._escapeHandler);
            }
            // Hide modal first
            modal.classList.remove('show');
            // Remove from DOM after a short delay to allow animation
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 150);
        }
    }

    reorderLinkInCard(cardId, fromIndex, toCardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card || fromIndex < 0 || fromIndex >= card.links.length) return;

        // For same card reordering, we'll move to the end for now
        // In a more advanced implementation, you could detect drop position
        const link = card.links[fromIndex];
        card.links.splice(fromIndex, 1);
        card.links.push(link);

        this.saveCards();
        this.renderCards();
        
        console.log('Link reordered in card:', cardId);
    }

    moveLinkBetweenCards(sourceCardId, sourceLinkIndex, targetCardId) {
        const sourceCard = this.cards.find(c => c.id === sourceCardId);
        const targetCard = this.cards.find(c => c.id === targetCardId);
        
        if (!sourceCard || !targetCard || sourceLinkIndex < 0 || sourceLinkIndex >= sourceCard.links.length) {
            console.error('Invalid move operation');
            return;
        }

        // Remove link from source card
        const link = sourceCard.links.splice(sourceLinkIndex, 1)[0];
        
        // Add link to target card
        targetCard.links.push(link);

        this.saveCards();
        this.renderCards();
        
        console.log('Link moved from', sourceCardId, 'to', targetCardId);
    }

    renderLinksContainer() {
        const container = document.getElementById('linksContainer');
        
        if (this.currentLinks.length === 0) {
            container.innerHTML = '<div class="empty-links">No links added yet. Click "Add Link" to get started.</div>';
            return;
        }

        container.innerHTML = this.currentLinks.map((link, index) => `
            <div class="link-entry" data-index="${index}">
                <div class="drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                <div class="link-preview">
                    <div class="link-favicon">
                        <i class="${link.icon}"></i>
                    </div>
                    <div class="link-inputs">
                        <input type="text" class="link-name-input" value="${link.name}" placeholder="Link name">
                        <input type="url" class="link-url-input" value="${link.url}" placeholder="https://example.com">
                    </div>
                </div>
                <div class="link-actions">
                    <button class="link-action-btn drag" title="Drag to reorder">
                        <i class="fas fa-grip-vertical"></i>
                    </button>
                    <button class="link-action-btn delete" title="Delete link">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        this.bindLinkEntryEvents();
    }

    bindLinkEntryEvents() {
        // Link input changes
        document.querySelectorAll('.link-name-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.closest('.link-entry').dataset.index);
                this.currentLinks[index].name = e.target.value;
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const urlInput = e.target.closest('.link-entry').querySelector('.link-url-input');
                    if (urlInput) {
                        urlInput.focus();
                        urlInput.select();
                    }
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.target.blur();
                }
            });
        });

        document.querySelectorAll('.link-url-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.closest('.link-entry').dataset.index);
                const url = e.target.value;
                this.currentLinks[index].url = url;
                this.currentLinks[index].icon = this.getIconForUrl(url);
                
                // Update favicon
                const favicon = e.target.closest('.link-entry').querySelector('.link-favicon i');
                favicon.className = this.getIconForUrl(url);
                
                // Validate URL
                this.validateLinkEntry(e.target.closest('.link-entry'), url);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.target.blur();
                }
            });
        });

        // Delete link buttons
        document.querySelectorAll('.link-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.link-entry').dataset.index);
                this.removeLinkEntry(index);
            });
        });

        // Drag and drop
        this.setupDragAndDrop();
    }

    addLinkEntry() {
        this.currentLinks.push({
            name: '',
            url: '',
            icon: 'fas fa-external-link-alt'
        });
        this.renderLinksContainer();
        
        // Focus the name input of the new entry
        const newEntry = document.querySelector('.link-entry:last-child .link-name-input');
        if (newEntry) {
            newEntry.focus();
        }
    }

    removeLinkEntry(index) {
        this.currentLinks.splice(index, 1);
        this.renderLinksContainer();
    }

    validateLinkEntry(entry, url) {
        const isValid = this.isValidUrl(url);
        entry.classList.remove('valid', 'invalid');
        if (url.trim()) {
            entry.classList.add(isValid ? 'valid' : 'invalid');
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    setupDragAndDrop() {
        const container = document.getElementById('linksContainer');
        const entries = container.querySelectorAll('.link-entry');

        entries.forEach(entry => {
            entry.draggable = true;
            
            entry.addEventListener('dragstart', (e) => {
                this.draggedElement = entry;
                entry.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });

            entry.addEventListener('dragend', () => {
                entry.classList.remove('dragging');
                this.draggedElement = null;
            });

            entry.addEventListener('dragover', (e) => {
                e.preventDefault();
                entry.classList.add('drag-over');
            });

            entry.addEventListener('dragleave', () => {
                entry.classList.remove('drag-over');
            });

            entry.addEventListener('drop', (e) => {
                e.preventDefault();
                entry.classList.remove('drag-over');
                
                if (this.draggedElement && this.draggedElement !== entry) {
                    const draggedIndex = parseInt(this.draggedElement.dataset.index);
                    const targetIndex = parseInt(entry.dataset.index);
                    
                    // Reorder the array
                    const draggedLink = this.currentLinks.splice(draggedIndex, 1)[0];
                    this.currentLinks.splice(targetIndex, 0, draggedLink);
                    
                    this.renderLinksContainer();
                }
            });
        });
    }

    toggleBulkImport() {
        const section = document.getElementById('bulkImportSection');
        const isVisible = section.style.display !== 'none';
        section.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            document.getElementById('bulkLinks').focus();
        }
    }

    processBulkImport() {
        const text = document.getElementById('bulkLinks').value.trim();
        if (!text) return;

        const lines = text.split('\n').filter(line => line.trim());
        const newLinks = lines.map(line => {
            const trimmed = line.trim();
            const urlMatch = trimmed.match(/https?:\/\/[^\s]+/);
            
            if (urlMatch) {
                const url = urlMatch[0];
                const name = trimmed.replace(url, '').trim() || this.extractDomainName(url);
                return {
                    name,
                    url,
                    icon: this.getIconForUrl(url)
                };
            } else {
                return {
                    name: this.extractDomainName(trimmed),
                    url: trimmed.startsWith('http') ? trimmed : `https://${trimmed}`,
                    icon: this.getIconForUrl(trimmed)
                };
            }
        }).filter(link => link.url);

        this.currentLinks = [...this.currentLinks, ...newLinks];
        this.renderLinksContainer();
        this.toggleBulkImport();
    }

    saveNewCard() {
        const title = document.getElementById('cardTitle').value.trim();
        
        if (!title) {
            alert('Please enter a card title');
            return;
        }

        const validLinks = this.currentLinks.filter(link => 
            link.name.trim() && link.url.trim() && this.isValidUrl(link.url)
        );

        const newCard = {
            id: Date.now().toString(),
            title,
            links: validLinks
        };

        this.cards.push(newCard);
        this.saveCards();
        this.renderCards();
        this.hideAddCardModal();
    }

    updateCardTitle(cardId, newTitle) {
        const card = this.cards.find(c => c.id === cardId);
        if (card && newTitle.trim()) {
            card.title = newTitle.trim();
            this.saveCards();
            this.renderCards();
        }
    }

    editCard(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card) return;

        // For now, use the simple prompt method
        // In a full implementation, you'd want a more sophisticated edit modal
        const newLinks = prompt('Enter links (one per line, format: Name https://url.com):', 
            card.links.map(link => `${link.name} ${link.url}`).join('\n'));

        if (newLinks !== null) {
            const links = newLinks.split('\n').map(line => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                
                const urlMatch = trimmed.match(/https?:\/\/[^\s]+/);
                if (urlMatch) {
                    const url = urlMatch[0];
                    const name = trimmed.replace(url, '').trim() || this.extractDomainName(url);
                    return {
                        name,
                        url,
                        icon: this.getIconForUrl(url)
                    };
                } else {
                    return {
                        name: this.extractDomainName(trimmed),
                        url: trimmed.startsWith('http') ? trimmed : `https://${trimmed}`,
                        icon: this.getIconForUrl(trimmed)
                    };
                }
            }).filter(Boolean);

            card.links = links;
            this.saveCards();
            this.renderCards();
        }
    }

    showDeleteCardConfirmation(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card) return;

        this.pendingDeletion = { type: 'card', cardId };
        document.getElementById('confirmationTitle').textContent = 'Delete Card';
        document.getElementById('confirmationMessage').textContent = 
            `Are you sure you want to delete the "${card.title}" card? This will remove all ${card.links.length} links in this card.`;
        document.getElementById('confirmationDialog').classList.add('show');
    }

    showDeleteLinkConfirmation(cardId, linkIndex) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card || !card.links[linkIndex]) return;

        const link = card.links[linkIndex];
        this.pendingDeletion = { type: 'link', cardId, linkIndex };
        document.getElementById('confirmationTitle').textContent = 'Delete Link';
        document.getElementById('confirmationMessage').textContent = 
            `Are you sure you want to delete the "${link.name}" link from the "${card.title}" card?`;
        document.getElementById('confirmationDialog').classList.add('show');
    }

    hideConfirmationDialog() {
        document.getElementById('confirmationDialog').classList.remove('show');
        this.pendingDeletion = null;
    }

    confirmDeletion() {
        if (!this.pendingDeletion) return;

        if (this.pendingDeletion.type === 'card') {
            this.deleteCard(this.pendingDeletion.cardId);
        } else if (this.pendingDeletion.type === 'link') {
            this.deleteLink(this.pendingDeletion.cardId, this.pendingDeletion.linkIndex);
        }

        this.hideConfirmationDialog();
    }

    deleteCard(cardId) {
        this.cards = this.cards.filter(c => c.id !== cardId);
        this.saveCards();
        this.renderCards();
    }

    deleteLink(cardId, linkIndex) {
        const card = this.cards.find(c => c.id === cardId);
        if (card && card.links[linkIndex]) {
            card.links.splice(linkIndex, 1);
            this.saveCards();
            this.renderCards();
        }
    }

    extractDomainName(url) {
        try {
            const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
            return domain.replace('www.', '').split('.')[0];
        } catch {
            return url;
        }
    }

    getIconForUrl(url) {
        const domain = url.toLowerCase();
        
        if (domain.includes('github.com')) return 'fab fa-github';
        if (domain.includes('youtube.com')) return 'fab fa-youtube';
        if (domain.includes('twitter.com')) return 'fab fa-twitter';
        if (domain.includes('linkedin.com')) return 'fab fa-linkedin';
        if (domain.includes('facebook.com')) return 'fab fa-facebook';
        if (domain.includes('instagram.com')) return 'fab fa-instagram';
        if (domain.includes('reddit.com')) return 'fab fa-reddit';
        if (domain.includes('discord.com')) return 'fab fa-discord';
        if (domain.includes('slack.com')) return 'fab fa-slack';
        if (domain.includes('spotify.com')) return 'fab fa-spotify';
        if (domain.includes('twitch.tv')) return 'fab fa-twitch';
        if (domain.includes('amazon.com')) return 'fab fa-amazon';
        if (domain.includes('ebay.com')) return 'fab fa-ebay';
        if (domain.includes('etsy.com')) return 'fab fa-etsy';
        if (domain.includes('trello.com')) return 'fab fa-trello';
        if (domain.includes('codepen.io')) return 'fab fa-codepen';
        if (domain.includes('stackoverflow.com')) return 'fab fa-stack-overflow';
        if (domain.includes('gmail.com')) return 'fas fa-envelope';
        if (domain.includes('drive.google.com')) return 'fas fa-cloud';
        if (domain.includes('zoom.us')) return 'fas fa-video';
        if (domain.includes('netflix.com')) return 'fas fa-film';
        if (domain.includes('bbc.com')) return 'fas fa-newspaper';
        if (domain.includes('cnn.com')) return 'fas fa-globe';
        if (domain.includes('techcrunch.com')) return 'fas fa-laptop';
        if (domain.includes('news.ycombinator.com')) return 'fas fa-hacker-news';
        if (domain.includes('target.com')) return 'fas fa-shopping-cart';
        if (domain.includes('developer.mozilla.org')) return 'fas fa-code';
        if (domain.includes('code.visualstudio.com')) return 'fas fa-code';
        
        return 'fas fa-external-link-alt';
    }

    // Theme Management Methods
    defineThemes() {
        return [
            {
                id: 'default',
                name: 'Default',
                description: 'Original dark blue gradient theme',
                preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 60%, #475569 100%)',
                css: ''
            },
            {
                id: 'minimal',
                name: 'Minimal Light',
                description: 'Clean and minimal light theme',
                preview: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
                css: 'themes/minimal-light.css'
            },
            {
                id: 'ocean',
                name: 'Ocean Blue',
                description: 'Fresh ocean-inspired theme',
                preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                css: 'themes/ocean-blue.css'
            },
            {
                id: 'sunset',
                name: 'Sunset',
                description: 'Warm sunset colors',
                preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #f5af19 100%)',
                css: 'themes/sunset.css'
            },
            {
                id: 'forest',
                name: 'Forest Green',
                description: 'Natural green tones',
                preview: 'linear-gradient(135deg, #134e5e 0%, #71b280 50%, #0f5132 100%)',
                css: 'themes/forest-green.css'
            },
            {
                id: 'modern-dark',
                name: 'Modern Dark',
                description: 'Contemporary dark theme',
                preview: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                css: 'themes/modern-dark.css'
            }
        ];
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('selected-theme');
        return savedTheme || 'default';
    }

    saveTheme(themeId) {
        localStorage.setItem('selected-theme', themeId);
        this.currentTheme = themeId;
    }

    loadThemeStyles() {
        const theme = this.themes.find(t => t.id === this.currentTheme);
        if (theme && theme.css) {
            const linkElement = document.getElementById('theme-css');
            if (linkElement) {
                linkElement.href = theme.css;
            }
        }
    }

    showThemeModal() {
        const modal = document.getElementById('themeModal');
        const grid = document.getElementById('themeGrid');
        
        // Clear existing theme cards
        grid.innerHTML = '';
        
        // Create theme cards
        this.themes.forEach(theme => {
            const card = document.createElement('div');
            card.className = `theme-card ${theme.id === this.currentTheme ? 'active' : ''}`;
            card.innerHTML = `
                <div class="theme-preview" style="background: ${theme.preview}"></div>
                <div class="theme-name">${theme.name}</div>
                <div class="theme-description">${theme.description}</div>
            `;
            card.addEventListener('click', () => this.selectTheme(theme.id));
            grid.appendChild(card);
        });
        
        modal.classList.add('show');
    }

    hideThemeModal() {
        document.getElementById('themeModal').classList.remove('show');
    }

    selectTheme(themeId) {
        this.saveTheme(themeId);
        this.loadThemeStyles();
        this.hideThemeModal();
        
        // Update active state in modal
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
        });
        event.target.closest('.theme-card')?.classList.add('active');
    }
}

// Initialize the homepage manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HomepageManager();
});