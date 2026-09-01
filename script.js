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

class Book {
  constructor(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  markAsRead = () => {
    this.read = !this.read;
  };
}

class Library {
  books = [];

  addNewBook = ({ title, author, pages }) => {
    const newBook = new Book(title, author, pages);
    this.books.push(newBook);
  };

  removeBook = (id) => {
    this.books = this.books.filter((book) => book.id !== id);
  };
}

function renderBooks() {
  library.innerHTML = '';
  const books = myLibrary.books;
  books.forEach((book) => {
    const bookCard = `
    <article class="book" data-id=${book.id}>
      <div class="book-pages--top"></div>
      <div class="book-pages--side"></div>
      <header>
        <h4 class="title">${book.title}</h4>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages} Pages</p>
      </header>
      <footer>
      <button class="btn btn-destructive remove-book--btn">Remove</button>
      <button class="btn btn-secondary mark-book-as-read--btn">${book.read ? 'Read ✔️' : 'Mark as read'}</button>
      </footer>
    </article>`;
    library.insertAdjacentHTML('beforeend', bookCard);
  });
}

const myLibrary = new Library();

dummyBooks.forEach((book) => {
  myLibrary.addNewBook(book);
});

renderBooks();

library.addEventListener('click', (e) => {
  const removeBookBtn = e.target.classList.contains('remove-book--btn');
  const markAsReadBtn = e.target.classList.contains('mark-book-as-read--btn');

  if (removeBookBtn || markAsReadBtn) {
    const card = e.target.closest('.book');
    const id = card.dataset.id;

    if (removeBookBtn) {
      myLibrary.removeBook(id);
    }

    if (markAsReadBtn) {
      const book = myLibrary.books.find((b) => b.id === id);
      if (!book) return;
      book.markAsRead();
    }

    renderBooks();
  }
});

newBookBtn.addEventListener('click', () => newBookModal.showModal());
cancelAddNewBookBtn.addEventListener('click', () => newBookModal.close());
newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(newBookForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');

  myLibrary.addNewBook({ title, author, pages });
  newBookForm.reset();
  newBookModal.close();
  renderBooks();
});
