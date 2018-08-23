import { CIModel } from '../models/ciservice';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constant.service';
import { NotificationService } from './notofication.service';
import { environment } from '../environments/environment';


@Injectable()
export class CIService {
    
    DIANA_SERVER_URL = environment.dainaUrl;
    ciModels: CIModel[]=[];
    ciModelsChanged=new Subject<CIModel[]>();
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http:HttpClient,private notificationService:NotificationService) {
        this.ciModels = this.getCiModels();
        // this.ciModels.push(...[
        //     new CIModel('DialogFlow', 'ADAS79DDF#$DFFAGGBD', ''),
        //     new CIModel('Amazon Lex', 'HHDY%GGDDDDSD', 'DKFS-DFK78-GFDG324-324SDFSD'),
        //     new CIModel('Amazon Alexa', 'HHDY%GGDDDDSD', 'DKFS-DFK78-GFDG324-324SDFSD')
        // ]);
    }

    getCiModels(): CIModel[] {
        this.http.get(`${this.DIANA_SERVER_URL}/ciservice`).subscribe((ci:CIModel[])=>{
            this.ciModels =  ci;
            this.ciModelsChanged.next(this.ciModels);
            return this.ciModels.slice();
        })
        return this.ciModels.slice();
    }

    public addCi(ciModel:CIModel){
        ciModel.responseCount=0;
        ciModel.requestCount=0;
        this.http.post(`${this.DIANA_SERVER_URL}/ciservice`,ciModel, { headers: this.headers })
        .subscribe((res)=>{
            this.ciModelsChanged.next(this.getCiModels());
            this.notificationService.showNotification('top','center','CI Service added successfully.','success');
        },err =>{
            this.notificationService.showNotification('top','center','Something went wrong','danger');
            console.log("Error  Response",err)
        });
    }

    public updateCiModel(ciModel:CIModel){
        this.http.put(`${this.DIANA_SERVER_URL}/ciservice/${ciModel._id}`,ciModel, { headers: this.headers })
        .subscribe((res)=>{
            this.ciModelsChanged.next(this.getCiModels());
            this.notificationService.showNotification('top','center','CI Service updated successfully.','success');
        },err =>{
            this.notificationService.showNotification('top','center','Something went wrong','danger');
            console.log("Error  Response",err)
        });
    }

}