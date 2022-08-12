import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OperatorsComponent } from './operators/operators.component';
import { ConditionalComponent } from './conditional/conditional.component';

@NgModule({
  declarations: [
    AppComponent,
    OperatorsComponent,
    ConditionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
