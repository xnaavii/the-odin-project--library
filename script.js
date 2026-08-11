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

function renderBooks() {
  library.innerHTML = '';
  myLibrary.forEach((book) => {
    const bookCard = `<article class="card" data-id=${book.id}>
      <section class="head-content">
        <h4 class="title">${book.title}</h4>
        <p class="author">${book.author}</p>
        </section>
        <footer class="footer-content">
        <p class="pages">${book.pages} Pages</p>
        <button class="btn remove-book--btn">Remove</button>
      </footer>
    </article>`;
    library.insertAdjacentHTML('beforeend', bookCard);
  });
}

dummyBooks.forEach((book) => {
  addBookToLibrary(book);
});

renderBooks();

library.addEventListener('click', (e) => {
  if (!e.target.classList.contains('remove-book--btn')) return;
  const card = e.target.closest('.card');
  const id = card.dataset.id;
  myLibrary = myLibrary.filter((book) => book.id !== id);
  renderBooks();
});

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
  newBookModal.close();
});
