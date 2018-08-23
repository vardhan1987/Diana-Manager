import { HttpClient } from '@angular/common/http';
import { Audit } from '../models/audit';
import { Constants } from './constant.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../environments/environment';

@Injectable()
export class AuditService {

    DIANA_SERVER_URL = environment.dainaUrl;
    audits: Audit[] = [];
    auditsChanged= new Subject<Audit[]>();

    constructor(private http: HttpClient) { }


    getAll() :Audit[] {
        this.http.get(`${this.DIANA_SERVER_URL}/audit`).subscribe(((auditData: Audit[]) => {
            this.audits = auditData;
            this.auditsChanged.next(this.audits);
            return this.audits.slice();
        }));
        return this.audits.slice();
    }
}