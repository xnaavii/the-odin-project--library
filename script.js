const libraryEl = document.querySelector('.library');
const newBookModalEl = document.querySelector('.new-book--modal');
const newBookFormEl = document.querySelector('.new-book--form');
const newBookBtnEl = document.querySelector('.new-book--btn');
const cancelAddNewBookBtnEl = document.querySelector(
  '.cancel-add-new-book--btn',
);

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
  #books = [];

  get books() {
    return this.#books;
  }

  set books(books) {
    this.#books = books;
  }

  addNewBook = ({ title, author, pages }) => {
    const newBook = new Book(title, author, pages);
    this.#books.push(newBook);
  };

  addBooks = (books) => {
    books.forEach((book) => {
      this.addNewBook({ ...book });
    });
  };

  removeBook = (id) => {
    this.#books = this.#books.filter((book) => book.id !== id);
  };
}

class LibraryView {
  #root;

  constructor(library, targetElement) {
    this.library = library;
    this.#root = targetElement;
  }

  render = () => {
    this.#root.innerHTML = this.library.books
      .map((book) => {
        return `
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
      </article>
      `;
      })
      .join('');
  };
}

const library = new Library();
library.addBooks(dummyBooks);
const libraryView = new LibraryView(
  library,
  document.querySelector('.library'),
);
libraryView.render();

libraryEl.addEventListener('click', (e) => {
  console.log(e);
  const removeBookBtnEl = e.target.classList.contains('remove-book--btn');
  const markAsReadBtnEl = e.target.classList.contains('mark-book-as-read--btn');

  if (removeBookBtnEl || markAsReadBtnEl) {
    const card = e.target.closest('.book');
    const id = card.dataset.id;

    if (removeBookBtnEl) {
      library.removeBook(id);
    }

    if (markAsReadBtnEl) {
      const book = library.books.find((b) => b.id === id);
      if (!book) return;
      book.markAsRead();
    }

    libraryView.render();
  }
});

newBookBtnEl.addEventListener('click', () => newBookModalEl.showModal());
cancelAddNewBookBtnEl.addEventListener('click', () => newBookModalEl.close());
newBookFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(newBookForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');

  library.addNewBook({ title, author, pages });
  newBookFormEl.reset();
  newBookModalEl.close();
  libraryRenderer.render();
});
