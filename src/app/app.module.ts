import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicNodeComponent } from './nodeComponents/basicNode/basicNode.component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { StartNodeComponent } from './nodeComponents/start-node/start-node.component';
import { DividerBranchComponent } from './nodeComponents/divider-branch/divider-branch.component';

import { DialogComponent } from './nodeComponents/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MonologComponent } from './nodeComponents/monolog/monolog.component';
import { ScalingMenuComponent } from './uiComponents/scaling-menu/scaling-menu.component';
import { MenuComponent } from './nodeComponents/menu/menu.component';
import { LinkComponent } from './nodeComponents/link/link.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DeleteDialogComponent } from './uiComponents/delete-dialog/delete-dialog.component';
import { SidebarComponent } from './uiComponents/sidebar/sidebar.component';
import { DividerComponent } from './nodeComponents/divider/divider.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicNodeComponent,
    DrawingFieldComponent,
    StartNodeComponent,
    DividerBranchComponent,
    MonologComponent,
    DialogComponent,
    ScalingMenuComponent,
    MenuComponent,
    LinkComponent,
    DeleteDialogComponent,
    SidebarComponent,
    DividerComponent
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
