package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;

public interface QuestionService {
	public Questions addQuestion(Questions questions);

	public Questions updateQuestion(Questions questions);

	public Set<Questions> getQuestion();

	public Questions getQuestion(Long questionId);

	public Set<Questions> getQuestionOfQuiz(Quiz quiz);
	
	public void deleteQuestion(Long quesId);
	
	public Questions get(Long questionsId);
}
