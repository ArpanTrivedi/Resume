const Resume = require("../modals/resume");
const formidable = require("formidable");
const fs = require("fs");
const _ = require('lodash');

//get single user
exports.findThePerson = (req, res) => {
    let fName = req.params.name.split(" ")[0];
    let lName = req.params.name.split(" ")[1];

    if (fName === "" || lName === "") {
        return res.status(400).json({
            error: "please enter the complete name"
        });
    }

    Resume
        .find({firstname: fName, lastname: lName}, (err, person) =>{
            if (err) {
                return res.status(404).json({
                    error: "No such user is there",
                    message: err.message
                });
            }
            return res.status(200).json({
                person: person
            })
        })
};

//get data
exports.resumeGet = (req, res) => {
    Resume.find((err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Error happen",
                error: err.message,
                error: err
            });
        }
        else if (data.length == 0) {
            return res.status(500).json({
                message: "Error happen"
            });
        }
        return res.status(200).json({
            data
        });
    });
}

//upload data
exports.resumePost = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem happen" + err.message
            });
        }

        const {firstname, lastname, email, phonenumber, address} = fields;
        
        if (!firstname || !lastname || !email || !phonenumber || !address) {
            return res.status(400).json({
                message: "* fields can't be empty"
            });
        }

        let resume = new Resume(fields);

        if (file.cv) {
            resume.cv.data = fs.readFileSync(file.cv.path);
            resume.cv.contentType = file.cv.type;
        }

        resume.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "cv can't be send",
                    message: err.message
                });
            }
            return res.status(200).json({
                message: "data uploaded",
                resume: data
            })
        })

    });	
}

//delete the resume
exports.resumeDelete = (req, res) => {
    
    Resume
        .deleteOne({_id: req.params.resumeId}, (err, result) => {
            if(err || !result) {
                return res.status(404).json({
                    message: "Can't delete this section",
                    error : err
                });
            }

            return res.status(200).json({
                message: `The resume deleted successfully`
        });

    });	
};

//update the resume
exports.updateResume = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with updating"
        });
      }
      
      let resume = req.body;
      resume = _.extend(resume, fields);
      
      if (file.cv) {
        resume.cv.data = fs.readFileSync(file.cv.path);
        resume.cv.contentType = file.cv.type;
      }
  
      Resume
        .findOneAndUpdate({_id: req.params.resumeId}, {$set: resume}, (error,result)=>{
            if(err || !result){
                return res.status(404).json({
                    error:"can't modify the answer " + error.message
                });
            }
            return res.status(200).json({
                message:`Resume successfully modified`
            });
        });

    });
}