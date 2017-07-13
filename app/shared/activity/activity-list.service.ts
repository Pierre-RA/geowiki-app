import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Activity, Availability, Period, Price, Description }
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
        activityList.push(new Activity().deserialize(activity));
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
