import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ToastrService } from "ngx-toastr";
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topHeadLinesList: any;
  articles: any = [];
  search: any = "";
  totalCount: any;
  isServerResponse: boolean = false;
  errorStatus: any;
  errorMessage: any;
  sourceNameList: any = [];
  sourceArticles: any = [];
  sourcesNameSearched: any = "";
  searchedKeywordStored: any = [];
  searchLimitedStore: any = [];
  sourceID: any;
  mainLoaderIs: any = false;

  constructor(public http: HttpService,
    private toastr: ToastrService, public app: AppComponent) { }

  ngOnInit(): void {
    this.getTopHeadLineList();
    this.showSourceNameList();
    // setInterval(()=>{
    //   this.getTopHeadLineList();
    // },60000)

  }
  getTopHeadLineList() {
    this.mainLoaderIs = true;
    this.http.getTopHeadLine().subscribe((response: any) => {
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
        this.errorStatus = "429";
        this.errorMessage = "You have been rate limited. Back off for a while before trying the request again.";
        console.log(this.errorStatus, this.errorMessage)
      }
      this.mainLoaderIs = false;
    },
      (error) => {
        this.isServerResponse = true;
        this.mainLoaderIs = false;
        this.errorStatus = "426";
        this.errorMessage = "Requests from the browser are not allowed on the Developer plan, except from localhost.";
        this.toastr.warning("Requests from the browser are not allowed on the Developer plan, except from localhost.");
        console.log(error);
      });
  }

  showSearchResult() {
    this.searchedKeywordStored.push(this.search);
    this.searchLimitedStore = this.searchedKeywordStored.slice(this.searchedKeywordStored.length - 20, this.searchedKeywordStored.length);
    localStorage.setItem('searchedKeywordStored', JSON.stringify(this.searchLimitedStore));

    if (this.sourcesNameSearched) {
      this.getSourceNameId();
    }
    
    this.mainLoaderIs = true;
    if (this.search || this.sourcesNameSearched) {
      this.http.getSearchResult(this.search, this.sourceID).subscribe((response: any) => {
        if (response.status == "ok") {
          console.log(response);
          this.topHeadLinesList = response;
          this.totalCount = response.totalResults;
          this.articles = this.topHeadLinesList.articles;
          console.log(this.sourceNameList);
        } else {
          this.toastr.warning("Something went wrong!");
        }
        if (response.status == "error") {
          this.isServerResponse = true;
          this.errorStatus = response.status;
          this.errorMessage = response.message;
        }
        this.mainLoaderIs = false;
      },
        (error) => {
          this.isServerResponse = true;
          this.mainLoaderIs = false;
          this.errorStatus = error.error.status;
          this.errorMessage = error.error.message;
          this.toastr.warning(error.error.message);
          console.log(error);
        });
    } else {
      this.getTopHeadLineList();
    }

  }
  getSourceNameId() {
    var getSourceObj = this.sourceArticles.find((srcObj: any) => {
      return srcObj.name === this.sourcesNameSearched
      console.log(srcObj.name, this.sourcesNameSearched, this.sourceNameList);
    })
    console.log(getSourceObj);
    this.sourceID = getSourceObj.id;
  }
  showSourceNameList() {
    this.sourceNameList = [];
    this.mainLoaderIs = true;
    this.http.getSourceList().subscribe((response: any) => {
      if (response.status == "ok") {
        console.log(response);
        this.sourceArticles = response.sources;
        this.sourceArticles.forEach((sourceName: { name: any; }) => {
          this.sourceNameList.push(sourceName.name);
        });
      } else {
        this.toastr.warning("Something went wrong!");
      }
      if (response.status == "error") {
        this.isServerResponse = true;
        this.errorStatus = response.status;
        this.errorMessage = response.message;
      }
      this.mainLoaderIs = false;
    },
      (error) => {
        this.isServerResponse = true;
        this.mainLoaderIs = false;
        this.errorStatus = error.error.status;
        this.errorMessage = error.error.message;
        this.toastr.warning(error.error.message);
        console.log(error);
      });
  }
}
