# 📖 Marginalia

*A personal reading journal, kept in the open.*

Marginalia is a full‑stack book review site built as a capstone project — every book on the shelf got a real read‑through and a few honest lines about what stuck. No star‑padding, no spoilers, no algorithm deciding what you see next.

## ✨ Features

- **Full‑viewport hero** with a random "pick of the shelf" spotlight over a warm library photo background
- **Themed shelf** — every book is tagged with a genre, each genre gets its own colour and icon for at‑a‑glance scanning
- **Server‑side filtering** — genre chips fetch filtered results from PostgreSQL and swap them in with no full page reload
- **Real search** — a search form (`ILIKE` on the title) that expands out of the nav with an animated reveal
- **Full CRUD** — add, edit, and delete books through styled forms with server‑side validation and inline field errors
- **Book detail pages** with Modify / Delete actions
- **About page** pulling live stats (total books, average rating, number of themes) from the database
- **Responsive & accessible** — keyboard focus states, `aria-*` attributes on interactive controls, and a `prefers-reduced-motion`‑aware entrance animation for the shelf
- **A cohesive design system** — Fraunces + Inter type, a warm ivory/emerald/brass/rust colour palette designed around the library‑photo hero, all driven by CSS custom properties

## 🛠[U+FE0F] Tech stack

| Layer | Choice |
|---|---|
| Runtime | Node.js |
| Server | Express |
| Templating | EJS |
| Database | PostgreSQL (via `pg`) |
| Styling | Hand‑written CSS (no framework) |
| Config | `dotenv` |

## 🚀 Getting started

### Prerequisites
- Node.js (v18+)
- A PostgreSQL database — local, or a hosted/cloud instance (Neon, Supabase, Railway, Render, etc.)

### 1. Clone & install
```bash
git clone https://github.com/dhifaouibilel/Marginalia
cd marginalia
npm install
```

### 2. Configure the database connection

Copy the example env file:
```bash
cp .env.example .env
```

**Local Postgres:**
```env
PGUSER=postgres
PGHOST=localhost
PGDATABASE=Marginalia
PGPASSWORD=your_password_here
PGPORT=5432
```

**Hosted/cloud Postgres (Neon, Supabase, Railway, Render, Heroku, RDS…):** the same `.env` fields work, but almost every managed provider *requires* an SSL connection — without it, the app won't just "work with a config tweak," it'll fail outright with an encryption/certificate error. `DB/db.js` already handles this:

```js
const db = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.PGSSL === "false" ? false : { rejectUnauthorized: false },
});
```

Just point the five `PG*` variables at your cloud instance's credentials — SSL is on by default for anything that isn't explicitly `PGSSL=false` (which local dev should set, or simply omit `PGSSL` locally and only add `ssl: false` handling if your local Postgres rejects SSL).

If your provider instead hands you a single connection string (e.g. `postgres://user:pass@host/db?sslmode=require`), swap to `connectionString: process.env.DATABASE_URL` in `db.js` and store the whole URL as one `.env` variable instead of five.

### 3. Create the schema
```sql
CREATE TABLE genres (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE books (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  author     TEXT NOT NULL,
  cover_url  TEXT,
  rating     NUMERIC(2,1) CHECK (rating BETWEEN 0 AND 5),
  date_read  DATE,
  resume     TEXT,
  genre_id   INT REFERENCES genres(id)
);
```
Seed a few rows into `genres` (e.g. Fiction, Fantasy, Science Fiction, History, Memoir…) before adding books through the app — every book needs a `genre_id`.

### 4. Run it
```bash
npm run dev     # nodemon, auto-restarts on file changes
# or
npm start
```
Visit **http://localhost:3000**.

## 🗺[U+FE0F] Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | The shelf — all books + a random pick |
| `GET` | `/genre/:slug` | Shelf filtered by theme |
| `GET` | `/api/books`, `/api/books/:slug` | Book‑card fragments (used by the genre‑filter fetch) |
| `GET` | `/search?q=` | Search books by title |
| `GET` | `/books/:id` | Book detail page |
| `GET`/`POST` | `/add` | New‑book form / create |
| `GET`/`POST` | `/books/:id/edit` | Edit form / update |
| `POST` | `/books/:id/delete` | Delete a book |
| `GET` | `/about` | About page |

## 📁 Project structure

```
├── DB/
│   ├── db.js            # pg.Pool connection
│   └── queries.js       # all SQL
├── controllers/
│   └── bookController.js
├── routes/
│   └── bookRoutes.js
├── lib/
│   ├── theme-icons.js   # genre → SVG icon map
│   └── validate-book.js # shared add/edit form validation
├── views/
│   ├── index.ejs, about.ejs, book-details.ejs, new-book.ejs
│   └── partials/ (header, footer, book-cards)
├── public/
│   ├── css/style.css
│   └── img/
└── index.js              # app entry point
```

## 🎨 Design

The whole palette is built around the hero photo (antique library shelves): warm ivory paper, an emerald primary accent, brass for identity flourishes, and rust reserved for the single primary call‑to‑action on the page. Every genre gets its own muted, WCAG‑AA‑checked hue, used consistently across chips, tags, and card accents so the shelf reads at a glance.

## 📌 Possible next steps

- Pagination for larger shelves
- User accounts (currently a single‑owner shelf by design)
- A `genres.color` column so theme colours live in the database instead of CSS

## 🖼[U+FE0F] Credits

Hero photo: library shelves by **Iñaki del Olmo** on Unsplash (free license).

## 📄 License

ISC
