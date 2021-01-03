const router = require('express').Router();
const {resumeGet, resumePost, resumeDelete, updateResume, findThePerson} = require('../controller/resume');


//get route(see all the people applied)
router.get('/person/:name', findThePerson);

//get route(find the person)
router.get('/allApplicant', resumeGet);


//post route
router.post('/upload', resumePost);

//delete route
router.delete('/delete/:resumeId', resumeDelete);

//update route
router.put('/update/:resumeId', updateResume);

module.exports = router