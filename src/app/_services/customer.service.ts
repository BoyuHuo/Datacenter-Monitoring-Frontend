import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Customer } from '../_models/customer.model';

@Injectable()
export class CustomerService {
    private customer: Subject<Customer> = new BehaviorSubject<Customer>(null);
    customer$ = this.customer.asObservable();

    constructor() { }
    setCustomer(data: Customer): void {
        this.customer.next(data);
    }
}
