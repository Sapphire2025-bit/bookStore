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
                <th>Title</th>
                <th>Price</th>
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
}

function read()
{
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

function exitRead()
{
    let bookInfo = document.getElementById("bookInfo");
    bookInfo.innerHTML = ``;
}

function update()
{
    console.log("update");
    console.log(this.parentElement);
}

function newBook()
{

}

//localStorage.clear();
displayBooks();

//event listeners - for all the clickable items in the page:
//read, update, delete, new book
let buttons = document.getElementsByClassName("read");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', read);
}
buttons = document.getElementsByClassName("update");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', update);
}
//only one this time (by id)
buttons = document.getElementById("newBook");
buttons.addEventListener('click', newBook);

