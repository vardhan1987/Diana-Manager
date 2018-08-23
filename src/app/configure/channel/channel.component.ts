import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Channel } from '../../../models/channel';
import { Subscription } from 'rxjs/Subscription';
import { ChannelService } from '../../../services/channel.service';

@Component({
    selector: 'app-channel',
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {


    channelForm: FormGroup;
    channels: Channel[];
    private subscription: Subscription;
    btnName: string;
    channel:Channel;


    constructor(private channelService: ChannelService) { }

    ngOnInit() {
        this.btnName = 'Submit';
        this.channelForm = new FormGroup({
            'name': new FormControl('', Validators.required),
            'webhookApi': new FormControl('', Validators.required),
            'verificationToken': new FormControl('', Validators.required),
            'enabled':new FormControl(0)
        });

        this.channels = this.channelService.getChannels();

        this.subscription = this.channelService.channelsChanged.subscribe((chnls: Channel[]) => {
            this.channels = chnls;
        });

    }

    addChannel() {
        let name = this.channelForm.value.name;
        let webhookApi = this.channelForm.value.webhookApi;
        let verificationToken = this.channelForm.value.verificationToken;
        
        if (this.btnName === 'Submit') {
            let channel =  new Channel(name, webhookApi, verificationToken);
            channel.enabled = this.channelForm.value.enabled?1:0;
            this.channelService.addChannel(channel);
        } else {
            this.channel.name =  name;
            this.channel.webhookApi =  webhookApi;
            this.channel.verificationToken =  verificationToken;
            this.channel.enabled = this.channelForm.value.enabled?1:0;
            this.channelService.updateChannel(this.channel);
            this.btnName = 'Submit';
        }
        this.channelForm.reset();

    }

    editChannel(channel: Channel) {
        this.channel = channel;
        this.channelForm.controls['name'].patchValue(channel.name);
        this.channelForm.controls['webhookApi'].patchValue(channel.webhookApi);
        this.channelForm.controls['verificationToken'].patchValue(channel.verificationToken);
        this.channelForm.controls['enabled'].patchValue(channel.enabled);
        this.btnName = 'Update';
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
