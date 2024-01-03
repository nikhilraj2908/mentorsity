const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 5000;

console.log("uuid:",uuidv4())

app.use(bodyParser.json());
app.use(session({
  name:'SessionCookie',
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.get('/',(req,res)=>{
    res.send("Session ID and Cookies Created Successfully!!!")
})

app.post('/signup', (req, res) => {
  console.log("Session ID created Successfully",req.sessionID)
  const { username, email,password } = req.body;
  req.session.user = { username, email, password };
  console.log("Cookies created successfuly",req.session.cookie) 
  res.send('Signup successful!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
