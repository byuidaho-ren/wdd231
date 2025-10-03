// ---------- Display Visit Message to User ----------
function discoveryDisplayVisitMessage() {
  const visitMsg = document.getElementById("discovery_visitMessage"); // Get the message element
  const lastVisit = localStorage.getItem("discovery_lastVisit");      // Get last visit timestamp from localStorage
  const now = Date.now();                                             // Current time in milliseconds

  if (!lastVisit) {
    // First-time visitor
    visitMsg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msPerDay = 86_400_000; // 1000 ms * 60 sec * 60 min * 24 hrs
    const days = Math.floor((now - Number(lastVisit)) / msPerDay); // Days since last visit

    if (days < 1) {
      visitMsg.textContent = "Back so soon! Awesome!"; // Same-day return
    } else {
      visitMsg.textContent = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`; // Show days passed
    }
  }

  localStorage.setItem("discovery_lastVisit", now); // Save current visit time
}


// ---------- Build Discovery Cards from JSON ----------
async function discoveryBuildCards() {
  const container = document.getElementById("discovery_cardsContainer"); // Get container to hold cards

  try {
    const res = await fetch('./data/discovery.json'); // Fetch data from JSON file
    const discoveryData = await res.json();           // Parse JSON to JavaScript object/array

    discoveryData.forEach(item => {
      const card = document.createElement("section"); // Create a card section
      card.className = "discovery-card";              // Add class for styling

      // Use template literals to insert data into HTML structure
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img 
            src="./images/${item.image}" 
            alt="${item.name}" 
            loading="lazy" 
            width="300" 
            height="200" 
            onerror="this.onerror=null; this.src='./images/missing-photo.webp';">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card); // Add card to the container
    });

  } catch (error) {
    // Handle errors (e.g. file not found or malformed JSON)
    console.error("Error loading discovery data:", error);
    container.innerHTML = `<p class="error">Failed to load discovery cards.</p>`;
  }
}


// ---------- Initialize Functions on Page Load ----------
document.addEventListener("DOMContentLoaded", () => {
  discoveryDisplayVisitMessage(); // Show welcome or return message
  discoveryBuildCards();          // Load and display discovery cards
});
