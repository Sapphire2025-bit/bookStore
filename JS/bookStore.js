import booksData from "../data/books.json" with {type: 'json'}

function displayBooksFromJson()
{
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
    booksData.books.forEach(book => {
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

displayBooksFromJson();