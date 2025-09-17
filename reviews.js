// JavaScript for handling review form submission and scrolling reviews

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.review-form');
  const reviewsList = document.querySelector('.scrolling-reviews');

  // Load reviews from localStorage
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviewsList.innerHTML = '';
    reviews.forEach(r => {
      const div = document.createElement('div');
      div.className = 'review';
      div.innerHTML = `<span class="reviewer">${r.name}</span> <span class="rating">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span><div class="comment">${r.comment}</div>`;
      reviewsList.appendChild(div);
    });
  }

  // Save review to localStorage
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const rating = parseInt(form.rating.value);
    const comment = form.comment.value.trim();
    if (!name || !rating || !comment) return;
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.unshift({ name, rating, comment });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    form.reset();
    loadReviews();
  });

  loadReviews();
});
