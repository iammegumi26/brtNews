import { Injectable } from '@angular/core';
import * as appConfig from '../appConfig/config.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HttpService {
apiKey = appConfig.apiKey;
  constructor(public http: HttpClient) { 
   
  }
  getTopHeadLine() {
    return this.http.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=" + this.apiKey);
  }
  getSearchResult(search:any,sourceName:any) {
    var requestUrl = "https://newsapi.org/v2/everything?";
    if(search){
      requestUrl += "q="+ search
    }
    if(sourceName){
      requestUrl += "country=" + sourceName 
    }
    return this.http.get(requestUrl + "&apiKey=" + this.apiKey);
  }
  getSourceList() {
    return this.http.get("https://newsapi.org/v2/top-headlines/sources?apiKey=" + this.apiKey);
  }
  getSearchRecent(search : any) {
    return this.http.get("https://newsapi.org/v2/everything?q="+ search +"&apiKey=" + this.apiKey);
  }
}
