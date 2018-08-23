import { Component, OnInit, OnDestroy } from '@angular/core';
import { Intent } from 'models/intent';
import { Subscription } from 'rxjs/Subscription';
import { IntentService } from 'services/intent.service';

@Component({
  selector: 'app-intent-list',
  templateUrl: './intent-list.component.html',
  styleUrls: ['./intent-list.component.scss']
})
export class IntentListComponent implements OnInit, OnDestroy {
  intents: Intent[]=[];
  private subscription: Subscription;

  constructor(private intentService: IntentService) { }

  ngOnInit() {
    this.intents = this.intentService.getIntents();

    this.subscription = this.intentService.intentsChanged.subscribe((ints: Intent[]) => {
      this.intents = ints;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
