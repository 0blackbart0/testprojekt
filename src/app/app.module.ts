import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { RechteckComponent } from './rechteck/rechteck.component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { StartShapeComponent } from './start-shape/start-shape.component';
import { SubKreisLeftComponent } from './sub-kreis-left/sub-kreis-left.component';
import { SubKreisRightComponent } from './sub-kreis-right/sub-kreis-right.component';
import { PhantomComponent } from './phantom/phantom.component';
import { SubKreisCenterComponent } from './sub-kreis-center/sub-kreis-center.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';

import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MonologComponent } from './monolog/monolog.component';
import { ScalingMenuComponent } from './scaling-menu/scaling-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    RechteckComponent,
    DrawingFieldComponent,
    StartShapeComponent,
    SubKreisLeftComponent,
    SubKreisRightComponent,
    PhantomComponent,
    SubKreisCenterComponent,
    ToolMenuComponent,
    MonologComponent,
    DialogComponent,
    ScalingMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
