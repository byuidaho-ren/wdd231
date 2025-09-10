// Directory Page Lists 
document.addEventListener('DOMContentLoaded', () => {

    const membersContainer = document.getElementById('members');
    const listBtn = document.getElementById('listBtn');
    const gridBtn = document.getElementById('gridBtn');
    const body = document.body;

    let allMembers = []; // Store fetched members

    // Fetch and render members
    async function fetchMembers() {
      try {
        const response = await fetch('./data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');

        const members = await response.json();
        allMembers = members;
        renderMembers(allMembers);
      } catch (error) {
        membersContainer.innerHTML = `<p>Error loading members: ${error.message}</p>`;
      }
    }

    // Render members function
    function renderMembers(members) {
      membersContainer.innerHTML = ''; // Clear

      if (members.length === 0) {
        membersContainer.innerHTML = `<p>No members found.</p>`;
        return;
      }

      members.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        card.innerHTML = `
          <img
            src="./images/${member.image}"
            alt="Logo of ${member.name}"
            class="member-image"
            loading="lazy"
            width="80"
            height="80"
            onerror="this.onerror=null; this.src='./images/missing-photo.webp'";
          />
          <div class="member-info">
            <h2>${member.name}</h2>
            <span class="badge member-level-${member.membershipLevel}">
              ${membershipLevelText(member.membershipLevel)}
            </span>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/[^\d]/g, '')}">${member.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          </div>
        `;
        membersContainer.appendChild(card);
      });
    }

    // Helper: membership level text
    function membershipLevelText(level) {
      switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Member';
      }
    }

    // Event Listeners for toggling view
    listBtn.addEventListener('click', () => {
      body.classList.remove('grid-view');
      body.classList.add('list-view');
    });

    gridBtn.addEventListener('click', () => {
      body.classList.remove('list-view');
      body.classList.add('grid-view');
    });

    // Search filter
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();

      const filtered = allMembers.filter(member => {
        return (
          member.name.toLowerCase().includes(term) ||
          member.description.toLowerCase().includes(term) ||
          member.address.toLowerCase().includes(term) ||
          member.email.toLowerCase().includes(term) ||
          member.website.toLowerCase().includes(term)
        );
      });

      renderMembers(filtered);
    });

    // Initial fetch
    fetchMembers();
  
});