import { Pattern } from '../models/pattern';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notofication.service';
import { environment } from '../environments/environment';

@Injectable()
export class PatternService {

    DIANA_SERVER_URL = environment.dainaUrl;
    patterns: Pattern[] = [];
    patternsChanged = new Subject<Pattern[]>();
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient,private notificationService:NotificationService) {
        this.patterns = this.getPatterns();
        // this.patterns.push(...[
        //     new Pattern('Account No', '/^\d{10}$/'),
        //     new Pattern('Mobile No', '\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$')
        // ]);
    }

    getPatterns(): Pattern[] {
        this.http.get(`${this.DIANA_SERVER_URL}/blacklist`).subscribe((allPatterns: Pattern[]) => {
            console.log("GetPatterns:", allPatterns);
            this.patterns = allPatterns;
            console.log("This patterns:", this.patterns);
            this.patternsChanged.next(this.patterns);
            return this.patterns.slice();
        })
        return this.patterns.slice();


    }

    public addPattern(pattern: Pattern) {

        this.http.post(`${this.DIANA_SERVER_URL}/blacklist`, pattern, { headers: this.headers })
            .subscribe((res) => {
                this.patternsChanged.next(this.getPatterns());
                this.notificationService.showNotification('top','center','Pattern added successfully.','success');
            }, err => {
                this.notificationService.showNotification('top','center','Something went wrong','danger');
                console.log("Error  addPattern Response", err)
            });
    }


    public updatePattern(pattern: Pattern) {

        this.http.put(`${this.DIANA_SERVER_URL}/blacklist/${pattern._id}`, pattern, { headers: this.headers })
            .subscribe((res) => {
                this.patternsChanged.next(this.getPatterns());
                this.notificationService.showNotification('top','center','Pattern updated successfully.','success');
            }, err => {
                this.notificationService.showNotification('top','center','Something went wrong','danger');
                console.log("Error  updatePattern Response", err)
            });
    }





}