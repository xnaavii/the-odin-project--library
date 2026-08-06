let myLibrary = [];
const library = document.querySelector('.library');
const newBookModal = document.querySelector('.new-book--modal');
const newBookForm = document.querySelector('.new-book--form');
const newBookBtn = document.querySelector('.new-book--btn');
const cancelAddNewBookBtn = document.querySelector('.cancel-add-new-book--btn');

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

function addBookToLibrary({ title, author, pages }) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages);
  myLibrary.push(newBook);
}

function createBookCard({ id, title, author, pages }) {
  const articleEl = document.createElement('article');
  const headContentEl = document.createElement('section');
  const titleEl = document.createElement('h4');
  const authorEl = document.createElement('p');
  const pagesEl = document.createElement('p');
  const footerEl = document.createElement('footer');
  const removeBookBtn = document.createElement('button');

  articleEl.dataset.id = id;

  articleEl.classList.add('card');
  headContentEl.classList.add('head-content');
  titleEl.classList.add('title');
  authorEl.classList.add('author');
  pagesEl.classList.add('pages');
  footerEl.classList.add('footer-content');
  removeBookBtn.classList.add('remove-book--btn');
  removeBookBtn.classList.add('btn');

  titleEl.textContent = title;
  authorEl.textContent = author;
  pagesEl.textContent = `${pages} pages`;
  removeBookBtn.textContent = 'Remove';

  headContentEl.append(titleEl);
  headContentEl.append(authorEl);
  articleEl.append(headContentEl);
  articleEl.append(footerEl);
  footerEl.append(pagesEl);
  footerEl.append(removeBookBtn);

  removeBookBtn.addEventListener('click', () => removeBook(id));

  return articleEl;
}

function createBookCards() {
  myLibrary.forEach((book) => {
    const newBook = createBookCard(book);
    library.append(newBook);
  });
}

function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  const books = document.querySelectorAll('.card');
  books.forEach((book) => {
    if (book.dataset.id === id) {
      library.removeChild(book);
    }
  });
}

function addBooksToLibrary(books) {
  books.forEach((book) => {
    addBookToLibrary(book);
  });
}

addBooksToLibrary(dummyBooks);
createBookCards();

newBookBtn.addEventListener('click', () => newBookModal.showModal());
cancelAddNewBookBtn.addEventListener('click', () => newBookModal.close());
newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(newBookForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');

  if (!title || !author || !pages) {
    return;
  }

  addBookToLibrary({ title, author, pages });
  createBookCards();

  newBookModal.close();
});
