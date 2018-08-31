import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

export class FetchDataValues {
    private readonly http: HttpClient;
    private readonly baseUrl: string;

    constructor(http: HttpClient, baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;
        //this.fetchData();
    }

    public fetchData(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/AnalyserService/getExistWorkTypeValues');
        // this.http.get(this.baseUrl + 'api/AnalyserService/getExistWorkTypeValues').subscribe(function(result){
        //     console.log(result);
        //     let s = result;
        // }, error => console.log(error));
        // this.http.post(this.baseUrl + 'api/AnalyserService/getExistWorkTypeValues',).subscribe(result => {
        //    alert(1)
        // }, error => console.error(error));
    }

}

// export class Queue<T extends new () => QueueProcess> {
//
//     private _queue: T[] = []
//
//     private async runFirstProcess() {
//         let process = new this._queue[0]()
//     }
//
// }
//
// export abstract class QueueProcess {
//
// }