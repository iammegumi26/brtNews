import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class HeaderComponent implements OnInit {
  isActive: boolean = true;
  activePage: any;
  constructor(private router: Router,) {
    router.events.subscribe((val: any) => {
      if(val.url){
        this.activePage = val.url;
        if(this.activePage == "/recommendation"){
          this.isActive = false;
         }else{
          this.isActive = true;
         }
      }
    });
  }

  ngOnInit(): void {
  
  }
  navigateHome() {
    this.isActive = true;
    this.router.navigate(["home"]);
  }
  naviagteRecommendation() {
    this.isActive = false;
    this.router.navigate(["recommendation"]);
  }
}
