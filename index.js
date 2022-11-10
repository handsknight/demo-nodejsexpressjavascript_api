const Joi = require('joi');
const express = require('express');
const config = require('config');

var app = express();
app.use(express.json());

let courses = [
    { id: 1, name: 'mathematics' },
    { id: 2, name: 'englich' },
    { id: 3, name: 'biology' },
]

app.get('/', function (req, res) {
    res.send('hello world...');
});

app.get('/api/courses', function (req, res) {
    res.send(courses);
})

app.get('/api/courses/:id', function (req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found!');
    else res.send(course);
})

app.get('/api/courses/:id/:name', function (req, res) {
    res.send(req.query);
})


app.post('/api/courses', function (req, res) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }


    const course =
    {
        id: courses.length + 1,
        name: req.body.name
    };


    courses.push(course);

    res.send(course);
})

app.put('/api/courses/:id', function (req, res) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }

    //find
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('Course not found');
        return;
    }
    
    course.name = req.body.name;

    res.send(course);
})

app.delete('/api/courses/:id', function (req, res) {
    
    //find
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('Course not found');
        return;
    }
    
    const index = courses.indexOf(course);

    courses.splice(index, 1);

     

    res.send(courses);
})
const PORT = process.env.PORT || 3000;
const port = config.get('port');
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}

);