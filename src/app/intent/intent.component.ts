import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Intent } from 'models/intent';
import { Subscription } from 'rxjs/Subscription';
import { IntentService } from 'services/intent.service';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.scss']
})
export class IntentComponent implements OnInit {

  intentForm: FormGroup;

  btnName: string;
  intent: Intent;

  types = [{ value: "SIMPLE", display: "Simple" }, { value: "RICH", display: "Rich" }];

  constructor(private intentService: IntentService) { }

  ngOnInit() {
    this.btnName = 'Submit';
    this.intentForm = new FormGroup({
      'action': new FormGroup({
        'intentName': new FormControl(null, Validators.required),
        'utterances': new FormControl(null, Validators.required)
      }),
      'type': new FormControl("SIMPLE", Validators.required),
      'speechText': new FormControl(null),
      'displayText': new FormControl(null),
      'images': new FormArray([]),
      'buttons': new FormArray([])
    });



  }


  addIntent() {
    this.intent = this.intentForm.value;
    this.intent.action.utterances =
      this.intent.action.utterances.toString().indexOf('\n') > -1 ?
        this.intent.action.utterances.toString().split('\n') : [this.intent.action.utterances.toString()];
    this.intent.speechText = this.intent.speechText.toString().indexOf('\n') > -1 ?
      this.intent.speechText.toString().split('\n') : [this.intent.speechText.toString()];
    this.intent.displayText = this.intent.displayText.toString().indexOf('\n') > -1 ?
      this.intent.displayText.toString().split('\n') : [this.intent.displayText.toString()];
    console.log(this.intent);
    this.intent.action.slots = [];
    this.intent.action.utterances.filter(utterance => {
      console.log('Iterating :', utterance, utterance.toString().indexOf('<START:'));
      if (utterance.toString().indexOf('<START:') > -1) {
        const start = utterance.toString().indexOf('<START:') + 7;
        const end = utterance.toString().indexOf('>');
        const slotValue = utterance.substring(start, end);
        const exist = this.intent.action.slots.filter(s => s === slotValue);
        if (exist.length === 0) {
          this.intent.action.slots.push(slotValue);
        }
      }
    });
    this.intent.action.hasSlots = this.intent.action.slots.length > 0 ? true : false;
    this.intentService.addIntent(this.intent);
    this.intentForm.reset();
  }

  addButtons() {
    (<FormArray>this.intentForm.get('buttons')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'value': new FormControl(null, Validators.required)
      })
    );
  }

  addImages() {

    (<FormArray>this.intentForm.get('images')).push(
      new FormGroup({
        'url': new FormControl(null, Validators.required),
        'alt': new FormControl(null, Validators.required)
      })
    );
  }



}
