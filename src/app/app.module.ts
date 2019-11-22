import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { RechteckComponent } from './rechteck/rechteck.component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { StartShapeComponent } from './start-shape/start-shape.component';
import { StartNodeComponent } from './start-node/start-node.component';
import { DialogNodeComponent } from './dialog-node/dialog-node.component';
import { SubKreisLeftComponent } from './sub-kreis-left/sub-kreis-left.component';
import { SubKreisRightComponent } from './sub-kreis-right/sub-kreis-right.component';
import { PhantomComponent } from './phantom/phantom.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    RechteckComponent,
    DrawingFieldComponent,
    StartShapeComponent,
    StartNodeComponent,
    DialogNodeComponent,
    SubKreisLeftComponent,
    SubKreisRightComponent,
    PhantomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
