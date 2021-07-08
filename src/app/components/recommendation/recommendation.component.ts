import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ToastrService } from "ngx-toastr";
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
  getSearchStored: any;
  topHeadLinesList: any;
  articles: any = [];
  search: any = "";
  totalCount: any;
  isServerResponse: boolean = false;
  errorStatus: any;
  errorMessage: any;
  intervalCount: any = 0;
  constructor(public http: HttpService,
    private toastr: ToastrService, public app: AppComponent) { }

  ngOnInit() {

    this.getSearchStored = JSON.parse(localStorage.getItem('searchedKeywordStored') || '{}');
    this.search = this.getSearchStored[0];
    setTimeout(() => {
      this.showSearchResult();
    this.callRecentSearchNews();
    }, 100);
    
  }

  callRecentSearchNews() {
    if (this.getSearchStored.length > this.intervalCount) {
      setInterval(() => {
        this.intervalCount++;
        this.search = this.getSearchStored[this.intervalCount];
        this.showSearchResult();
      }, 60000);
    }

  }

  showSearchResult() {
    this.app.mainLoaderIs = true;
      this.http.getSearchRecent(this.search).subscribe((response: any) => {
        if (response.status == "ok") {
          console.log(response);
          this.topHeadLinesList = response;
          this.totalCount = response.totalResults;
          this.articles = this.topHeadLinesList.articles;
        } else {
          this.toastr.warning("Something went wrong!");
        }
        if (response.status == "error") {
          this.isServerResponse = true;
          this.errorStatus = response.status;
          this.errorMessage = response.message;
        }
        this.app.mainLoaderIs = false;
      },
        (error) => {
          this.isServerResponse = true;
          this.app.mainLoaderIs = false;
          this.errorStatus = error.error.status;
          this.errorMessage = error.error.message;
          this.toastr.warning(error.error.message);
          console.log(error);
        });
  }
}
