import booksData from "../data/books.json" with {type: 'json'}

function displayBooks()
{
    let allBooks;
    if(localStorage.getItem("books"))
    {
        //if we have the books data in local memory, take it from there
        allBooks = JSON.parse(localStorage.getItem("books"));   
    }
    else
    {
        //otherwise, use the imported data from JSON
        allBooks = booksData.books;
        //if we show from JSON, it means we don't have the data in the local memory yet
        localStorage.setItem("books", JSON.stringify(booksData.books));
    }
    
    //the parent container for the list of all books
    const booksContainer = document.getElementById("listContainer");

    //erase everything (all old appends) and add the headers
    booksContainer.innerHTML = `
            <div class="bookHeader">Id</div>
            <div class="bookHeader">Title</div>
            <div class="bookHeader">Price</div>
            <div class="bookHeader">Action</div>
            <div class="bookHeader"></div>
            <div class="bookHeader"></div>
        `;

    //fill with new data - books from JSON
    allBooks.forEach(book => {
        booksContainer.innerHTML += `
            <div class="id">${book.id}</div>
            <div class="title">${book.title}</div>
            <div class="price">₪${book.price}</div>
            <div class="read">Read</div>
            <div class="update">Update</div>
            <div class="delete"></div>
        `;
    });
}

displayBooks();