import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CIModel } from '../../../models/ciservice';
import { CIService } from '../../../services/ci.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cis',
  templateUrl: './cis.component.html',
  styleUrls: ['./cis.component.scss']
})
export class CIComponent implements OnInit, OnDestroy {

  ciForm: FormGroup;
  ciModels: CIModel[];
  private subscription: Subscription;
  cis: string[] = ['Lex', 'GoogleDialogFlow', 'Alexa'];
  ciModel: CIModel;
  btnName: string;
  constructor(private ciService: CIService) { }

  ngOnInit() {
    this.btnName = 'Submit';
    this.ciForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'accessKey': new FormControl('', Validators.required),
      'secretKey': new FormControl(''),
      'enabled': new FormControl(0)
    });

    this.ciModels = this.ciService.getCiModels();
    this.subscription = this.ciService.ciModelsChanged.subscribe((cis: CIModel[]) => {
      this.ciModels = cis;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addCi() {
    let name = this.ciForm.value.name;
    let accessKey = this.ciForm.value.accessKey;
    let secretKey = this.ciForm.value.secretKey;
    if (this.btnName === 'Submit') {
      let ciModel = new CIModel(name, accessKey, secretKey);
      this.ciService.addCi(ciModel);
    }else{
      this.ciModel.name =  name;
      this.ciModel.accessKey =  accessKey;
      this.ciModel.secretKey =  secretKey;
      this.ciModel.enabled = this.ciForm.value.enabled?1:0;
      this.ciService.updateCiModel(this.ciModel);
      this.btnName = 'Submit';
    }

    this.ciForm.reset();
  }


  editCi(ciModel: CIModel) {
    this.ciForm.value.name;
    this.ciForm.controls['name'].patchValue(ciModel.name);
    this.ciForm.controls['accessKey'].patchValue(ciModel.accessKey);
    this.ciForm.controls['secretKey'].patchValue(ciModel.secretKey);
    this.ciForm.controls['enabled'].patchValue(ciModel.enabled);
    this.ciModel = ciModel;
    this.btnName = 'Update';
  }


}
