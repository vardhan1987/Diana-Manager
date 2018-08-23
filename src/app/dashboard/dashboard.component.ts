import { Component, OnInit } from '@angular/core';
import { CIService } from '../../services/ci.service';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../models/channel';
import { CIModel } from '../../models/ciservice';
import { Subscription } from 'rxjs/Subscription';
import { Answers } from '../../models/answers';
import { AnswerService } from '../../services/answers.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  channels: Channel[];
  fbReqCount: number;
  fbSuccessCount: number;
  channelSubscription: Subscription;

  twitterReqCount: number;
  twitterSuccessCount: number;

  slackReqCount: number;
  slackSuccessCount: number;

  ciModels: CIModel[];
  cisSubscription: Subscription;
  lexSuccessCount: number;
  lexReqCount: number;

  answers: Answers[];
  answerCount: number;
  unAnswerCount: number;
  failedCount: number;
  subscribtion: Subscription;

  constructor(private answerService: AnswerService, private channelService: ChannelService, private ciService: CIService) { }

  ngOnInit() {

    this.channels = this.channelService.getChannels();

    this.channelSubscription = this.channelService.channelsChanged
      .subscribe((chnld: Channel[]) => {
        this.channels = chnld;
        this.channels.forEach(channel => {
          console.log(channel);
          if (channel.name === 'facebook') {
            this.fbReqCount = channel.reqCount;
            this.fbSuccessCount = channel.successCount;
          }
          else if (channel.name === 'slack') {
            this.slackReqCount = channel.reqCount;
            this.slackSuccessCount = channel.successCount;
          } else if (channel.name === 'twitter') {
            this.twitterReqCount = channel.reqCount;
            this.twitterSuccessCount = channel.successCount;
          }

        });
      });


    this.ciModels = this.ciService.getCiModels();
    this.cisSubscription = this.ciService.ciModelsChanged.subscribe((cis: CIModel[]) => {
      this.ciModels = cis;
      this.ciModels.forEach(ci => {
        if (ci.name === 'Lex') {
          this.lexReqCount = ci.requestCount;
          this.lexSuccessCount = ci.responseCount;
        }
      })
    });


    this.answers = this.answerService.getAnsweredData();

    this.subscribtion = this.answerService.answersChanged.subscribe((ansr: Answers[]) => {
      this.answers = ansr;
      this.answerCount = this.answers.filter(ans => ans.status === '1').length;
      this.unAnswerCount = this.answers.filter(ans => ans.status === '0').length;
      this.failedCount = this.answers.filter(ans => ans.status === '2').length;

    });





  }

}
