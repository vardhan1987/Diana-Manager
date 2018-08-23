import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { PatternService } from '../../../services/patter.service';
import { Pattern } from '../../../models/pattern';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss']
})
export class PatternComponent implements OnInit, OnDestroy {

  patternForm: FormGroup;
  patterns: Pattern[];
  private subscription: Subscription;
  pattern: Pattern;
  btnName: string;

  constructor(private patternService: PatternService) { }

  ngOnInit() {
    this.btnName = 'Submit';
    this.patternForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'pattern': new FormControl('', Validators.required),
      'enabled':new FormControl(0)
    });
    this.patterns = this.patternService.getPatterns();
    this.subscription = this.patternService.patternsChanged.subscribe((patrns: Pattern[]) => {
      console.log("Subscribed data:",patrns);
      this.patterns = patrns;
    });

  }

  addPattern() {
    let name = this.patternForm.value.name;
    let patternValue = this.patternForm.value.pattern;
    let pattern = new Pattern(name, patternValue);
    if(this.btnName ==='Submit'){
      this.patternService.addPattern(pattern);
    }else{
      this.pattern.name=name;
      this.pattern.pattern = patternValue;
      this.pattern.enabled = this.patternForm.value.enabled?1:0;
      this.patternService.updatePattern(this.pattern);
      this.btnName = 'Submit';
    }
    
    this.patternForm.reset();
  }

  editPattern(pattern:Pattern){
    this.patternForm.controls['name'].patchValue(pattern.name);
    this.patternForm.controls['pattern'].patchValue(pattern.pattern);
    this.patternForm.controls['enabled'].patchValue(pattern.enabled);
    this.pattern =  pattern;
    this.btnName = 'Update';

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
