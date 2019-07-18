const Joi = require('joi');//returns a class hence te Pascal naming convention.
const express = require('express'); //returns a function
const app = express(); //returns an object of type Express

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
            if(!course) return res.status(404).send("Course not found");
        res.send(course); 
        });



app.post('/api/courses', (req, res) => {

//validate the request
//if invalid, return 400
const { error } = validateCourse(req.body); //eqivalent to getting result.error
if (error) return res.status(400).send(error.details[0].message);


const course = {
    id: courses.length+1, 
    name: req.body.name
};

    courses.push(course);
    res.send(course); //By convention, send the newly added object back to client for reference.
});


app.put('/api/courses/:id', (req, res) => {
//look up the course
//return 404 if course doesn't exists
const course = courses.find(c => c.id === parseInt(req.params.id));
            if(!course) return res.status(404).send("Course not found");

//validate the request
//if invalid, return 400
const { error } = validateCourse(req.body); //eqivalent to getting result.error
if (error) return res.status(400).send(error.details[0].message);


//update the course 
course.name = req.body.name;

//return the updated course
res.send(course);

});


app.delete('/api/courses/:id', (req, res) => {
//look up the course
//return 404 if course doesn't exists
const course = courses.find(c => c.id === parseInt(req.params.id));
            if(!course) return res.status(404).send("Course not found");

//Delete the course using splice method
const index = courses.indexOf(course);
courses.splice(index, 1);

res.send(course);

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

function validateCourse(course){

    const schema = {
        name: Joi.string().min(3).required()
    };    
    return Joi.validate(course, schema);//returns an object
}