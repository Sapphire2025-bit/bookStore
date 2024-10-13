import booksData from "../data/books.json" with {type: 'json'}

function displayBooksFromJson()
{
    const booksContainer = document.getElementById("listContainer");

    //erase everything (all old appends)
    booksContainer.innerHTML = "";
    booksData.forEach(book => {
        let bookInfo = document.createElement("div");
        bookInfo.innerHTML = `
            <div>${book.id}</div>
            <div id="title">${book.title}</div>
            <div id="price">${book.price}</div>
            <div id="read">Read</div>
            <div id="update">Update</div>
            <div id="delete">trash</div>
        `;
    });
}

displayBooksFromJson();