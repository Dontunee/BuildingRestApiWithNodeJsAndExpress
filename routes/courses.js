//Firstload express
const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: 'software programming'},
    {id:2, name: 'software testing'},
    {id:3, name: 'software development'}
];





router.get('/',(req,res) => {
   res.send(courses); 
});


//Read route parameters
router.get('/:id', (req,res) => {
     const course = courses.find(c => c.id === parseInt(req.params.id));
     if(!course){
        return   res.status(404).send('The course with the given ID was not found');
     }
        res.send(course);
 });

//Read query string parameters
//Stored in an object with key value pairs
router.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.query);
});

router.post('/', (req,res) => {
    //read body 
    //Input validation
    // if (!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('Name is required and should be minimum 3 characters');
    //     return;
    // }

    //define a schema e.g prop,max charcaters,type

    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);
    // if(result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    const {error} = validateCourse(req.body);//get result.error
    if(error){
        return res.status(400).send(result.error.details[0].message);
    };

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req,res) => {
    //Look up the course
    //If not existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
     if(!course) {
     return res.status(404).send('The course with the given ID was not found');
     }


    //validate the course
    //if invalid return 400
    const {error} = validateCourse(req.body);//get result.error
    if(error){
       return res.status(400).send(result.error.details[0].message);
    };


    //Update the course
    course.name = req.body.name;
    //return the updated course
    res.send(course);

});

router.delete('/:id', (req,res) => {
    //Look up the course
    //Not existing return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
     if(!course)  {
         return res.status(404).send('The course with the given ID was not found');
     };
    
     //Find index of course in courses array
     const index = courses.indexOf(course);
    //Delete
     courses.splice(index,1);

    //Return the same course
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return result = Joi.validate(course, schema);
}

module.exports = router;
