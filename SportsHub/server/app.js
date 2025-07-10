const express=require('express');
const app=express();
const cookieParser=require("cookie-parser");
const path=require('path');
const db=require("./config/mongoose-connection");
const expressSession=require("express-session");
const flash=require("connect-flash");

const ownersRouter=require("./routes/ownersRouter");
const usersRouter=require("./routes/usersRouter");
// const indexRouter=require("./routes/index");
const clubsRouter=require("./routes/clubsRouter");

require("dotenv").config();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());
app.use(express.static(path.join(__dirname,'public')));

// app.use("/",indexRouter);
// app.use("/owners",ownersRouter);
app.use("/users",usersRouter);

app.listen(3000);