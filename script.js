class HomepageManager {
    constructor() {
        this.cards = this.loadCards();
        this.currentEditingCard = null;
        this.pendingDeletion = null;
        this.currentLinks = [];
        this.draggedElement = null;
        this.init();
    }

    init() {
        this.initializeSearch();
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
                    </div>
                    <div class="modal-footer">
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
        const saveBtn = document.getElementById('editLinkSave');
        const cancelBtn = document.getElementById('editLinkCancel');
        const closeBtn = document.getElementById('editLinkModalClose');

        // Focus on name input
        nameInput.focus();
        nameInput.select();

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

            // Update the link
            const card = this.cards.find(c => c.id === cardId);
            if (card && card.links[linkIndex]) {
                card.links[linkIndex] = {
                    name: newName,
                    url: newUrl,
                    icon: this.getIconForUrl(newUrl)
                };

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
            <div class="link-item hvr-float" data-card-id="${card.id}" data-link-index="${index}" data-aos="fade-up" data-aos-delay="${index * 100}" title="Ctrl + click to open - stay">
                <div class="link-content">
                    <a href="${link.url}" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; flex: 1; min-width: 0;">
                        <i class="${link.icon}"></i>
                        <span>${link.name}</span>
                    </a>
                </div>
                <div class="link-actions">
                    <button class="link-edit-btn" data-card-id="${card.id}" data-link-index="${index}" title="Edit link">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="link-delete-btn" data-card-id="${card.id}" data-link-index="${index}" title="Delete link">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
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

        // Delete link button (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.link-delete-btn')) {
                e.stopPropagation();
                const cardId = e.target.closest('.link-delete-btn').dataset.cardId;
                const linkIndex = parseInt(e.target.closest('.link-delete-btn').dataset.linkIndex);
                this.showDeleteLinkConfirmation(cardId, linkIndex);
            }
        });

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

        // Create a simple prompt dialog
        const linkName = prompt(`Add link to "${card.title}"\n\nEnter link name:`);
        if (!linkName || !linkName.trim()) {
            console.log('Link name cancelled or empty');
            return;
        }

        const linkUrl = prompt(`Enter URL for "${linkName}":`);
        if (!linkUrl || !linkUrl.trim()) {
            console.log('Link URL cancelled or empty');
            return;
        }

        // Validate URL
        try {
            new URL(linkUrl);
        } catch {
            alert('Please enter a valid URL (e.g., https://example.com)');
            console.log('Invalid URL entered:', linkUrl);
            return;
        }

        // Add the link to the card
        const newLink = {
            name: linkName.trim(),
            url: linkUrl.trim(),
            icon: this.getIconForUrl(linkUrl.trim())
        };

        card.links.push(newLink);
        this.saveCards();
        this.renderCards();
        
        console.log('Link added successfully:', newLink);
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
}

// Initialize the homepage manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HomepageManager();
});