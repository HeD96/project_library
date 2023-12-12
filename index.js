class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    ToggleReadStatus(currentBook, readStatus) {
        if (currentBook.isRead === "yes") {
            readStatus.innerText === "Didn't Read";
        }
    }
}

const Bookshelf = (function () {
    const DisplayBooks = function (library) {
        let bookshelf = document.querySelector(".bookshelf");

        ClearTheShelf();

        library.forEach(function (book, i) {
            let bookCard = document.createElement("div");
            bookCard.classList.add("card");
            bookshelf.appendChild(bookCard);

            let delCardBtn = document.createElement("img");
            delCardBtn.classList.add("card-del");
            delCardBtn.setAttribute("src", "./images/close-button.svg");
            bookCard.appendChild(delCardBtn);

            delCardBtn.addEventListener("click", function () {
                library.splice(i, 1);
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
    };

    const ClearTheShelf = function () {
        let bookCards = document.querySelectorAll(".card");
        bookCards.forEach(function (card) {
            card.remove();
        });
    };

    return {
        DisplayBooks,
    };
})();

const FormHandler = (function () {
    const myLibrary = [];

    const InitializeForm = function () {
        let openFormBtn = document.querySelector("#new");
        openFormBtn.addEventListener("click", ToggleForm);

        let refreshBtn = document.querySelector("#refresh");
        refreshBtn.addEventListener("click", function () {
            Bookshelf.DisplayBooks(myLibrary);
        });

        let addBookBtn = document.querySelector("#add");
        addBookBtn.addEventListener("click", function (e) {
            e.preventDefault();
            ValidateForm();
        });

        let closeFormBtn = document.querySelector("#close");
        closeFormBtn.addEventListener("click", ToggleForm);
    };

    const ToggleForm = function () {
        let bookForm = document.querySelector(".newbook-form");
        bookForm.classList.toggle("invisible");
    };

    const ClearForm = function (title, author, pages, isRead) {
        title.value = "";
        author.value = "";
        pages.value = "";

        isRead.forEach(function (radio) {
            if (radio.value === "yes") {
                radio.checked = true;
            }
        });
    };

    const ValidateForm = function () {
        let titleInput = document.querySelector("#title");
        let authorInput = document.querySelector("#author");
        let pagesInput = document.querySelector("#num_pages");
        let isReadInput = document.querySelectorAll("input[name=read]");

        if (titleInput.value === "") {
            ErrorMessage(titleInput);
        }

        if (authorInput.value === "") {
            ErrorMessage(authorInput);
        }

        if (pagesInput.value === "") {
            ErrorMessage(pagesInput);
        }

        if (
            titleInput.value !== "" &&
            authorInput.value !== "" &&
            pagesInput.value !== ""
        ) {
            AddBookToLibrary(titleInput, authorInput, pagesInput, isReadInput);
        }
    };

    const ErrorMessage = function (inputField) {
        if (inputField.value === "") {
            inputField.classList.toggle("invalid");
            setTimeout(function () {
                inputField.classList.toggle("invalid");
            }, 2000);
        }
    };

    const AddBookToLibrary = function (title, author, pages, isRead) {
        let book = new Book();

        book.title = title.value;
        book.author = author.value;
        book.pages = pages.value;
        book.isRead;

        isRead.forEach(function (radio) {
            if (radio.checked) {
                book.isRead = radio.value;
            }
        });

        myLibrary.push(book);

        Bookshelf.DisplayBooks(myLibrary);
        ToggleForm();
        ClearForm(title, author, pages, isRead);
    };

    return {
        InitializeForm,
    };
})();

FormHandler.InitializeForm();
