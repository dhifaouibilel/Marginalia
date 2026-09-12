// controllers/bookController.js
import { getBooks as loadBooks, getGenres, addBook, getBookById, deleteBook as removeBook, updateBook, getBookByTitle } from "../DB/queries.js";

import { validateBook } from "../lib/validate-book.js";

export async function getAbout(req, res) {           // full page: GET / and GET /genre/:slug
  try {
    
    res.render("about.ejs");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

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
    res.status(500).send("Something went wrong loading the shelf. Please try again.");
}
}

export async function getBookCards(req, res) {        // fragment: GET /api/books(/:slug)
  try {
    const { active } = await resolveGenre(req);
    const books = active ? await loadBooks(active.name) : await loadBooks();
    res.render("partials/book-cards", { books });
  } catch (error) {
    console.error(error);
    res.status(500).send('<p class="empty-state__text">Could not load these books. Please try again.</p>');
  }
}

export async function getBookDetails(req, res) {
    try {
        const book = await getBookById(req.params.id)
        
        res.render("book-details.ejs",{book})
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong loading this book. Please try again.");
    }
}

export async function searchByTitle(req, res) {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.redirect("/");

    const match = await getBookByTitle(q);
    if (match) return res.redirect(`/books/${match.id}`);

    const genres = await getGenres();
    res.render("index.ejs", { genres, books: [], featured: null, activeGenre: null, query: q }); // 200 — valid search, just nothing found
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while searching. Please try again.");
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

// controllers/bookController.js
export async function createBook(req, res) {
  const errors = validateBook(req.body);
  if (Object.keys(errors).length) {
    const genres = await getGenres();
    return res.status(400).render("new-book.ejs", { genres, errors, values: req.body });
  }

  try {
    await addBook(req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    const genres = await getGenres();
    res.status(500).render("new-book.ejs", {
      genres,
      error: "Something went wrong saving this book. Please try again.",
      values: req.body,
    });
  }
}

export async function deleteBook(req, res) {
    try {
        const bookId = req.params.id
        const deleted = await removeBook(bookId);
        if (!deleted) return res.status(404).send("This book doesn't exist.");

       res.redirect("/"); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong deleting this book. Please try again.");
    }
}

export async function editBookForm(req, res) {
  try {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    const genres = await getGenres();
    res.render("new-book.ejs", { genres, values: book, edit: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not load this book");
  }
}

export async function editBook(req, res) {
  const id = req.params.id;
  const errors = validateBook(req.body);
  if (Object.keys(errors).length) {
    const genres = await getGenres();
    return res.status(400).render("new-book.ejs", { genres, errors, values: { ...req.body, id }, edit: true });
  }

  try {
    const updated = await updateBook(id, req.body);
    if (!updated) return res.status(404).send("Book not found");
    res.redirect(`/books/${id}`);
  } catch (error) {
    console.error(error);
    const genres = await getGenres();
    res.status(500).render("new-book.ejs", {
      genres,
      error: "Something went wrong saving your changes.",
      values: { ...req.body, id },
      edit: true,
    });
  }
}