import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topHeadLinesList: any;
  articles: any = [];
  mainLoaderIs: boolean = false;
  search : any = "";
  totalCount: any;
  isServerResponse: boolean = false;
  errorStatus: any;
  errorMessage: any;

  constructor(public http: HttpService,
     private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getTopHeadLineList();
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
      this.mainLoaderIs = false;
    },
    (error) => {
      this.isServerResponse = true;
      this.mainLoaderIs = false;
      this.toastr.warning(error.error.message);
      console.log(error);
    });
  }

  showSearchResult(){
    this.mainLoaderIs = true;
    this.http.getSearchResult(this.search).subscribe((response: any) => {
      if (response.status == "ok") {
        console.log(response);
        this.topHeadLinesList = response;
        this.totalCount = response.totalResults;
        this.articles = this.topHeadLinesList.articles;
      } else {
        this.toastr.warning("Something went wrong!");
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
