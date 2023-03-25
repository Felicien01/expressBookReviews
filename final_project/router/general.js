const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username=req.body.username;
    const password=req.body.password;
    if(!username || !password){
        return res.status(404).json({message:"error registering"});
    }
    else{
        users.push({"username":username,"password":password});
        return res.status(200).send('user successfully registered')
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn=req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const key=Object.keys(books);
    const goodBook=[];
    const author=req.params.author;
    for(i of key){
        if (books[i].author===author){
            goodBook.push(books[i]);
        }
    }
    res.send(goodBook);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const key=Object.keys(books);
    const goodBook=[];
    const title=req.params.title;
    for(i of key){
        if (books[i].title===title){
            goodBook.push(books[i]);
        }
    }
    res.send(goodBook);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn=req.params.isbn;
    res.send(books[isbn].review);
});

module.exports.general = public_users;
