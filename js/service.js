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
            {
                id: makeId(),
                name: 'Leave the World Behind',
                price:getRandomIntInclusive(2, 100),
                imgUrl:`img/leave-the-world.jpg`,
                rating: 0,
                desc: 'Atmospheric and provocative, Leave the World Behind starts off with Amanda and Clay\'s family vacation drama and soon devolves into a cinematic catastrophe. A vacation story on the surface, this unsettling novel rises above a thrilling narrative to take aim at the inherent bias we have for our fellow humans, the brotherhood in our shared fears, and the catastrophic fallout of threats both prosaic and otherworldly. Vibrant, tense and thrilling, this is an absolute must-read.'
            },
            {
                id: makeId(),
                name: 'Whale Day',
                price:getRandomIntInclusive(2, 100),
                imgUrl:`img/whale-day.jpg`,
                rating: 0,
                desc:'What if Penn & Teller were poets instead of magicians? They approach their craft seriously but present it with humor. They present the wonder of the world by telling you they are going to pull a rabbit out of a hat—and yet, we’re still surprised when they do. The poems in Whale Day display this same kind of magic—simple language arranged creatively. Billy Collins’ sleight of hand isn’t there to trick us into reading poetry, instead, it’s to remind us of the beauty of living.'
            },
            {
                id: makeId(),
                name: 'Untamed',
                price:getRandomIntInclusive(2, 100),
                imgUrl:`img/untamed.jpg`,
                rating: 0,
                desc:'More than just a memoir, this book takes the reader on a journey of self-discovery. It seeks to liberate women from the societal expectations that bind them, to honor beauty and rage equally — it speaks to the soul. While Doyle’s previous books Love Warrior and Carry On, Warrior started the conversation, Untamed started a movement. Her legions of fans (old and new) have found within themselves those three little words, “there she is,” and have held onto this book tight as a rallying cry for what it means to be a woman today.'
            },
            {
                id: makeId(),
                name:'The Vanishing Half ' ,
                price:getRandomIntInclusive(2, 100),
                imgUrl: `img/the-vanishing-half.jpg`,
                rating: 0,
                desc:'This Barnes & Noble Book Club Edition includes an essay by Brit Bennett and a reading group guide for book clubs.\“Bennett’s tone and style recalls James Baldwin and Jacqueline Woodson, but it’s especially reminiscent of Toni Morrison’s 1970 debut novel, The Bluest Eye.” —Kiley Reid, Wall Street Journal'
            },
            {
                id: makeId(),
                name:'Stamped',
                price:getRandomIntInclusive(2, 100),
                imgUrl: `img/stamped.jpg`,
                rating: 0,
                desc:'An essential read covering everything from the history of racism in our country, how that history has evolved into the systemic racism we know today, and what we can do in our daily lives to become actively antiracist. Reynolds’ writing is compelling, conversational and extremely engaging, making Stamped an accessible read for all ages. In short, this is a book every American should read (and re-read and re-read again).'
            },
            {
                id: makeId(),
                name:'Hamnet',
                price: getRandomIntInclusive(2, 100),
                imgUrl: `img/hamnet.jpg`,
                rating: 0,
                desc:'A meditation on the inspiration borne of tragedy and the story of the indomitable woman behind an iconic visionary. Gorgeous writing, a magnificent plot and the exquisite exploration of love and loss make this a can\'t-miss novel from the talented, praise-worthy voice of O\'Farrell. Without giving too much away, this is a book that must be savored.'
            },
            {
                id: makeId(),
                name:'Caste',
                price: getRandomIntInclusive(2, 100),
                imgUrl: `img/caste.jpg`,
                rating: 0,
                desc:'The Warmth of Other Suns is brilliant and panoramic. Caste is a fierce, elegant and operatic masterpiece. A combination of deep storytelling and history with insights and illuminations that invite the reader to re-read, re-ponder, re-think and re-learn.'
            }
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
        rating: 0,
        desc:makeLorem(50)
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
