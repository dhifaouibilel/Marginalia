// controllers/bookController.js
import { getBooks as loadBooks, getGenres } from "../DB/queries.js";

async function resolveGenre(req) {
  const genres = await getGenres();
  const slug = req.params.slug || null;
  const active = slug ? genres.find((g) => g.slug === slug) : null;
  return { genres, active };
}

export async function getBooks(req, res) {           // full page: GET / and GET /genre/:slug
  try {
    const { genres, active } = await resolveGenre(req);
    const books = active ? await loadBooks(active.name) : await loadBooks();
    const featured = books.length ? books[Math.floor(Math.random() * books.length)] : null;
    res.render("index.ejs", { books, featured, genres, activeGenre: active ? active.slug : null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There is no data in DB" });
  }
}

export async function getBookCards(req, res) {        // fragment: GET /api/books(/:slug)
  try {
    const { active } = await resolveGenre(req);
    const books = active ? await loadBooks(active.name) : await loadBooks();
    res.render("partials/book-cards", { books });
  } catch (error) {
    console.error(error);
    res.status(500).send("");
  }
}