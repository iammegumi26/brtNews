import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { ToastrModule } from "ngx-toastr";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RecommendationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-center",
      maxOpened: 1,
      preventDuplicates: true,
      closeButton: true,
      timeOut: 3000
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
