// lib/validate-book.js
export function validateBook({ title, author, genre_id, rating, date_read, resume }) {
  const errors = {};

  if (!title?.trim())  errors.title = "Title is required.";
  if (!author?.trim()) errors.author = "Author is required.";
  if (!genre_id)         errors.genre_id = "Pick a theme.";

  if (rating === "" || rating == null)  errors.rating = "Give it a rating.";
  else if (rating < 0 || rating > 5)     errors.rating = "Rating must be between 0 and 5.";

  if (!date_read)       errors.date_read = "Date read is required.";
  if (!resume?.trim())  errors.resume = "Add a short review.";

  return errors;   // {} when the book is valid
}