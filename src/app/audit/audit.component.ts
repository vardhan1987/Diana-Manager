import { Component, OnInit } from '@angular/core';
import { AuditService } from '../../services/audit.service';
import { Audit } from '../../models/audit';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector:'app-audit',
    templateUrl:'./audit.component.html',
    styles:['./audit.component.scss']
})
export class AuditComponent implements OnInit {

    audits:Audit[];
    subscription :Subscription;

    constructor(private auditService:AuditService){
        
    }

    ngOnInit() {
        this.audits =  this.auditService.getAll();
        this.subscription =  this.auditService.auditsChanged.subscribe((audts:Audit[])=>{
            this.audits = audts;
        });
    }

}