'use strict'
const ARROW_UP = ' <i class="fa fa-plus" ></i>'
const ARROW_DOWN = '<i class="fa fa-minus"></i>'

function onInit() {

    renderForScreenSize()
}




function renderBooksTable() {
    var books = getBooks()

    var innerHTMLs = books.map(function (book, idx) {
        return ` <tr>
        <th scope="row">${idx}</th>
        <td style+""><img src="${book.imgUrl}" class="table-img"/></td>
        <td>${book.name}</td>
        <td>${book.price} <span data-trans="price-currency">${getTrans('price-currency')}</span> </td>
        <td class="rating"><span onclick="onRate('${book.id}','up')">${ARROW_UP}</span> ${book.rating}<span onclick="onRate('${book.id}','down')">${ARROW_DOWN}</span></td>
        <td><button data-trans="btns-read" data-toggle="modal" data-target="#staticBackdrop" class="btn btn-outline-warning my-2 my-sm-0" onclick="onRead('${book.id}')">${getTrans('btns-read')}</button>
        <button data-trans="btns-upd" class="btn btn-outline-info my-2 my-sm-0" onclick="onUpdate('${book.id}')">${getTrans('btns-upd')}</button>
        <button data-trans="btns-del" class="btn btn-outline-danger my-2 my-sm-0" onclick="onDelete('${book.id}')">${getTrans('btns-del')}</button></td>

        </tr>`
    })

    var elBooks = document.querySelector('.books-info')
    elBooks.innerHTML = innerHTMLs.join('')

    //     var thHTML=`
    //     <tr>
    //     <th scope="col">#</th>
    //     <th scope="col" data-trans="th-cover"> Book cover</th>
    //     <th scope="col" data-trans="th-name" class="sort" onclick="onSortBy('name')">Book name</th>
    //     <th scope="col" data-trans="th-price" class="sort" onclick="onSortBy('price')"> Price </th>
    //     <th scope="col" data-trans="th-rate" class="sort" onclick="onSortBy('rating')"> Rating </th>
    //     <th scope="col" data-trans="th-btns">Application</th>
    // </tr>`
    // document.querySelector('thead').innerHTML = thHTML
}


function renderCards() {

    var books = getBooks()
    var innerHTMLs = books.map(function (book) {
        return `
        <div class="card  col-12  text-center" style="width:15%;">
            <img src="${book.imgUrl}" class="card-img-top" >
            <div class="card-body">
                <h2>${book.name}</h2>
                <h3>${book.price} <span data-trans="price-currency">${getTrans('price-currency')}</span> </h3>
                <h5 class="rating"><span onclick="onRate('${book.id}','up')">${ARROW_UP}</span> ${book.rating}<span onclick="onRate('${book.id}','down')">${ARROW_DOWN}</span></h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div class="card-btns">
                <button data-trans="btns-read" data-toggle="modal" data-target="#staticBackdrop" class="btn btn-outline-warning my-2 my-sm-0" onclick="onRead('${book.id}')">${getTrans('btns-read')}</button>
                <button data-trans="btns-upd" class="btn btn-outline-info my-2 my-sm-0" onclick="onUpdate('${book.id}')">${getTrans('btns-upd')}</button>
                <button data-trans="btns-del" class="btn btn-outline-danger my-2 my-sm-0" onclick="onDelete('${book.id}')">${getTrans('btns-del')}</button>
                </div> 
            </div>
      </div>`
    })

    var elBooks = document.querySelector('.cards-container')
    elBooks.innerHTML = innerHTMLs.join('')


}

function onDelete(bookId) {
    removeBook(bookId)

    renderForScreenSize()
}


function onAddNewBook() {
    var bookName = document.querySelector('input[name=bookName]')
    var bookPrice = document.querySelector('input[name=bookPrice]')
    addBookToDB(bookName.value, +bookPrice.value);
    renderForScreenSize()

}

function onUpdate(bookId) {
    var newPrice = +prompt(getTrans('New price?'));
    updateBook(bookId, newPrice);
    renderForScreenSize()
}

function onRead(bookId) {
    var book = findBookById(bookId)
    document.querySelector('.modal-title').innerText = book.name;
    document.querySelector('.modal-content h3').innerText = `$ ${book.price}`
    document.querySelector('.modal-content h5').innerText = `rating: ${book.rating}`
    document.querySelector('.modal-content p').innerText = `${book.desc}`
    document.querySelector('.img-holder img').src = `${book.imgUrl}`

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
    renderForScreenSize()
}

function onSortBy(sortBy) {
    sortByWhat(sortBy);
    renderForScreenSize()
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    renderForScreenSize()
}

function renderForScreenSize() {
    var userScreenSize = window.screen.width;
    if (userScreenSize > 850) renderBooksTable()
    else renderCards()

}

function onSubmitEmail() {
    var subject = $('input[name=subject]').val()
    var userEmail = $('input[name=userEmail]').val()
    var message = $('textarea[name=message]').val()
    console.log('subj', subject);
    console.log('mess', message);
    console.log('email', userEmail);
    var emailLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=Bookie_shop@gmail.com&su=${subject}&body=${message}&bcc=${userEmail}&tf=1`
    window.open(emailLink, '_blank');
}