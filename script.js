function editBook(book) {
  document.getElementById('editBookId').value = book.id;
  document.getElementById('editBookTitle').value = book.title;
  document.getElementById('editBookAuthor').value = book.author;
  document.getElementById('editBookYear').value = book.year;
  document.getElementById('editBookIsComplete').checked = book.isComplete;

  const editModal = document.getElementById('editModal');
  editModal.style.display = 'block';

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeEditModal();
    }
  });
}

function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.style.display = 'none';
}

function saveEditedBook() {
  const editedId = document.getElementById('editBookId').value;
  const editedTitle = document.getElementById('editBookTitle').value;
  const editedAuthor = document.getElementById('editBookAuthor').value;
  const editedYear = document.getElementById('editBookYear').value;
  const editedIsComplete =
    document.getElementById('editBookIsComplete').checked;

  const books = JSON.parse(localStorage.getItem('books')) || [];

  const index = books.findIndex((b) => b.id === parseInt(editedId));
  if (index !== -1) {
    books[index].title = editedTitle;
    books[index].author = editedAuthor;
    books[index].year = editedYear;
    books[index].isComplete = editedIsComplete;

    localStorage.setItem('books', JSON.stringify(books));

    updateBookList();

    closeEditModal();
  } else {
    closeEditModal();
    alert('Book not found');
  }
}

function updateBookList() {
  const unfinishedSection = document.getElementById('UnfinishedSection');
  const finishedSection = document.getElementById('FinishedSection');
  const books = JSON.parse(localStorage.getItem('books')) || [];

  unfinishedSection.innerHTML = '';
  finishedSection.innerHTML = '';

  const h2Unfinished = document.createElement('h2');
  h2Unfinished.textContent = 'Unfinished reading';
  unfinishedSection.appendChild(h2Unfinished);

  const h2Finished = document.createElement('h2');
  h2Finished.textContent = 'Finished reading';
  finishedSection.appendChild(h2Finished);

  books.forEach((book) => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');

    const titleElement = document.createElement('h3');
    titleElement.classList.add('book-title');
    titleElement.textContent = book.title;

    const authorElement = document.createElement('p');
    authorElement.classList.add('book-author');
    authorElement.textContent = book.author;

    const yearElement = document.createElement('div');
    yearElement.classList.add('book-year');
    yearElement.innerHTML = `<p>${book.year}</p>`;

    const actionButtons = document.createElement('div');
    actionButtons.classList.add('book-action');

    const finishedButton = document.createElement('button');
    finishedButton.classList.add('btn', 'btn-green');
    finishedButton.textContent = book.isComplete ? 'Unfinished' : 'Finished';

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-blue');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-red');
    deleteButton.textContent = 'Delete';

    finishedButton.addEventListener('click', function () {
      toggleBookStatus(book);
    });

    editButton.addEventListener('click', function () {
      editBook(book);
    });

    deleteButton.addEventListener('click', function () {
      deleteBook(book);
    });

    actionButtons.appendChild(finishedButton);
    actionButtons.appendChild(editButton);
    actionButtons.appendChild(deleteButton);

    bookItem.appendChild(titleElement);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(yearElement);
    bookItem.appendChild(actionButtons);

    if (book.isComplete) {
      finishedSection.appendChild(bookItem);
    } else {
      unfinishedSection.appendChild(bookItem);
    }
  });
}

function toggleBookStatus(book) {
  book.isComplete = !book.isComplete;

  const books = JSON.parse(localStorage.getItem('books')) || [];

  const index = books.findIndex((b) => b.id === book.id);
  if (index !== -1) {
    books[index] = book;

    localStorage.setItem('books', JSON.stringify(books));

    updateBookList();
  }
}

function deleteBook(book) {
  const books = JSON.parse(localStorage.getItem('books')) || [];

  const index = books.findIndex((b) => b.id === book.id);
  if (index !== -1) {
    books.splice(index, 1);

    localStorage.setItem('books', JSON.stringify(books));

    updateBookList();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const bookForm = document.getElementById('bookForm');
  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  const searchButton = document.querySelector('.btn-search');
  searchButton.addEventListener('click', function () {
    searchBooks();
  });

  const searchInput = document.querySelector('.search-books-input');
  searchInput.addEventListener('keyup', function (event) {
    const inputForm = document.querySelector('.input-form-card');
    inputForm.style.display = searchInput.value.length === 0 ? 'block' : 'none';
    searchBooks();
  });

  function searchBooks() {
    const searchInput = document.querySelector('.search-books-input');
    const searchTerm = searchInput.value.toLowerCase();

    const books = JSON.parse(localStorage.getItem('books')) || [];

    const filteredBooks = books.filter((book) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const year = book.year.toString().toLowerCase();
      return (
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        year.includes(searchTerm)
      );
    });
    updateBookLists(filteredBooks);
  }

  function updateBookLists(books) {
    const unfinishedSection = document.getElementById('UnfinishedSection');
    const finishedSection = document.getElementById('FinishedSection');

    unfinishedSection.innerHTML = '';
    finishedSection.innerHTML = '';

    const h2Unfinished = document.createElement('h2');
    h2Unfinished.textContent = 'Unfinished reading';
    unfinishedSection.appendChild(h2Unfinished);

    const h2Finished = document.createElement('h2');
    h2Finished.textContent = 'Finished reading';
    finishedSection.appendChild(h2Finished);

    books.forEach((book) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');

      const titleElement = document.createElement('h3');
      titleElement.classList.add('book-title');
      titleElement.textContent = book.title;

      const authorElement = document.createElement('p');
      authorElement.classList.add('book-author');
      authorElement.textContent = book.author;

      const yearElement = document.createElement('div');
      yearElement.classList.add('book-year');
      yearElement.innerHTML = `<p>${book.year}</p>`;

      const actionButtons = document.createElement('div');
      actionButtons.classList.add('book-action');

      const finishedButton = document.createElement('button');
      finishedButton.classList.add('btn', 'btn-green');
      finishedButton.textContent = book.isComplete ? 'Unfinished' : 'Finished';

      const editButton = document.createElement('button');
      editButton.classList.add('btn', 'btn-blue');
      editButton.textContent = 'Edit';

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-red');
      deleteButton.textContent = 'Delete';

      finishedButton.addEventListener('click', function () {
        toggleBookStatus(book);
      });

      editButton.addEventListener('click', function () {
        editBook(book);
      });

      deleteButton.addEventListener('click', function () {
        deleteBook(book);
      });

      actionButtons.appendChild(finishedButton);
      actionButtons.appendChild(editButton);
      actionButtons.appendChild(deleteButton);

      bookItem.appendChild(titleElement);
      bookItem.appendChild(authorElement);
      bookItem.appendChild(yearElement);
      bookItem.appendChild(actionButtons);

      if (book.isComplete) {
        finishedSection.appendChild(bookItem);
      } else {
        unfinishedSection.appendChild(bookItem);
      }
    });
  }

  function addBook() {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = parseInt(document.getElementById('inputBookYear').value);
    const isComplete = document.getElementById('inputBookIsComplete').checked;
    const id = new Date().getTime();

    const books = JSON.parse(localStorage.getItem('books')) || [];

    const newBook = { id, title, author, year, isComplete };
    books.push(newBook);

    localStorage.setItem('books', JSON.stringify(books));

    updateBookList();
  }

  updateBookList();
});
