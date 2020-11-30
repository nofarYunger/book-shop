'use strict'

const KEY = 'booksDB';
var gBooks;
var gSortBy = 'rating';
// var COLORS = ['blue', 'green', 'red', 'yellow']


_createBooks();

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [
            _createBook('mobi dic'),
            _createBook('peter pen'),
            _createBook('the little prince'),
            _createBook('the bible'),
        ]
        gBooks = books
        saveBooksToStorage()
    }
    gBooks = books
}


function _createBook(bookName, price = getRandomIntInclusive(2, 100)) {
    return {
        id: makeId(),
        name: bookName,
        price,
        imgUrl: _getRandUrl(),
        rating: 0
    }
}


function _getRandUrl() {
    var colors = ['blue', 'green', 'red', 'yellow']
    var randIdx = getRandomIntInclusive(0, 3)
    return `img/${colors[randIdx]}-book.png`
}

function getBooks() {
    return gBooks;
}



function removeBook(bookId) {
    var bookIdx = findIdxBookById(bookId)
    gBooks.splice(bookIdx, 1)
    saveBooksToStorage()
}


function findIdxBookById(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return (book.id === bookId)
    })
    return bookIdx
}

function findBookById(bookId) {
    var book = gBooks.find(function (book) {
        return (book.id === bookId)
    })
    return book
}

function addBookToDB(bookName, bookPrice) {

    var newBook = _createBook(bookName, bookPrice)
    gBooks.push(newBook)
    saveBooksToStorage()

}

function updateBook(bookId, newPrice) {
    var book = findBookById(bookId)
    book.price = newPrice;
    saveBooksToStorage()
}

function saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function sortByWhat(sortBy) {
    gSortBy = sortBy
    console.log(gBooks);
    console.log('sorting by', sortBy);
     if (sortBy === 'price')  sortBooksByPrice() 
     else if (sortBy === 'name')  sortBooksByName()
    else if (sortBy === 'rating')  sortBooksByRate()
    
    console.log(gBooks);
    saveBooksToStorage()
}

function sortBooksByName() {
    gBooks = gBooks.sort(function (book1, book2) {
        console.log('sorted');
        var name1 = book1.name.toUpperCase(); // ignore upper and lowercase
        var name2 = book2.name.toUpperCase();
        if (name1 < name2) return -1;
        if (name1 > name2) return 1;
        return 0;
    });
}

function sortBooksByPrice() {
    gBooks = gBooks.sort(function (book1, book2) {
        console.log('sorted');
        return book2.price - book1.price
   
    })
}
function sortBooksByRate() {
    gBooks = gBooks.sort(function (book1, book2) {
        console.log('sorted');
        return book2.rating - book1.rating
    })
}
