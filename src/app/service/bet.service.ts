import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BetResponse } from "../model/response/bet-response.model";
import { BetRequest } from "../model/request/bet-request.model";
import { ProfitResponse } from "../model/response/profit-response.model";

@Injectable({
    providedIn: 'root'
})
// TODO: Replace 'any' parameter and parametrize correctly
export class BetService extends BaseService<BetRequest, any> {

    public bet(betRequest: BetRequest): Observable<BetResponse> {
        return super.post('http://localhost:1000/bets', betRequest);
    }

    public checkProfit(userId: number, gameId: number): Observable<ProfitResponse> {
        return super.get(`http://localhost:1000/bets/profit/${userId}/${gameId}`);
    }
  
}