import React from "react";
import { useSelector } from "react-redux";
import { IsLoading } from "../Common/IsLoading";
import { MCQ } from "./Components/MCQ";

const Questions = () => {
  const question = useSelector((state) => state.questions.question);
  const questions = useSelector((state) => state.topics.questions);
  const isLoading = useSelector((state) => state.questions.isLoading);
  const lastQuestion = questions[questions.length - 1];
  return (
    <>
      {isLoading ? (
        <IsLoading/>
      ) : (
        <div>
          {question.type === "MCQ" ? (
            <MCQ data={question} lastQuestion={lastQuestion} />
          ) : (
            "Questions"
          )}
        </div>
      )}
    </>
  );
};

export { Questions };
