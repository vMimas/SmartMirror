import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeedService {
  apiKey: string = "58hwiwdjl42ty5igyp3qjne1kfnfn0geqrc4vx6j";

  private rssToJson: string = 'https://rss2json.com/api.json?rss_url=';
  private params: HttpParams =  new HttpParams().set('api_key', this.apiKey);

  constructor(private http: HttpClient) { }

  getFeeds(url: string){
    return this.http.get<{feed: string, items: {title: string, author: string, description: string}}>(this.rssToJson + url, {params: this.params});
  }
}
