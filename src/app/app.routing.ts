import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { TestSkillComponent } from './test/test.component';
import { ApisComponent } from './apis/apis.component';
import { UnansweredComponent } from './unanswered/unanswered.component';
import { ConfigureComponent } from './configure/configure.component';
import { PatternComponent } from './configure/pattern/pattern.component';
import { ChannelComponent } from './configure/channel/channel.component';
import { CIComponent } from './configure/ci-service/cis.component';
import { AuditComponent } from './audit/audit.component';
import { IntentComponent } from './intent/intent.component';
import { HomeIntentComponent } from './intent/home/home-intent/home-intent.component';
import { IntentListComponent } from './intent/home/intent-list/intent-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'testSkill', component: TestSkillComponent },
  { path: 'audit', component: AuditComponent },
  {
    path: 'configure', component: ConfigureComponent, children: [
      { path: 'pattern', component: PatternComponent },
      { path: 'channel', component: ChannelComponent },
      { path: 'cis', component: CIComponent }
    ]
  },
  { path: 'apis', component: ApisComponent },
  { path: 'uqueries', component: UnansweredComponent },
  { path: 'homeIntent', component: HomeIntentComponent,
      children: [{ path: 'intent', component: IntentComponent },
                 { path: '', component: IntentListComponent}] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
