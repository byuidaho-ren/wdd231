const eventsContainer = document.getElementById('event-module-events');
const loadMoreButton = document.getElementById('event-module-loadMore');

let allEvents = [];
let visibleCount = 0;
const batchSize = 3;

async function fetchEvents() {
  try {
    const response = await fetch('./data/events.json');
    allEvents = await response.json();
    renderEvents();
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

function renderEvents() {
  const nextEvents = allEvents.slice(visibleCount, visibleCount + batchSize);

  nextEvents.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-module-event-card';
    card.innerHTML = `
      <img onerror="this.onerror=null; this.src='./images/missing-photo.webp'" src="./images/${event.featuredImage}" alt="${event.title}" class="event-module-image" />
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.description}</p>
    `;
    eventsContainer.appendChild(card);
  });

  visibleCount += nextEvents.length;

  if (visibleCount >= allEvents.length) {
    loadMoreButton.style.display = 'none';
  }
}

loadMoreButton.addEventListener('click', renderEvents);

fetchEvents();
