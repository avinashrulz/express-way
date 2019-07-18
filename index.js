const Joi = require('joi');//returns a class hence te Pascal naming convention.
const express = require('express'); //returns a function
const app = express(); //returns an object of type Express
//app.get(); corresponds to respective http verbs or actions 
//others are app.put(); app.post(); app.delete();

app.use(express.json());

const courses = [

{id:1, name: 'course1'},
{id:2, name: 'course2'},
{id:3, name: 'course3'}

];

app.get('/',(req, res) => {
    res.send("Avinash is awesome! But beware, life is tricky");
});

app.get('/api/courses',(req, res) => {
    res.send(courses);
});

    app.get('/api/courses/:id',  (req, res) => {
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if(!course) res.status(404).send("Course not found");
        res.send(course); 
        });



app.post('/api/courses', (req, res) => {

    const schema = {

        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);//returns an object
    
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    }

const course = {
    id: courses.length+1, 
    name: req.body.name
};

    courses.push(course);
    res.send(course); //By convention, send the newly added object back to client for reference.
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
