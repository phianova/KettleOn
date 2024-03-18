import mongoose from "mongoose";

export interface Question {
    question: String,
    asked: Date
  }
   
  export interface MongoQuestion extends Question, mongoose.Document {}
   
  export type TQuestion = {
    question: String,
    asked: Date
  };


const QuestionSchema = new mongoose.Schema<Question>({
  question: {type: String, required: true},
  asked: {type: Date}

});

export default mongoose.models.Question || mongoose.model<Question>("Question", QuestionSchema);