package com.exam.controller;

//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/questions")
public class QuestionController {

	@Autowired
	private QuestionService service;

	@Autowired
	private QuizService quizService;

	// add questions
	@PostMapping("/")
	public ResponseEntity<Questions> add(@RequestBody Questions questions) {
		return ResponseEntity.ok(this.service.addQuestion(questions));
	}

	// update questions
	@PutMapping("/")
	public ResponseEntity<Questions> update(@RequestBody Questions questions) {
		return ResponseEntity.ok(this.service.updateQuestion(questions));
	}

	// get all questions of any qid
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid) {
		Quiz quiz = this.quizService.getQuiz(qid);
		Set<Questions> questions = quiz.getQuestions();
		List<Questions> list = new ArrayList(questions);
		if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
		}
		list.forEach((q)->{
			q.setAnswer("");
		});
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}

	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("qid") Long qid) {
		Quiz quiz = new Quiz();
		quiz.setId(qid);
		Set<Questions> questionOfQuiz = this.service.getQuestionOfQuiz(quiz);
		return ResponseEntity.ok(questionOfQuiz);
	}

	// get single question
	@GetMapping("/{quesId}")
	public Questions get(@PathVariable("quesId") Long quesId) {
		return this.service.getQuestion(quesId);
	}

	// delete question
	@DeleteMapping("/{quesId}")
	public void delete(@PathVariable("quesId") Long quesId) {
		this.service.deleteQuestion(quesId);
	}

	// evaluate question
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Questions> question) {
		System.out.println(question);
		 double marksGot = 0;
		 int correctAnswer = 0;
		 int attempted = 0;
		 
		for(Questions q : question){
            //single questions
			Questions questions = this.service.get(q.getQuesId());
			if (questions.getAnswer().equals(q.getGivenAnswer())) {
                 correctAnswer++;
                 
                 double marksSingle=Double.parseDouble(question.get(0).getQuiz().getMaxmarks())/question.size();
                 marksGot +=marksSingle;
			}
			if (q.getGivenAnswer() != null && !q.getGivenAnswer().trim().isEmpty()) {
			    attempted++;
			}

		}
		Map<String,Object> map=Map.of("marksGot",marksGot,"correctAnswer",correctAnswer,"attempted",attempted);
		return ResponseEntity.ok(map);
	}

}
