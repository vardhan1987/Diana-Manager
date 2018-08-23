
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Intent } from 'models/intent';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class IntentService {

    NLP_SERVICE_URL = environment.nlpUrl;
    intents: Intent[] = [];
    intentsChanged = new Subject<Intent[]>();
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) {
        this.intents = this.getIntents();
    }

    getIntents() {
        this.http.get(`${this.NLP_SERVICE_URL}/sr/all`).subscribe((ints:any) => {
            this.intents = ints.body;
            this.intentsChanged.next(this.intents);
            return this.intents.slice();
        });
        return this.intents.slice();
    }

   /**
     * This method expect intent Object/Model to save into mongo database.
     * @param intent
     */
    public addIntent(intent: Intent) {
        this.http.post(`${this.NLP_SERVICE_URL}/sr`, intent, { headers: this.headers })
            .subscribe((res) => {
                this.intentsChanged.next(this.getIntents());
                //this.notificationService.showNotification('top','center','Channel added successfully.','success');
            }, err => {
                //this.notificationService.showNotification('top','center','Something went wrong','danger');
                console.log("Error addChannel  Response", err);
            });
    }
}