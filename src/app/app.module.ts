import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicNodeComponent } from './basicNode/basicNode.component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { StartNodeComponent } from './start-node/start-node.component';
import { DividerBranchLeftComponent } from './divider-branch-left/divider-branch-left.component';
import { DividerBranchRightComponent } from './divider-branch-right/divider-branch-right.component';
import { DividerBranchCenterComponent } from './divider-branch-center/divider-branch-center.component';

import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MonologComponent } from './monolog/monolog.component';
import { ScalingMenuComponent } from './scaling-menu/scaling-menu.component';
import { MenuComponent } from './menu/menu.component';
import { LinkComponent } from './link/link.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicNodeComponent,
    DrawingFieldComponent,
    StartNodeComponent,
    DividerBranchLeftComponent,
    DividerBranchRightComponent,
    DividerBranchCenterComponent,
    MonologComponent,
    DialogComponent,
    ScalingMenuComponent,
    MenuComponent,
    LinkComponent,
    DeleteDialogComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
