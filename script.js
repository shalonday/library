let library = [];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  // create card elements (card div, card body div, card title h5, card text p)
  this.card = document.createElement("div");
  this.card.className = "card";
  this.card.style.width = "18rem";
  this.body = document.createElement("div");
  this.body.className = "card-body";
  this.header = document.createElement("h5");
  this.header.className = "card-title";
  this.para = document.createElement("p");
  this.para.className = "card-text";

  // create text nodes for title and text
  let finished;
  this.titleNode = document.createTextNode(`Book Title: ${this.title}`);
  if (this.read == true) {
    finished = "Yes";
  }else { 
    finished = "No";
  }
  this.paraNode = document.createTextNode(`Author: ${this.author}\nPages: ${this.pages}\nFinished Reading: ${finished}`);

  // append text nodes to their elements
  this.header.appendChild(this.titleNode);
  this.para.appendChild(this.paraNode);

  // append elements to their parents
  this.body.appendChild(this.header);
  this.body.appendChild(this.para);
  this.card.appendChild(this.body);
   
}
//tasks: 
//define Book.prototype.display
//define Book.prototype.removeBookFromLibrary
//define DOM elements for each book in the book constructor
Book.prototype.info = function(){
  let str_init = this.title + " by " + this.author + ", " + this.pages + " pages.";
  let str_sec;
  if (this.read === true)
    str_sec = " Finished reading.";
  else if (this.read === false)
    str_sec = " Not read yet.";
  return str_init + str_sec;
}

Book.prototype.display = function(){
  // by appending card to body, it is displayed.
  document.body.appendChild(this.card);
}

Book.prototype.removeBookFromLibrary = function (){
  //find book in library where title == this.title then pop
  let book = library.find(function(book){
    if (book.title == this.title){
      return true;
    }
  });
  
}

function openForm(){
    // display form and hide this button
    document.getElementById("form").style.display = "block";

    document.getElementById("open").style.display = "none";
}

function addBookFromPrompt(){
  // create book
  alert("Hello user! Press OK to add a book to the library.");
  let title = prompt("What's the title of the book?");
  let author = prompt("Who's the author?");
  let pages = parseInt(prompt("How many pages is the book?"));
  let read = prompt("Have you read this book? Please enter Y/N.");
  while (!(read == "Y" || read == "N")){
    read = prompt("Wrong input. Have you read this book? Please enter Y/N.");
  }  
  if (read == "Y"){
    read = true;
  } else if (read == "F"){
    read = false;
  }
  addBookToLibrary(title,author,pages,read);
}

function addBookFromForm(){
  // check if all fields have values

  // assign values to variables that will be passed as arguments to addBook()
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = parseInt(document.getElementById("pages").value);
  let read;
  if (document.getElementById("read").value == "on"){
    read = true;
  } else {
    read = false;
  }

  addBookToLibrary(title,author,pages,read);
  closeForm(); 
  displayLibrary();
}

function addBookToLibrary(title, author, pages, read){
  
  let book = new Book(title, author, pages, read);
  let info = book.info();
  alert(`You have entered a book with the following info: ${info}`);

  // push book to library
  library.push(book);

}

function displayLibrary(){
  clearDisplay();

  /*
  let cardList = [];  // card divs
  let bodyList = [];  // card-body divs
  let titleList = []; // h5's
  let paraList = [];  // p's
  let paraNodes = []; // text nodes for paras
  let titleNodes = [];// text nodes for titles
  let finished;
  */

  library.forEach(function(book){
    book.display();
  });

  /*

  library.forEach(function(book, index, arr){
    // create card elements (card div, card body div, card title h5, card text p)
    cardList[index] = document.createElement("div");
    cardList[index].className = "card";
    cardList[index].style.width = "18rem";
    bodyList[index] = document.createElement("div");
    bodyList[index].className = "card-body";
    titleList[index] = document.createElement("h5");
    titleList[index].className = "card-title";
    paraList[index] = document.createElement("p");
    paraList[index].className = "card-text";

    // create text nodes for title and text
    titleNodes[index] = document.createTextNode(`Book Title: ${book.title}`);
    if (book.read == true) {
      finished = "Yes";
    }else { 
      finished = "No";
    }
    paraNodes[index] = document.createTextNode(`Author: ${book.author}\nPages: ${book.pages}\nFinished Reading: ${finished}`);

    // append text nodes to their elements
    titleList[index].appendChild(titleNodes[index]);
    paraList[index].appendChild(paraNodes[index]);

    // append elements to their parents
    bodyList[index].appendChild(titleList[index]);
    bodyList[index].appendChild(paraList[index]);
    cardList[index].appendChild(bodyList[index]);
    document.body.appendChild(cardList[index]); 
  });

  */

}

function closeForm(){
    document.getElementById("form").style.display = "none";
    document.getElementById("open").style.display = "inline";
}

function clearDisplay(){
  const cards = document.querySelectorAll(".card");
	for (var i = 0; i < cards.length; i++) {
	  cards[i].remove();
	}
}
