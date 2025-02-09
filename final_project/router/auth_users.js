const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    for(i in users){
        if(i.username===username){
            return true;
        }
    }
    return false;
}

const authenticatedUser = (username,password)=>{ 
    const user1=users.filter(k=>k.username===username);
    return password===user1[0].password;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username=req.body.username;
    const password=req.body.password;
    if(!username || !password){
        res.status(404).json({message:'invalid username or no password'});
    }
    if (authenticatedUser(username,password)){
        let accessToken =jwt.sign({
            data:password
        },'access',{expiresIn: 60*60});
        req.session.authorization={accessToken, password};
        return res.status(200).send("user successfully logged in"); 
    }
    else{
        return res.status(208).json({message:"invalid login."})
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const review=req.query.review;
    if (book) {
        book.reviews[username] = review;
        return res.status(200).json(book);
    }
    return res.status(404).json({ message: "Invalid ISBN" });

});

  // delete book review
  regd_users.delete("/auth/review/:isbn", (req, res) => {
    if (book) {
        delete book.reviews[username];
        return res.status(200).json(book);
    }
    return res.status(404).json({ message: "Invalid ISBN" });
   })

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
