const myLibrary = [];

let openFormBtn = document.querySelector("#new");
openFormBtn.addEventListener("click", OpenForm);

let refreshBtn = document.querySelector("#refresh");
refreshBtn.addEventListener("click", DisplayBooks());

let addBookBtn = document.querySelector("#add");
addBookBtn.addEventListener("click", AddBookToLibrary);

let closeFromBtn = document.querySelector("#close");
closeFromBtn.addEventListener("click", OpenForm);

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function OpenForm() {
    let bookForm = document.querySelector(".newbook-form");
    bookForm.classList.toggle("invisible");
}

function ClearForm(title, author, pages, isRead) {
    title.value = "";
    author.value = "";
    pages.value = "";

    isRead.forEach(function (radio) {
        if (radio.value === "yes") {
            radio.checked = true;
        }
    });
}

function AddBookToLibrary() {
    let titleInput = document.querySelector("#title"); // user input
    let authorInput = document.querySelector("#author");
    let pagesInput = document.querySelector("#num_pages");
    let isReadInput = document.querySelectorAll("input[name=read]");

    let book = new Book();

    book.title = titleInput.value;
    book.author = authorInput.value;
    book.pages = pagesInput.value;
    book.isRead;

    isReadInput.forEach(function (radio) {
        if (radio.checked) {
            book.isRead = radio.value;
        }
    });

    myLibrary.push(book);

    DisplayBooks();
    OpenForm();
    ClearForm(titleInput, authorInput, pagesInput, isReadInput);
}

function DisplayBooks() {
    let bookshelf = document.querySelector(".bookshelf");

    ClearTheShelf();

    myLibrary.forEach(function (book, i) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("card");
        bookshelf.appendChild(bookCard);

        let delCardBtn = document.createElement("img");
        delCardBtn.classList.add("card-del");
        delCardBtn.setAttribute("src", "./images/close-button.svg");
        bookCard.appendChild(delCardBtn);

        delCardBtn.addEventListener("click", function () {
            myLibrary.splice(i, 1);
            bookCard.remove();
        });

        let title = document.createElement("h3");
        title.classList.add("card-title");
        bookCard.appendChild(title);
        title.innerText = book.title;

        let author = document.createElement("p");
        bookCard.appendChild(author);
        author.innerHTML = `by <b>${book.author}</b>`;

        let pages = document.createElement("p");
        bookCard.appendChild(pages);
        pages.innerHTML = `<b>${book.pages}</b> pages`;

        let readStatus = document.createElement("p");
        readStatus.classList.add("read-status");
        bookCard.appendChild(readStatus);
        readStatus.addEventListener("click", function () {
            if (book.isRead === "yes") {
                book.isRead = "no";
                readStatus.innerText = `Unfinished`;
                bookCard.style.borderBottomColor = "rgb(155, 0, 0)";
            } else if (book.isRead === "no") {
                book.isRead = `yes`;
                readStatus.innerText = `Finished`;
                bookCard.style.borderBottomColor = "rgb(3, 95, 0)";
            }
        });

        if (book.isRead === "yes") {
            readStatus.innerText = `Finished`;
            bookCard.style.borderBottomColor = "rgb(3, 95, 0)";
        } else if (book.isRead === "no") {
            readStatus.innerText = "Unfinished";
            bookCard.style.borderBottomColor = "rgb(155, 0, 0)";
        }
    });
}

function ClearTheShelf() {
    let bookCards = document.querySelectorAll(".card");
    bookCards.forEach(function (card) {
        card.remove();
    });
}

function ToggleReadStatus(currentBook, readStatus) {
    if (currentBook.isRead === "yes") {
        readStatus.innerText === "Didn't Read";
    }
}

//

// const myLibrary = [];

// let bookshelf = document.querySelector(".bookshelf");
// let newbookForm = document.querySelector(".newbook_form");

// let titleInput = document.querySelector("#title"); // user input
// let authorInput = document.querySelector("#author");
// let pagesInput = document.querySelector("#num_pages");
// let isReadInput = document.querySelectorAll("input[name=read]");
// let isRead = function () {
//     // return radio button true or false
//     for (let i = 0; i < isReadInput.length; i++) {
//         if (isReadInput[i].checked) {
//             if (isReadInput[i].value === "yes") {
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     }
// };

// let newBtn = document.querySelector("#new"); // simply open a form for adding a new book
// newBtn.addEventListener("click", function () {
//     newbookForm.classList.remove("invisible");
// });

// let refreshBtn = document.querySelector("#refresh"); // display library array
// refreshBtn.addEventListener("click", function () {
//     DisplayCards(myLibrary);
// });

// let addBtn = document.querySelector("#add"); // take user input and create a book card
// addBtn.addEventListener("click", function () {
//     AddBookToLibrary();
//     DisplayCards(myLibrary);
//     ResetForm();
//     newbookForm.classList.add("invisible");
// });

// let closeBtn = document.querySelector("#close"); // close a new book form
// closeBtn.addEventListener("click", function () {
//     newbookForm.classList.add("invisible");
//     ResetForm();
// });

// //////////////////////////////////////////////

// class Book {
//     constructor(title, author, pages, isRead) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.isRead = isRead;
//     }

//     toggleStatus() {
//         if (this.isRead === true) {
//             this.isRead = false;
//         } else {
//             this.isRead = true;
//         }
//     }
// }

// function AddBookToLibrary() {
//     let book = new Book();
//     book.title = titleInput.value;
//     book.author = authorInput.value;
//     book.pages = pagesInput.value;

//     book.isRead = isRead();

//     myLibrary.push(book);
// }

// function DisplayCards(library) {
//     ClearBookshelf();

//     let wasRead =
//         'Read <i class="fa-solid fa-circle-check" style="color: #007007;"></i>';
//     let wasntRead =
//         'Didn\'t read <i class="fa-solid fa-circle-xmark" style="color: #9e0000;"></i>';

//     for (let i = 0; i < library.length; i++) {
//         let card = document.createElement("div");
//         bookshelf.appendChild(card);
//         card.classList.add("card");

//         let title = document.createElement("h3");
//         card.appendChild(title);
//         title.classList.add("card_title");
//         title.innerText = myLibrary[i].title;

//         let author = document.createElement("p");
//         card.appendChild(author);
//         author.innerText = `by ${myLibrary[i].author}`;

//         let pages = document.createElement("p");
//         card.appendChild(pages);
//         pages.innerText = `${myLibrary[i].pages} pages`;

//         let isRead = document.createElement("p");
//         card.appendChild(isRead);
//         isRead.classList.add("read_status");

//         if (myLibrary[i].isRead === true) {
//             isRead.innerHTML = wasRead;
//         } else {
//             isRead.innerHTML = wasntRead;
//         }

//         let deleteBtn = document.createElement("button");
//         card.appendChild(deleteBtn);
//         deleteBtn.classList.add("card_del");
//         deleteBtn.innerText = "X";
//     }

//     let delBtn = document.querySelectorAll(".card_del"); // event listener for each delete button
//     delBtn.forEach(function (button, index) {
//         button.addEventListener("click", function () {
//             button.parentNode.remove();
//             myLibrary.splice(index, 1);
//         });
//     });

//     let readStatus = document.querySelectorAll(".read_status"); // toggle read status
//     readStatus.forEach(function (toggle, index) {
//         toggle.addEventListener("click", function () {
//             myLibrary[index].toggleStatus();
//             if (myLibrary[index].isRead === true) {
//                 toggle.innerHTML = wasRead;
//             } else {
//                 toggle.innerHTML = wasntRead;
//             }
//         });
//     });
// }

// function ResetForm() {
//     titleInput.value = "";
//     authorInput.value = "";
//     pagesInput.value = "";
// }

// function ClearBookshelf() {
//     let cards = document.querySelectorAll(".card");

//     for (let i = 0; i < cards.length; i++) {
//         cards[i].remove();
//     }
// }
