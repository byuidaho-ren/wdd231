// Responsive Menu Toggle
document.addEventListener('DOMContentLoaded', () => {

  const toggleButton = document.getElementById('menu-toggle');
  const menu = document.getElementById('primary-menu');

  if (toggleButton && menu) {
    toggleButton.addEventListener('click', () => {
      const isVisible = menu.classList.toggle('menu-visible');
      toggleButton.setAttribute('aria-expanded', isVisible);
    });
  }

  // Set footer year and last modified
  const yearSpan = document.getElementById('current-year');
  const lastModSpan = document.getElementById('last-modified');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModSpan) lastModSpan.textContent = document.lastModified;

  // Menu burger toggle close and open 
  const menuToggle = document.getElementById('menu-toggle');
  const hamburger = menuToggle.querySelector('.hamburger');
   
   menuToggle.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
   });

  });

   // Wayfinder Menu active 
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("#primary-menu a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
 