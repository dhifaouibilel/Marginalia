import db from './db.js'

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://covers.openlibrary.org/b/id/15246264-L.jpg",
    rating: 4.5,
    genre: "Fiction",
    date_read: "2026-06-12",
    resume:
      "Between life and death there is a library, and within that library, the shelves go on forever. Nora Seed gets the chance to undo her regrets and try out every other life she might have lived.",
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://covers.openlibrary.org/b/id/15208263-L.jpg",
    rating: 5,
    genre: "Science Fiction",
    date_read: "2026-05-02",
    resume:
      "A lone astronaut wakes up with no memory on a desperate solo mission to save humanity — and Earth itself — from disaster, armed only with science and dark humor.",
  },
  {
    id: 3,
    title: "Circe",
    author: "Madeline Miller",
    cover: "https://covers.openlibrary.org/b/id/15087672-L.jpg",
    rating: 4,
    genre: "Fantasy",
    date_read: "2026-04-18",
    resume:
      "Banished to a deserted island for her dangerous gifts, the witch Circe hones her powers, defies gods and monsters, and finds a strength she never knew she had.",
  },
  {
    id: 4,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "https://covers.openlibrary.org/b/id/12371744-M.jpg",
    rating: 3.5,
    genre: "Literary Fiction",
    date_read: "2026-03-09",
    resume:
      "Klara, an Artificial Friend with outstanding observational qualities, watches the behavior of those who come into the store, and of those who pass on the street outside.",
  },
  {
    id: 5,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    cover: "https://covers.openlibrary.org/b/id/14817448-M.jpg",
    rating: 4.5,
    genre: "Historical Fiction",
    date_read: "2026-02-21",
    resume:
      "A tale of gods, kings, immortal fame, and the human heart — the story of the deep bond between Achilles and Patroclus, from boyhood through the Trojan War.",
  },
  {
    id: 6,
    title: "Piranesi",
    author: "Susanna Clarke",
    cover: "https://covers.openlibrary.org/b/id/15155469-L.jpg",
    rating: 4,
    genre: "Fantasy",
    date_read: "2026-01-05",
    resume:
      "Piranesi lives in a labyrinthine House of endless halls, tides, and statues. His days are spent exploring, mapping — until messages begin to appear, urging him to remember.",
  },
  {
    id: 7,
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    cover: "https://covers.openlibrary.org/b/id/12064129-M.jpg",
    rating: 4.5,
    genre: "Novel",
    date_read: "2025-12-03",
    resume:
      "Sentenced to house arrest in a grand Moscow hotel in 1922, a witty former aristocrat builds a whole life within its walls as decades of history pass by outside.",
  },
  {
    id: 8,
    title: "Normal People",
    author: "Sally Rooney",
    cover: "https://covers.openlibrary.org/b/id/15213474-L.jpg",
    rating: 4,
    genre: "Novel",
    date_read: "2025-06-14",
    resume:
      "Two young people in Ireland drift together and apart across school and university, tracing how class, silence, and tenderness shape one long relationship.",
  },
  {
    id: 9,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "https://covers.openlibrary.org/b/id/13772836-L.jpg",
    rating: 4.5,
    genre: "History",
    date_read: "2025-11-20",
    resume:
      "A sweeping tour of how Homo sapiens went from an unremarkable animal to the dominant force on the planet — and what our shared fictions have cost us.",
  },
  {
    id: 10,
    title: "The Silk Roads",
    author: "Peter Frankopan",
    cover: "https://covers.openlibrary.org/b/id/12514527-L.jpg",
    rating: 4,
    genre: "History",
    date_read: "2025-09-08",
    resume:
      "World history retold with its centre of gravity moved east, following the trade routes where empires, religions, and goods collided for millennia.",
  },
  {
    id: 11,
    title: "Interpreter of Maladies",
    author: "Jhumpa Lahiri",
    cover: "https://covers.openlibrary.org/b/id/3076044-L.jpg",
    rating: 4.5,
    genre: "Short Stories",
    date_read: "2025-08-17",
    resume:
      "Nine quiet, precise stories about Indian and Indian-American lives — marriages, migrations, and the small distances between people who love each other.",
  },
  {
    id: 12,
    title: "Tenth of December",
    author: "George Saunders",
    cover: "https://covers.openlibrary.org/b/id/12515596-L.jpg",
    rating: 4,
    genre: "Short Stories",
    date_read: "2025-07-01",
    resume:
      "Darkly funny, oddly tender stories set just off the edge of the present day, where ordinary people try to stay decent under absurd pressure.",
  },
  {
    id: 13,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://covers.openlibrary.org/b/id/15216613-L.jpg",
    rating: 5,
    genre: "Memoir",
    date_read: "2025-10-12",
    resume:
      "Raised off-grid by survivalist parents who kept her out of school, a young woman teaches herself enough to reach university — and must weigh knowledge against family.",
  },
  {
    id: 14,
    title: "Born a Crime",
    author: "Trevor Noah",
    cover: "https://covers.openlibrary.org/b/id/10106531-L.jpg",
    rating: 4.5,
    genre: "Memoir",
    date_read: "2025-05-22",
    resume:
      "Growing up mixed-race in South Africa when that was literally illegal, a comedian recounts a childhood of mischief, poverty, and a fiercely resourceful mother.",
  },
];

export async function getBooks(genre) {
    const result = genre? 
    await db.query("select b.id, b.title, b.author, b.resume, b.cover_url as cover, b.rating::float as rating, b.date_read, b.resume, g.name as genre, g.id as genre_id from books b join genres g on g.id=b.genre_id where g.name=$1", [genre])
    : await db.query("select b.id, b.title, b.author, b.resume, b.cover_url as cover, b.rating::float as rating, b.date_read, b.resume, g.name as genre, g.id as genre_id from books b join genres g on g.id=b.genre_id")
    // console.log(result.rows);
    
    return result.rows
}


export async function getGenres() {
  const { rows } = await db.query("select id, name from genres order by name");
  return rows.map((g) => ({
    ...g,
    slug: g.name.toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  }));
}

export async function getBookById(id) {
  const { rows } = await db.query(
    `select b.id, b.title, b.author, b.cover_url as cover, b.rating::float as rating,
            b.date_read, b.resume, g.name as genre, g.id as genre_id
     from books b join genres g on g.id = b.genre_id
     where b.id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function addBook(book) {
//   await db.query("select id, name from genres order by name");
    const {title, author, cover_url, date_read, resume, rating, genre_id} = book
  await db.query("insert into books (title, author, resume, cover_url, rating, date_read, genre_id) values ($1,$2,$3,$4,$5,$6,$7)", [title, author, resume, cover_url, rating, date_read, genre_id])
}


export async function deleteBook(bookId) {
    await db.query("delete from books where id=$1",[bookId])
}


export async function updateBook(id, book) {
  const { title, author, cover_url, date_read, resume, rating, genre_id } = book;
  const { rows } = await db.query(
    `update books
     set title = $1, author = $2, resume = $3, cover_url = $4,
         rating = $5, date_read = $6, genre_id = $7
     where id = $8
     returning id`,
    [title, author, resume, cover_url, rating, date_read, genre_id, id]
  );
  return rows[0] || null;   // null means no book had that id
}