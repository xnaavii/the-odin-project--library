const library = document.querySelector('.library');
const myLibrary = [];

const dummyBooks = [
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281 },
  { title: '1984', author: 'George Orwell', pages: 328 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 180 },
  { title: 'Pride and Prejudice', author: 'Jane Austen', pages: 279 },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310 },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', pages: 256 },
];

function Book(id, title, author, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(book) {
  const newBook = new Book(
    crypto.randomUUID(),
    book.title,
    book.author,
    book.pages,
  );
  myLibrary.push(newBook);
}

function createBookCard(book) {
  const article = document.createElement('article');
  const title = document.createElement('h4');
  const author = document.createElement('p');
  const pages = document.createElement('p');

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;

  article.append(title);
  article.append(author);
  article.append(pages);

  return article;
}

if (dummyBooks.length > 0) {
  dummyBooks.forEach((book) => {
    addBookToLibrary(book);
  });
}

if (myLibrary.length > 0) {
  myLibrary.forEach((book) => {
    const newBook = createBookCard(book);
    library.append(newBook);
  });
}
