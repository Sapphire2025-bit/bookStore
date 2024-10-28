import booksData from "../data/books.json" with {type: 'json'}

let allBooks;
let nextId;

function displayBooks()
{
    if(localStorage.getItem("books") && localStorage.getItem("nextId"))
    {
        //if we have the books data in local memory, take it from there
        allBooks = JSON.parse(localStorage.getItem("books"));
        nextId = localStorage.getItem("nextId");
    }
    else
    {
        //otherwise, use the imported data from JSON
        allBooks = booksData.books;
        //if we show from JSON, it means we don't have the data in the local memory yet
        localStorage.setItem("books", JSON.stringify(booksData.books));
        //set to -1 to declare we need to parse the JSON to find the next id
        nextId = -1;
    }
    
    //the parent container for the list of all books
    const table = document.getElementById("table");

    //erase everything (all old appends) and add the headers
    table.innerHTML = `
        <table>
            <tr>
                <th>Id</th>
                <th id="titleSort">Title ▼</th>
                <th id="priceSort">Price ▼</th>
                <th>Action</th>
                <th></th>
                <th></th>
            </tr>
        </table>
        `;

    //fill with new data - books from JSON
    let maxId = -1;
    allBooks.forEach(book => {
        table.innerHTML += `
        <tr>
            <th class="id">${book.id}</th>
            <th class="title">${book.title}</th>
            <th class="price">₪${book.price}</th>
            <th class="read">Read</th>
            <th class="update">Update</th>
            <th class="delete"></th>
        </tr>
        `;
        maxId = maxId > book.id ? maxId : book.id;
    });
    //if we took the data from JSON file (nextId is -1), use the max id found +1
    nextId = nextId < 0 ? maxId + 1 : nextId;
    localStorage.setItem("nextId", nextId);

    //event listeners - for all the clickable items in the page:
    //read, update, delete
    let buttons = document.getElementsByClassName("read");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', read);
    }
    buttons = document.getElementsByClassName("update");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', update);
    }
    buttons = document.getElementsByClassName("delete");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    }

    //sort
    document.getElementById("titleSort").addEventListener('click', sortDataByTitle);
    document.getElementById("priceSort").addEventListener('click', sortDataByPrice);
}

function read()
{
    exitNewBook();
    let data = this.parentElement.children;
    let bookInfo = document.getElementById("bookInfo");
    let id = data[0].textContent;
    let title, pic, price, rating;
    
    allBooks.forEach(book => {
        if(book.id == id)
        {
            title = book.title;
            pic = book.image;
            price = book.price;
            rating = book.rating;
        }
    });
    bookInfo.innerHTML = `
        <button id="exitRead">X</button>
        <div id="title">${title}</div>
        <div id="moreInfo">
            <img class="class-img" src="${pic}" alt="${title}">
            <div id="price_rating">
                <div id="price">₪${price}</div>
                <div id="rating">
                    <button id="decrease">-</button>
                    <div id="ratingNumber">${rating}</div>
                    <button id="increase">+</button>
                </div>
            </div>
        </div>
    `;
    let exit = document.getElementById("exitRead");
    exit.addEventListener('click', exitRead);
}

function DecreaseRating()
{}

function IncreaseRating()
{}

function exitRead()
{
    let bookInfo = document.getElementById("bookInfo");
    bookInfo.innerHTML = ``;
}

function update()
{
    exitRead();
    let newBookForm = document.getElementById("newBookForm");
    let data = this.parentElement.children;
    
    let id = data[0].textContent;
    let title = data[1].textContent;
    let price = data[2].textContent.slice(1);
    console.log(title);
    //find the image on the allBooks array by book id

    newBookForm.innerHTML = `
        <form id="newBookForm">
        <button id="closeNewBook">X</button>
            <h1 id="formTitle">Update Book</h1>
            <label>
                Id
                <br>
                <input type="number" id="BookId" name="id" value=${id} min=1 readonly>
            </label>
            <br>
            <label>
                Title
                <br>
                <input type="text" id="title" name="title" value=${title} required>
            </label>
            <br>
            <label>
                Price
                <br>
                <input type="number" id="price" name="price" min=1 max=999.99 step=0.01 value=${price} required>
            </label>
            <br>
            <label>
                Cover Image URL
                <br>
                <input type="file" id="image" name="imageUrl">
            </label>
            <br>
            <button type="submit">Add</button>
        </form> 
    `;

    document.getElementById('closeNewBook').addEventListener('click', function(event) {
        event.preventDefault();
        exitNewBook();
    });
    
    document.getElementById("newBookForm").addEventListener('submit', verifyInputUpdate);
}

function newBook()
{
    exitRead();
    let newBookForm = document.getElementById("newBookForm");
    newBookForm.innerHTML = `
        <form id="newBookForm">
            <button id="closeNewBook">X</button>
            <h1 id="formTitle">+ New Book</h1>
            <label>
                Id
                <br>
                <input type="number" id="BookId" name="id" value=${nextId} min=1 required>
            </label>
            <br>
            <label>
                Title
                <br>
                <input type="text" id="title" name="title" required>
            </label>
            <br>
            <label>
                Price
                <br>
                <input type="number" id="price" name="price" min=1 max=999.99 step=0.01 required>
            </label>
            <br>
            <label>
                Cover Image URL
                <br>
                <input type="file" id="image" name="imageUrl">
            </label>
            <br>
            <button type="submit">Add</button>
        </form> 
    `;

    document.getElementById('closeNewBook').addEventListener('click', function(event) {
        event.preventDefault();
        exitNewBook();
    });

    document.getElementById("newBookForm").addEventListener('submit', verifyInput);
}

function exitNewBook()
{
    let newBookForm = document.getElementById("newBookForm");
    newBookForm.innerHTML = ``;
}

function verifyInput(event)
{
    event.preventDefault();

    let currentId = document.getElementById("BookId").value;
    allBooks.forEach(book => {
        if(book.id == currentId)
            return;
    });
    let currentTitle = document.getElementById("title").value;
    if(currentTitle == "")
        return;
    let currentPrice = document.getElementById("price").value;
    let currentImage = document.getElementById("image").value;


    //if we reached here, the id is valid. push the new book to all books, and update the JSON file
    allBooks.push({ "id": currentId,
        "title": currentTitle,
        "price": currentPrice,
        "image": currentImage,
        "rating": 0});

    //pick the next id:
    nextId = (+nextId < +currentId) ? +currentId + 1 : +nextId + 1;

    //update the local storage
    localStorage.setItem("books", JSON.stringify(allBooks));
    localStorage.setItem("nextId", nextId);
    //remove the form
    exitNewBook();
    //show the updated book list
    displayBooks();
}

function verifyInputUpdate(event)
{
    event.preventDefault();

    let currentTitle = document.getElementById("title").value;
    console.log(currentTitle);
    if(currentTitle == "")
        return;
    let currentId = document.getElementById("BookId").value;
    let currentPrice = document.getElementById("price").value;
    let currentImage = document.getElementById("image").value;

    allBooks.forEach(book => {
        if(book.id == currentId)
        {
            book.title = currentTitle;
            book.price = currentPrice;
            book.image = currentImage;
        }
    });

    //update the local storage
    localStorage.setItem("books", JSON.stringify(allBooks));
    //remove the form
    exitNewBook();
    //show the updated book list
    displayBooks();
}

function remove()
{
    let data = this.parentElement.children;
    let id = data[0].textContent;
    allBooks = allBooks.filter(book => book.id !== id);
    //update the local storage:
    localStorage.setItem("books", JSON.stringify(allBooks));
    //show the updated book list
    displayBooks();
}

function sortDataByTitle()
{
    allBooks = allBooks.sort((a,b) => a.title.localeCompare(b.title));
    localStorage.setItem("books", JSON.stringify(allBooks));
    displayBooks();
}

function sortDataByPrice()
{
    allBooks = allBooks.sort((a,b) => Number(a.price) - Number(b.price));
    localStorage.setItem("books", JSON.stringify(allBooks));
    displayBooks();
}

//localStorage.clear();
displayBooks();

//new book button
let button = document.getElementById("newBook");
button.addEventListener('click', newBook);

