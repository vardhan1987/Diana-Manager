import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Answers } from '../models/answers';
import { Subject } from 'rxjs/Subject';
import { environment } from '../environments/environment';

@Injectable()
export class AnswerService {

    DIANA_SERVER_URL = environment.dainaUrl;
    answeredData: Answers[]=[];
    answersChanged = new Subject<Answers[]>();

    constructor(private http: HttpClient) { }

    getAnsweredData() :Answers[]{

        this.http.get(`${this.DIANA_SERVER_URL}/answers`)
            .subscribe((answer: Answers[]) => {
                this.answeredData = answer;
                this.answersChanged.next(this.answeredData.slice());
                return this.answeredData.slice();
            });
            return this.answeredData.slice();
    }

}