const exp = require('express');
const { addAnswer, getAnswers, updateAnswer, deleteAnswer, changeRank, getAnswersForQuestion } = require('../controllers/answers.controller');
const answersAPI = exp.Router()


answersAPI.get('/' , getAnswers );
answersAPI.post('/add-answer' , addAnswer );
answersAPI.put('/update-answer' , updateAnswer );
answersAPI.delete('/delete-answer' ,deleteAnswer );
answersAPI.put('/update-rank' , changeRank )
answersAPI.get('/get-answers-for-question' , getAnswersForQuestion)


module.exports = answersAPI;