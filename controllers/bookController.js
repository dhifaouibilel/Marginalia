// controllers/bookController.js
import { getBooks as loadBooks, getGenres, addBook } from "../DB/queries.js";

async function resolveGenre(req) {
  const genres = await getGenres();
  const slug = req.params.slug || null;
  const active = slug ? genres.find((g) => g.slug === slug) : null;
  return { genres, active };
}

export async function getBooks(req, res) {           // full page: GET / and GET /genre/:slug
  try {
    const { genres, active } = await resolveGenre(req);
    const allBooks = await loadBooks()
    const filtredBooks = active ? await loadBooks(active.name) : allBooks;
    const featured = filtredBooks.length ? filtredBooks[Math.floor(Math.random() * filtredBooks.length)] : allBooks[Math.floor(Math.random() * allBooks.length)];
    res.render("index.ejs", { books: filtredBooks, featured, genres, activeGenre: active ? active.slug : null });
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

export async function newBook(req, res) {           // full page: GET / and GET /genre/:slug
  try {
    const { genres } = await resolveGenre(req);
    res.render("new-book.ejs", {genres});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There is no data in DB" });
  }
}

export async function createBook(req, res) {           // full page: GET / and GET /genre/:slug
  try {
    // const {title, author, cover_url, date_read, resume, rating, genre_id} = req.body
    const newBook = req.body
    console.log(newBook);
    
    await addBook(newBook)
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There is no data in DB" });
  }
}