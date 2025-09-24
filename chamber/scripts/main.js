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

 // Hanlding form validation for Join PG

  const form = document.getElementById('join-pg-form');
  const errorContainer = document.getElementById('form-errors');

  form.addEventListener('submit', function(event) {
    errorContainer.innerHTML = '';  // Clear previous errors
    const errors = [];

    // Validate First Name (required)
    const firstName = form.firstName.value.trim();
    if (!firstName) {
      errors.push('First Name is required.');
    }

    // Validate Last Name (required)
    const lastName = form.lastName.value.trim();
    if (!lastName) {
      errors.push('Last Name is required.');
    }

    // Validate Organizational Title (optional but pattern if entered)
    const orgTitle = form.orgTitle.value.trim();
    if (orgTitle && !/^[A-Za-z\s-]{7,}$/.test(orgTitle)) {
      errors.push('Organizational Title must be at least 7 characters, letters, hyphens, and spaces only.');
    }

    // Validate Email (required, built-in email validation)
    const email = form.email.value.trim();
    if (!email) {
      errors.push('Email Address is required.');
    } else {
      // Basic email regex for extra check (optional)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.push('Please enter a valid Email Address.');
      }
    }

    // Validate Mobile Phone (required, simple check)
    const mobile = form.mobile.value.trim();
    if (!mobile) {
      errors.push('Mobile Phone Number is required.');
    } else {
      // Basic phone number check (digits, spaces, parentheses, dashes)
      const phonePattern = /^[0-9\s()+-]+$/;
      if (!phonePattern.test(mobile)) {
        errors.push('Please enter a valid Mobile Phone Number.');
      }
    }

    // Validate Business Name (required)
    const businessName = form.businessName.value.trim();
    if (!businessName) {
      errors.push('Business/Organization Name is required.');
    }

    // Validate Membership Level (required)
    const membershipLevel = form.membershipLevel.value;
    if (!membershipLevel) {
      errors.push('Please select a Membership Level.');
    }

    if (errors.length > 0) {
      event.preventDefault();
      // Display errors at the top
      errorContainer.innerHTML = '<ul><li>' + errors.join('</li><li>') + '</li></ul>';
      // Optionally, scroll to top so user sees errors immediately
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

 