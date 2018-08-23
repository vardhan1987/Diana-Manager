import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-intent',
  templateUrl: './home-intent.component.html',
  styleUrls: ['./home-intent.component.scss']
})
export class HomeIntentComponent implements OnInit {

  active:boolean=false;

  constructor() { }

  ngOnInit() {
  }

}
