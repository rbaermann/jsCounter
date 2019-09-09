//global
const express = require("express");
const app = express();
const session = require("express-session");

//Use
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended : true }));

app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//Set
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Get
app.get("/", (req, res) => {
    if(req.session.counter == null) {
        req.session.counter = 1;
    }
    else {
        req.session.counter += 1;
    }
    res.render("Index", { Counter : req.session.counter });
});

app.get("/double", (req, res) => {
    if(req.session.counter == null) {
        req.session.counter = 0;
    }
    else {
        req.session.counter += 1;
    }
    res.redirect("/");
});

app.get("/reset", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

//Listen
app.listen(8000, () => {
    console.log("listening to port 8000")
});