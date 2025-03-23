const exp = require("express");
const { addQuestion, getQuestions, changeQuestionVisibility, markAsCompleted, markAsInCompleted } = require("../controllers/questions.controller");
const questionsAPI = exp.Router();

questionsAPI.post("/add-question" , addQuestion )
questionsAPI.get('/' , getQuestions );
questionsAPI.put('/change-visibility-to-public' , changeQuestionVisibility );
questionsAPI.put('/mark-as-completed' , markAsCompleted )
questionsAPI.put('/mark-as-incomplete' , markAsInCompleted )


module.exports = questionsAPI;