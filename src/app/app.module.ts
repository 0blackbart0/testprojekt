import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RechteckComponent } from './rechteck/rechteck.component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { StartShapeComponent } from './start-shape/start-shape.component';
import { SubKreisLeftComponent } from './sub-kreis-left/sub-kreis-left.component';
import { SubKreisRightComponent } from './sub-kreis-right/sub-kreis-right.component';
import { PhantomComponent } from './phantom/phantom.component';
import { SubKreisCenterComponent } from './sub-kreis-center/sub-kreis-center.component';

import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MonologComponent } from './monolog/monolog.component';
import { ScalingMenuComponent } from './scaling-menu/scaling-menu.component';
import { MenuComponent } from './menu/menu.component';
import { LinkComponent } from './link/link.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SidebarComponent } from './sidebar/sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    RechteckComponent,
    DrawingFieldComponent,
    StartShapeComponent,
    SubKreisLeftComponent,
    SubKreisRightComponent,
    PhantomComponent,
    SubKreisCenterComponent,
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
