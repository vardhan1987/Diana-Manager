import { Channel } from '../models/channel';
import { Subject } from 'rxjs/Subject';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './constant.service';
import { NotificationService } from './notofication.service';
import { environment } from '../environments/environment';


@Injectable()
export class ChannelService {


    DIANA_SERVER_URL = environment.dainaUrl;
    channels: Channel[] = [];
    channelsChanged = new Subject<Channel[]>();
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient,private notificationService:NotificationService) {
        this.channels = this.getChannels();
        // this.channels.push(...[
        //     new Channel('Facebook', 'https://evolvus.diana.com/ai/facebook', 'ANHJD7DHJDF-YDJKJJH7'),
        //     new Channel('Twitter', 'https://evolvus.diana.com/ai/twitter', 'UUHDKH-IIKDHJD68GSJ'),
        //     new Channel('Slack', 'https://evolvus.diana.com/ai/slack', 'YYSJKFHJ556-KKSIJDHJD223')
        // ]);
    }

    getChannels(): Channel[] {

        this.http.get(`${this.DIANA_SERVER_URL}/channel`).subscribe((chnls: Channel[]) => {
            this.channels = chnls;
            
            this.channelsChanged.next(this.channels);
            return this.channels.slice();
        });
        return this.channels.slice();

    }

    /**
     * This method expect channel Object/Model to save into database.
     * @param channel 
     */
    public addChannel(channel: Channel) {
        this.http.post(`${this.DIANA_SERVER_URL}/channel`, channel, { headers: this.headers })
            .subscribe((res) => {
                this.channelsChanged.next(this.getChannels());
                this.notificationService.showNotification('top','center','Channel added successfully.','success');
            }, err => {
                this.notificationService.showNotification('top','center','Something went wrong','danger');
                console.log("Error addChannel  Response", err);
            });

    }

    /**
     * This method expect channel Object/Model  to update the channel._id parameter.
     * @param channel 
     */
    public updateChannel(channel: Channel) {
        this.http.put(`${this.DIANA_SERVER_URL}/channel/${channel._id}`, channel, { headers: this.headers })
            .subscribe((res) => {
                this.channelsChanged.next(this.getChannels());
                this.notificationService.showNotification('top','center','Channel updated successfully.','success')
            }, err => {
                this.notificationService.showNotification('top','center','Something went wrong','danger')
                console.log("Error updateChannel Response", err);
            });
    }


   

    


}