import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Activity, Availability, Period, Price, Description, Owner, Contact }
  from "./activity";
import { Config } from "../config";

@Injectable()
export class ActivityListService {
  constructor(private http: Http) {}

  load() {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    return this.http.get(Config.apiUrl + "activities.json", {
      headers: headers
    })
    .map(res => res.json())
    .map(data => {
      let activityList = [];
      data.results.forEach((activity) => {
        activityList.push(new activity(
          activity.latitude,
          activity.longitude,
          activity.date_created,
          activity.date_modified,
          activity.date_published,
          activity.image,
        ));
      });
      return activityList;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json));
    return Observable.throw(error);
  }
}
