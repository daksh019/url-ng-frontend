import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UrlGenerator } from './url-generator/url-generator.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: UrlGenerator }]),
  ],
  declarations: [AppComponent, TopBarComponent, UrlGenerator],
  bootstrap: [AppComponent],
})
export class AppModule {}
