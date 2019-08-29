import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
    private ledger: Subject<Boolean> = new BehaviorSubject<Boolean>(false);
    private mission: Subject<Boolean> = new BehaviorSubject<Boolean>(false);
    isLedger$ = this.ledger.asObservable();
    isStart$ = this.mission.asObservable();

    constructor() { }
    setLedger(data: Boolean): void {
        this.ledger.next(data);
    }
    setMission(data: Boolean): void {
        this.mission.next(data);
    }
}
