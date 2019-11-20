import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { RechteckComponent } from './rechteck/rechteck.component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { KreisComponent } from './kreis/kreis.component';
import { StartShapeComponent } from './start-shape/start-shape.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    RechteckComponent,
    DrawingFieldComponent,
    KreisComponent,
    StartShapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
