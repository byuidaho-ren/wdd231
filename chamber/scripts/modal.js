
     // Set timestamp field to current datetime in ISO format
    document.getElementById('join-pg-timestamp').value = new Date().toISOString();

    // Load modal data from JSON and dynamically create cards and modals
    async function loadModals() {
      try {
        const response = await fetch('./data/modal.json');
        if (!response.ok) throw new Error('Failed to load modal JSON');

        const modalsData = await response.json();

        const cardsContainer = document.getElementById('join-pg-cards');
        const modalsContainer = document.getElementById('modals-container');

        modalsData.forEach(modal => {
          // Create card
          const card = document.createElement('article');
          card.className = 'card-join';

          const h3 = document.createElement('h3');
          // Extract membership level name from modal title by removing ' Benefits'
          h3.textContent = modal.title.replace(' Benefits', '');
          card.appendChild(h3);

          const link = document.createElement('a');
          link.href = '#';
          link.className = 'link-join';
          link.setAttribute('data-modal', modal.id);
          link.setAttribute('aria-haspopup', 'dialog');
          link.setAttribute('aria-controls', modal.id);
          link.textContent = 'More info';
          card.appendChild(link);

          cardsContainer.appendChild(card);

          // Create modal
          const modalDiv = document.createElement('div');
          modalDiv.id = modal.id;
          modalDiv.className = 'modal-join';
          modalDiv.setAttribute('role', 'dialog');
          modalDiv.setAttribute('aria-modal', 'true');
          modalDiv.setAttribute('aria-labelledby', modal.id + 'Title');
          modalDiv.tabIndex = -1;

          const modalContent = document.createElement('div');
          modalContent.className = 'modal-content-join';

          // Close button
          const closeBtn = document.createElement('button');
          closeBtn.className = 'modal-close-join';
          closeBtn.setAttribute('aria-label', `Close ${h3.textContent} Info`);
          closeBtn.innerHTML = '&times;';
          modalContent.appendChild(closeBtn);

          // Title
          const titleEl = document.createElement('h2');
          titleEl.id = modal.id + 'Title';
          titleEl.textContent = modal.title;
          modalContent.appendChild(titleEl);

          // Content (description or list)
          if (modal.description) {
            const p = document.createElement('p');
            p.textContent = modal.description;
            modalContent.appendChild(p);
          } else if (modal.list && Array.isArray(modal.list)) {
            const ul = document.createElement('ul');
            modal.list.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              ul.appendChild(li);
            });
            modalContent.appendChild(ul);
          }

          modalDiv.appendChild(modalContent);
          modalsContainer.appendChild(modalDiv);
        });

        // Attach event listeners after creation
        attachModalEvents();
      } catch (error) {
        console.error('Error loading modal data:', error);
      }
    }

    // Modal open/close functionality
    function attachModalEvents() {
      const modalLinks = document.querySelectorAll('a[data-modal]');
      const modals = document.querySelectorAll('.modal-join');

      modalLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const modalId = link.getAttribute('data-modal');
          const modal = document.getElementById(modalId);
          if (modal) {
            modal.classList.add('active');
            modal.focus();
          }
        });
      });

      modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close-join');
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('active');
        });

        // Close modal on click outside content
        modal.addEventListener('click', e => {
          if (e.target === modal) {
            modal.classList.remove('active');
          }
        });

        // Close modal on Escape key press
        modal.addEventListener('keydown', e => {
          if (e.key === 'Escape') {
            modal.classList.remove('active');
          }
        });
      });
    }

    // Start loading on page load
    window.addEventListener('DOMContentLoaded', loadModals);