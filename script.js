let library = [];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    let str_init = title + " by " + author + ", " + pages + " pages.";
    let str_sec;
    if (read === true)
      str_sec = " Finished reading.";
    else if (read === false)
      str_sec = " Not read yet.";
    return str_init + str_sec;
  }
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
  closeForm(); // doesn't work kapag nasa pinakababa nakadefine yung closeForm() function. why???
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

  let cardList = [];  // card divs
  let bodyList = [];  // card-body divs
  let titleList = []; // h5's
  let paraList = [];  // p's
  let paraNodes = []; // text nodes for paras
  let titleNodes = [];// text nodes for titles
  let finished;
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
