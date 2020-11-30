'use strict'
const ARROW_UP = '<img src=img/up.png>'
const ARROW_DOWN = '<img src=img/down.png>'

function onInit() {
    renderBooks()
}


function renderBooks() {
    var books = getBooks()

    var innerHTMLs = books.map(function (book) {
        return ` <tr>
        <td><img src="${book.imgUrl}"/></td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td class="rating"><span onclick="onRate('${book.id}','up')">${ARROW_UP}</span> ${book.rating}<span onclick="onRate('${book.id}','down')">${ARROW_DOWN}</span></td>
        <td><button onclick="onRead('${book.id}')">Read</button>
        <button onclick="onUpdate('${book.id}')">Update</button>
        <button onclick="onDelete('${book.id}')">Delete</button></td>
        
        </tr>`
    })

    // var tableHeaders = `<tr>
    //     <th>Book cover</th>
    //     <th class="sort" onclick="onSortBy('name')">Book name</th>
    //     <th class="sort" onclick="onSortBy('price')">   Price   </th>
    //     <th class="sort" onclick="onSortBy('rating')">    Rating    </th>
    //     <th>Application</th>
    // </tr>`

    var elBooks = document.querySelector('.books-info')
    // var elBooksHeaders = document.querySelector('tHead')
    elBooks.innerHTML = innerHTMLs.join('')
    // elBooksHeaders.innerHTML = tableHeaders

}

function onDelete(bookId) {
    removeBook(bookId)
    renderBooks()
}


function toggleAddBookModal() {
    var addBookModal = document.querySelector('.create-book')
    var displayModal = addBookModal.style.display
    addBookModal.style.display = displayModal === 'flex' ? 'none' : 'flex'
}

function onAddNewBook() {
    var bookName = document.querySelector('input[name=bookName]')
    var bookPrice = document.querySelector('input[name=bookPrice]')
    addBookToDB(bookName.value, +bookPrice.value);
    renderBooks();
    toggleAddBookModal();
}

function onUpdate(bookId) {
    var newPrice = +prompt('New price?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onRead(bookId) {
    var book = findBookById(bookId)
    var elReadModal = document.querySelector('.book-details');
    elReadModal.querySelector('h2').innerText = book.name;
    elReadModal.querySelector('h3').innerText = `$ ${book.price}`
    elReadModal.querySelector('h5').innerText = `rating: ${book.rating}`
    elReadModal.style.display = 'flex';
}

function onCloseModal() {
    var addBookModal = document.querySelector('.book-details');
    var displayModal = addBookModal.style.display;
    addBookModal.style.display = displayModal === 'flex' ? 'none' : 'flex'
}

function onRate(bookId, direction) {
    console.log(direction);
    var book = findBookById(bookId);


    if (direction === 'up') {
        if (book.rating >= 10) return;
        book.rating++;
    }
    if (direction === 'down') {
        if (book.rating <= 0) return;
        book.rating--;
    }
    saveBooksToStorage();
    renderBooks();
}

function onSortBy(sortBy) {
    sortByWhat(sortBy);
    renderBooks();
}