const express = require('express'); //returns a function
const app = express(); //returns an object of type Express
//app.get(); corresponds to respective http verbs or actions 
//others are app.put(); app.post(); app.delete();

app.get('/',(req, res) => {
    res.send("Avinash is awesome! But beware, life is tricky");
});

app.get('/api/courses',(req, res) => {
    res.send([1, 2, 3]);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
