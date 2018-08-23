import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { TestSkillComponent } from './test/test.component';
import { AwsSignature } from './aws/aws-signature';
import { HttpClientModule } from '@angular/common/http';
import { UnansweredComponent } from './unanswered/unanswered.component';
import { ApisComponent } from './apis/apis.component';
import { PatternComponent } from './configure/pattern/pattern.component';
import { ChannelComponent } from './configure/channel/channel.component';
import { ConfigureComponent } from './configure/configure.component';
import { CIComponent } from './configure/ci-service/cis.component';
import { PatternService } from '../services/patter.service';
import { ChannelService } from '../services/channel.service';
import { CIService } from '../services/ci.service';
import { Constants } from '../services/constant.service';
import { NotificationService } from '../services/notofication.service';
import { AuditComponent } from './audit/audit.component';
import { AuditService } from '../services/audit.service';
import { AnswerService } from '../services/answers.service';
import { IntentComponent } from './intent/intent.component';
import { IntentService } from 'services/intent.service';
import { HomeIntentComponent } from './intent/home/home-intent/home-intent.component';
import { IntentListComponent } from './intent/home/intent-list/intent-list.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    TestSkillComponent,
    UnansweredComponent,
    ApisComponent,
    ConfigureComponent,
    PatternComponent,
    ChannelComponent,
    CIComponent,
    AuditComponent,
    IntentComponent,
    HomeIntentComponent,
    IntentListComponent
  ],
  imports: [
  BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [AwsSignature, PatternService,
    AuditService, ChannelService, CIService,
    Constants, NotificationService,
    AnswerService,IntentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
