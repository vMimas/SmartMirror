import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FeedService } from '../../services/feed.service';
import { Feed } from '../../services/feed.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private id : any = '';
  public username : string = '';
  public feeds: Feed[] = [];

  bbc: string = "http://feeds.bbci.co.uk/news/rss.xml?edition=us";
  joeRogan: string = "http://podcasts.joerogan.net/feed";
  reddit: string = "https://www.reddit.com/.rss";
  wallStreet: string = "https://feeds.a.dj.com/rss/RSSWorldNews.xml";
  WPPolitics: string = "http://feeds.washingtonpost.com/rss/politics";

  
  constructor(private userService: UserService, private feed: FeedService) { 
  }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
    this.id = setInterval(this.getDateAndTime, 1000);
    this.feed.getFeeds(this.bbc)
    .subscribe(
      (data) => {
        for(let i = 0; i < 5; i++){
          let newFeed = new Feed(data.items[i].title, data.items[i].author, data.items[i].description);
          this.feeds.push(newFeed);
        }
      }
    );
  }

  ngOnDestroy(){
    if(this.id){
      clearInterval(this.id);
    }
  }

  getDateAndTime(){
    let doc = document.getElementById('date');
    let months : string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'October', 'November', 'December'
    ];
    let currentDate : Date = new Date();
    let date = [months[currentDate.getMonth()], ", ", 
                currentDate.getDate(), " ",
                currentDate.getFullYear()].join("");
    let hours : number = currentDate.getHours();
    hours = hours;
    if(hours > 12){
      hours -= 12;
    }
    let time = hours + ':' + (currentDate.getMinutes()<10 ?'0':'') + currentDate.getMinutes();
    doc.innerHTML = '';
    doc.innerHTML += time;
    doc.appendChild(document.createElement('br'));
    doc.innerHTML += date;
  }
}
