// Wait for the entire DOM to be loaded before running this script
document.addEventListener('DOMContentLoaded', () => {

  // -------- Responsive Menu Toggle --------
  // Get the toggle button element by its ID
  const toggleButton = document.getElementById('menu-toggle');

  // Get the menu element by its ID
  const menu = document.getElementById('primary-menu');

  // Only proceed if both elements exist on the page
  if (toggleButton && menu) {
    // Add a click event listener to the toggle button
    toggleButton.addEventListener('click', () => {
      // Toggle a CSS class on the menu to show/hide it
      const isVisible = menu.classList.toggle('menu-visible');
      // Update the aria-expanded attribute for accessibility
      toggleButton.setAttribute('aria-expanded', isVisible);
    });
  }

  // -------- Set footer year and last modified date --------
  // Get the element that should display the current year
  const yearSpan = document.getElementById('current-year');
  // Get the element that should display the last modified date
  const lastModSpan = document.getElementById('last-modified');

  // Set the current year in the year span (e.g., 2025)
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  // Set the last modified date of the document
  if (lastModSpan) lastModSpan.textContent = document.lastModified;

});

// -------- Filter Courses Function --------
function filterCourses(filter) {
  // Select all course elements with class 'course'
  const courses = document.querySelectorAll('.course');
  // Initialize a counter for total credits
  let totalCredits = 0;

  // Loop through each course
  courses.forEach(course => {
    // Check if the course element contains the filter class
    const match = course.classList.contains(filter);
    // If filter is 'all' or course matches the filter...
    if (filter === 'all' || match) {
      // Show the course
      course.classList.remove('hero-index-hidden');
      // Increase totalCredits count
      totalCredits++;
    } else {
      // Hide the course
      course.classList.add('hero-index-hidden');
    }
  });

  // Update the element that shows total credits
  const creditDisplay = document.getElementById('hero-index-total-credits');
  // Set the display text (assumes each course is worth 2 credits)
  if (creditDisplay) {
    creditDisplay.textContent = `Total Credits: ${totalCredits * 2}`;
  }
}

// -------- Set default filter on page load --------
window.addEventListener('DOMContentLoaded', () => {
  // Show all courses by default
  filterCourses('all');
});

// Menu burger toggle close and open 
  const menuToggle = document.getElementById('menu-toggle');
  const hamburger = menuToggle.querySelector('.hamburger');
   
  menuToggle.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
  });

