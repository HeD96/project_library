let myLibrary = []; // library array

let bookshelf = document.querySelector(".wrapper");
let newbookForm = document.querySelector(".newbook_form");

let titleInput = document.querySelector("#title"); // user input
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#num_pages");
let isReadInput = document.querySelectorAll("input[name=read]");
let isRead = function () {
    // return radio button true or false
    for (let i = 0; i < isReadInput.length; i++) {
        if (isReadInput[i].checked) {
            if (isReadInput[i].value === "yes") {
                return true;
            } else {
                return false;
            }
        }
    }
};

let newBtn = document.querySelector("#new"); // simply open a form for adding a new book
newBtn.addEventListener("click", function () {
    newbookForm.classList.remove("invisible");
});

let refreshBtn = document.querySelector("#refresh"); // display library array
refreshBtn.addEventListener("click", function () {
    DisplayCards(myLibrary);
});

let addBtn = document.querySelector("#add"); // take user input and create a book card
addBtn.addEventListener("click", function () {
    AddBookToLibrary();
    DisplayCards(myLibrary);
    ResetForm();
    newbookForm.classList.add("invisible");
    console.log();
});

let closeBtn = document.querySelector("#close"); // close a new book form
closeBtn.addEventListener("click", function () {
    newbookForm.classList.add("invisible");
    ResetForm();
});

//////////////////////////////////////////////

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleStatus() {
        if (this.isRead === true) {
            this.isRead = false;
        } else {
            this.isRead = true;
        }
    }
}

function CreateBook() {
    let book = new Book();
    book.title = titleInput.value;
    book.author = authorInput.value;
    book.pages = pagesInput.value;

    book.isRead = isRead();

    return book;
}

function AddBookToLibrary() {
    myLibrary.push(CreateBook());
}

function DisplayCards(library) {
    ClearBookshelf();

    let wasRead =
        'Read <i class="fa-solid fa-circle-check" style="color: #007007;"></i>';
    let wasntRead =
        'Didn\'t read <i class="fa-solid fa-circle-xmark" style="color: #9e0000;"></i>';

    for (let i = 0; i < library.length; i++) {
        let card = document.createElement("div");
        bookshelf.appendChild(card);
        card.classList.add("card");

        let title = document.createElement("h3");
        card.appendChild(title);
        title.classList.add("card_title");
        title.innerText = myLibrary[i].title;

        let author = document.createElement("p");
        card.appendChild(author);
        author.innerText = `by ${myLibrary[i].author}`;

        let pages = document.createElement("p");
        card.appendChild(pages);
        pages.innerText = `${myLibrary[i].pages} pages`;

        let isRead = document.createElement("p");
        card.appendChild(isRead);
        isRead.classList.add("read_status");

        if (myLibrary[i].isRead === true) {
            isRead.innerHTML = wasRead;
        } else {
            isRead.innerHTML = wasntRead;
        }

        let deleteBtn = document.createElement("button");
        card.appendChild(deleteBtn);
        deleteBtn.classList.add("card_del");
        deleteBtn.innerText = "X";
    }

    let delBtn = document.querySelectorAll(".card_del"); // event listener for each delete button
    delBtn.forEach(function (button, index) {
        button.addEventListener("click", function () {
            button.parentNode.remove();
            myLibrary.splice(index, 1);
        });
    });

    let readStatus = document.querySelectorAll(".read_status"); // toggle read status
    readStatus.forEach(function (toggle, index) {
        toggle.addEventListener("click", function () {
            myLibrary[index].toggleStatus();
            if (myLibrary[index].isRead === true) {
                toggle.innerHTML = wasRead;
            } else {
                toggle.innerHTML = wasntRead;
            }
        });
    });
}

function ResetForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}

function ClearBookshelf() {
    let cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }
}
