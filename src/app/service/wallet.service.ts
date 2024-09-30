import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable, Subject } from "rxjs";
import { WalletRequest } from "../model/request/wallet-request.model";
import { WalletResponse } from "../model/response/wallet-response.model";

@Injectable({
    providedIn: 'root'
})
export class WalletService extends BaseService<WalletRequest, WalletResponse> {

    currentAmount: number;
    currentAmountChange: Subject<number> = new Subject<number>();

    public getAmount(userId: number): void {
        super.get('http://localhost:1000/wallet/' + userId).subscribe(response => {
            this.currentAmount = response.amount;
            this.currentAmountChange.next(this.currentAmount);
        });
    }

    public deposit(walletRequest: WalletRequest): Observable<WalletResponse> {
        return super.put('http://localhost:1000/wallet/deposit', walletRequest);
    }

    public withdraw(walletRequest: WalletRequest): Observable<WalletResponse> {
        return super.put('http://localhost:1000/wallet/withdraw', walletRequest);
    }

    public setCurrentAmount(amount: number): void {
        this.currentAmount = amount;
        this.currentAmountChange.next(this.currentAmount);
    }
  
}