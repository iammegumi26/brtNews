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
  sourcesNameSearched : any ="";
  searchedKeywordStored: any= [];
  searchLimitedStore: any = [];

  constructor(public http: HttpService,
    private toastr: ToastrService,public app: AppComponent) { }

  ngOnInit(): void {
    this.getTopHeadLineList();
    this.showSourceNameList();
    // setInterval(()=>{
    //   this.getTopHeadLineList();
    // },60000)

  }
  getTopHeadLineList() {
    this.app.mainLoaderIs = true;
    this.http.getTopHeadLine().subscribe((response: any) => {
      if (response.status == "ok") {
        console.log(response);
        this.topHeadLinesList = response;
        this.totalCount = response.totalResults;
        this.articles = this.topHeadLinesList.articles;
      } else {
        this.toastr.warning("Something went wrong!");
      }
      if(response.status == "error"){
        this.isServerResponse = true;
        this.errorStatus = response.status;
          this.errorMessage = response.message;
          console.log(this.errorStatus,this.errorMessage)
      }
      this.app.mainLoaderIs = false;
    },
      (error) => {
        this.isServerResponse = true;
        this.app.mainLoaderIs = false;
        this.errorStatus = error.status;
          this.errorMessage = error.message;
        this.toastr.warning(error.message);
        console.log(error);
      });
  }

  showSearchResult() {
    this.searchedKeywordStored.push(this.search);
      this.searchLimitedStore = this.searchedKeywordStored.slice(this.searchedKeywordStored.length-20, this.searchedKeywordStored.length);
   
    console.log(this.searchedKeywordStored);
    localStorage.setItem('searchedKeywordStored', JSON.stringify(this.searchLimitedStore));
    this.sourceNameList = [];
    this.app.mainLoaderIs = true;
    if (this.search || this.sourcesNameSearched) {
      this.http.getSearchResult(this.search,this.sourcesNameSearched).subscribe((response: any) => {
        if (response.status == "ok") {
          console.log(response);
          this.topHeadLinesList = response;
          this.totalCount = response.totalResults;
          this.articles = this.topHeadLinesList.articles;
          console.log(this.sourceNameList);
        } else {
          this.toastr.warning("Something went wrong!");
        }
        if(response.status == "error"){
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
    } else {
      this.getTopHeadLineList();
    }

  }
  showSourceNameList() {
    this.app.mainLoaderIs = true;
      this.http.getSourceList().subscribe((response: any) => {
        if (response.status == "ok") {
          console.log(response);
          this.sourceArticles =response.sources;
          this.sourceArticles.forEach((sourceName: { country: any; }) => {
            this.sourceNameList.push(sourceName.country);
          });
        } else {
          this.toastr.warning("Something went wrong!");
        }
        if(response.status == "error"){
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
