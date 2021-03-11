import { topicConstant, questionsConstants } from "./actionTypes";
import axios from "axios";

const token = localStorage.getItem("token");
const ATTEMPT_API_URL = process.env.REACT_APP_ATTEMPT_URL;

export const getTopicsLoading = () => ({
  type: topicConstant.GET_TOPICS_LOADING,
});

export const getTopicsSuccess = (payload) => ({
  type: topicConstant.GET_TOPICS_SUCCESS,
  payload,
});

export const getTopicsFailure = (payload) => ({
  type: topicConstant.GET_TOPICS_FAILURE,
  payload,
});

export const getTopics = (payload) => (dispatch) => {
  dispatch(getTopicsLoading());

  axios
    .get("http://localhost:5050/api/topic/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(getTopicsSuccess(res.data)))
    .catch((err) => dispatch(getTopicsFailure(err)));
};

export const attemptQuizLoading = () => ({
  type: questionsConstants.ATTEMPT_QUIZ_LOADING,
});

export const attemptQuizSuccess = (payload) => ({
  type: questionsConstants.ATTEMPT_QUIZ_SUCCESS,
  payload,
});

export const attemptQuizFailure = (payload) => ({
  type: questionsConstants.ATTEMPT_QUIZ_FAILURE,
  payload,
});

export const attemptQuiz = (payload) => (dispatch) => {
  dispatch(attemptQuizLoading());
  axios({
    method: "POST",
    url: `${ATTEMPT_API_URL}/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      topic_id: `${payload}`,
    },
  })
    .then((res) => dispatch(attemptQuizSuccess(res.data.data)))
    .catch((err) => dispatch(attemptQuizFailure(err)));
};