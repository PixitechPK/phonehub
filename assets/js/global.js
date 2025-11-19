// assets/js/global.js
document.addEventListener("DOMContentLoaded", () => {

  // Function to initialize Load More buttons
  function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
      const hiddenItems = document.querySelectorAll('.hidden-product');
      hiddenItems.forEach(item => item.classList.remove('hidden'));
      loadMoreBtn.style.display = 'none'; // hide button after click
    });
  }

  // Delay initialization until all include-html components are loaded
  function includeHTML() {
    const elements = document.querySelectorAll('[include-html]');
    elements.forEach(el => {
      const file = el.getAttribute('include-html');
      if (file) {
        fetch(file)
          .then(resp => resp.text())
          .then(data => {
            el.innerHTML = data;
            el.removeAttribute('include-html');
            includeHTML(); // recursive load nested components
          })
          .finally(() => {
            initLoadMore(); // initialize Load More after component loaded
          });
      }
    });
  }

  includeHTML();
});
