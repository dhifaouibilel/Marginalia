import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://placehold.co/600x900/1f4d3d/f7f2e8?font=playfair-display&text=The%0AMidnight%0ALibrary",
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
    cover: "https://placehold.co/600x900/8a5a2b/f7f2e8?font=playfair-display&text=Project%0AHail+Mary",
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
    cover: "https://placehold.co/600x900/6e2f2a/f7f2e8?font=playfair-display&text=Circe",
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
    cover: "https://placehold.co/600x900/3d4a3a/f7f2e8?font=playfair-display&text=Klara%0Aand+the+Sun",
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
    cover: "https://placehold.co/600x900/b97c37/2a2420?font=playfair-display&text=The+Song%0Aof+Achilles",
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
    cover: "https://placehold.co/600x900/1f4038/f7f2e8?font=playfair-display&text=Piranesi",
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
    cover: "https://placehold.co/600x900/7a4550/f7f2e8?font=playfair-display&text=A+Gentleman%0Ain+Moscow",
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
    cover: "https://placehold.co/600x900/3d4a3a/f7f2e8?font=playfair-display&text=Normal%0APeople",
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
    cover: "https://placehold.co/600x900/5f4a2e/f7f2e8?font=playfair-display&text=Sapiens",
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
    cover: "https://placehold.co/600x900/6d5636/f7f2e8?font=playfair-display&text=The%0ASilk+Roads",
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
    cover: "https://placehold.co/600x900/9a5a48/f7f2e8?font=playfair-display&text=Interpreter%0Aof+Maladies",
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
    cover: "https://placehold.co/600x900/47342c/f7f2e8?font=playfair-display&text=Tenth+of%0ADecember",
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
    cover: "https://placehold.co/600x900/3f5a70/f7f2e8?font=playfair-display&text=Educated",
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
    cover: "https://placehold.co/600x900/1f4d3d/f7f2e8?font=playfair-display&text=Born%0Aa+Crime",
    rating: 4.5,
    genre: "Memoir",
    date_read: "2025-05-22",
    resume:
      "Growing up mixed-race in South Africa when that was literally illegal, a comedian recounts a childhood of mischief, poverty, and a fiercely resourceful mother.",
  },
];

app.get("/", (req, res) => {
  const featured = books[Math.floor(Math.random() * books.length)];
  res.render("index.ejs", { books, featured });
});

app.listen(port, () => {
  console.log(`Book review app listening on http://localhost:${port}`);
});
