import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../../services/answers.service';
import { Answers } from '../../models/answers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-unanswered',
  templateUrl: './unanswered.component.html',
  styleUrls: ['./unanswered.component.scss']
})
export class UnansweredComponent implements OnInit {

  dialogFlowQueries :any[]=[];
  lexQueries :any[]=[];
  answers:Answers[];
  subscribtion:Subscription;

  constructor(private answerService:AnswerService) { }

  ngOnInit() {
    this.answers = this.answerService.getAnsweredData();

    this.subscribtion = this.answerService.answersChanged.subscribe((ansr:Answers[])=>{
      this.answers = ansr;
    });
  }

}
