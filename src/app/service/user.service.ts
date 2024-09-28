import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { User } from "../model/user.model";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User, User> {

    user: User | null;
    userChange: Subject<User | null> = new Subject<User | null>();

    constructor(http: HttpClient) {
        super(http);
        this.authenticatedUser();
    }

    public authenticatedUser(): void {
        super.get('http://localhost:1000/auth/me').subscribe(response => {
            this.user = response;
            this.userChange.next(this.user);
        });
    }

    public forgetAuthenticatedUser(): void {
        this.user = null;
        this.userChange.next(this.user);
    }
  
}