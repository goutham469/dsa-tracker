const exp = require("express");
const { addRemainder, getRemaindersOfUser, getRemainders, markRemainderAsDone, updateRemainder, markRemainderAsNotDone, getRemainderByQuestion } = require("../controllers/revise.controller");
const reviseAPI = exp.Router();


reviseAPI.get("/" , getRemainders )
reviseAPI.get("/get-user-remainders" , getRemaindersOfUser )
reviseAPI.post("/add-remainder" , addRemainder )
reviseAPI.put("/mark-as-done" , markRemainderAsDone )
reviseAPI.put("/mark-as-not-done" , markRemainderAsNotDone )
reviseAPI.put("/update-task" , updateRemainder )
reviseAPI.get("/get-remainders-for-question" , getRemainderByQuestion )


module.exports = reviseAPI;