var gTrans = {
    "navbar-home": {
        en: 'Home',
        es: 'Hogar',
        he: 'בית'
    },
    "navbar-contact": {
        en: 'contact us',
        es: 'Contacta con nosotras',
        he: 'צור קשר',
    },
    "navbar-lang": {
        en: 'Language',
        es: 'Idioma',
        he: 'שפה',
    },
    "navbar-input": {
        en: 'Search for book',
        es: 'Buscar libro',
        he: 'חפש ספר'
    },
    "navbar-btn-search": {
        en: 'Search',
        es: 'Buscar',
        he: 'חפש',
    },
    "header-h1": {
        en: 'Bookie',
        es: 'Bookie',
        he: 'בוקי',
    },
    "header-h3": {
        en: 'welcome to Bookie my uniqe bookshop',
        es: 'Bienvenido a Bookie mi librería uniqe',
        he: 'ברוכים הבאים לבוקי חנות הספרים האינטרנטית שלי',
    },
    "header-desc" :{
        en: 'buy and support small business! ',
        es: 'compre y apoye a la pequeña empresa!',
        he: 'קנו ותמכו בעסקים קטנים!',
    },
    "header-btn": {
        en: 'add a new book',
        es: 'agregar un libro nuevo',
        he: 'הוסף ספר',
    },
    "th-cover": {
        en: 'Book cover',
        es: 'Tapa del libro',
        he: 'כריכה'
    },
    "th-name": {
        en: 'Book name',
        es: 'Nombre del libro',
        he: 'שם הספר'
    },
    "th-price": {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר'
    },
    "th-rate": {
        en: 'Rating',
        es: 'Clasificación',
        he: 'דירוג'
    },
    "th-btns": {
        en: 'Application',
        es: 'Solicitud',
        he: 'פעולות'
    },
    "btns-read": {
        en: 'read',
        es: 'leer',
        he: 'קרא עוד'
    },
    "btns-upd": {
        en: 'update',
        es: 'actualizar',
        he: 'עדכן'
    },
    "btns-del": {
        en: 'delete',
        es: 'Eliminar',
        he: 'מחק'
    },
    "footer-h1": {
        en: 'contact us',
        es: 'Contacta con nosotros',
        he: 'צרו קשר'
    },
    "footer-p": {
        en: 'we\'d love to here your segestion',
        es: 'Nos encantaría escuchar sugerencias y comentarios!',
        he: 'נשמח לשמוע הצעות והערות!'
    },
    "footer-email": {
        en: 'your Email',
        es: 'Tu correo electrónico',
        he: 'האימייל שלך'
    },
    "footer-subj": {
        en: 'subject',
        es: 'tema',
        he: 'נושא'
    },
    "footer-subj-input": {
        en: 'subject here',
        es: 'tema aquí',
        he: 'הכנס נושא'
    },
    "footer-mess": {
        en: 'message body',
        es: 'Cuerpo del mensaje',
        he: 'גוף ההודעה'
    },
    "footer-mess-input": {
        en: 'put text here',
        es: 'poner texto aquí',
        he: 'תוכן נכנס כאן'
    },
    "footer-btn": {
        en: 'Submit',
        es: 'enviar',
        he: 'שלח'
    },
    "price-currency": {
        en: '$',
        es: '€',
        he: '₪'
    },
    "New price?": {
        en: 'New price?',
        es: 'Nuevo precio?',
        he: 'מה המחיר החדש שתרצה להכניס?'
    },
    "modal-title": {
        en: 'add a new book',
        es: 'agregar un libro nuevo',
        he: 'הוסף ספר חדש לספריה'
    },
    "modal-input-name": {
        en: 'book name',
        es: 'nombre del libro',
        he: 'שם הספר'
    },
    "modal-input-price": {
        en: '000$',
        es: '000€',
        he: '000₪'
    },
    "modal-btn-add": {
        en: 'add',
        es: 'añadir',
        he: 'הוסף'
    },
    "btn-close": {
        en: 'close',
        es: 'cerrar',
        he: 'סגור'
    },
    "btn-add-to-bag": {
        en: 'add to bag',
        es: 'agregar a la bolsa€',
        he: 'הוסף לסל'
    },
    "price-currency": {
        en: '$',
        es: '€',
        he: '₪'
    },
    "price-currency": {
        en: '$',
        es: '€',
        he: '₪'
    },
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
        
            el.placeholder = txt
        } else {
            el.innerText = txt
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}