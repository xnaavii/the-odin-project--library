const myLibrary = [];

function Book(id, title, author, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages);
  myLibrary.push(newBook);
}
