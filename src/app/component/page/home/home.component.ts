import { CdkDragDrop, CdkDragEnd, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { BetService } from '../../../service/bet.service';
import { BetRequest } from '../../../model/request/bet-request.model';
import { UserService } from '../../../service/user.service';
import { WalletService } from '../../../service/wallet.service';
import { concatMap, filter, pluck, switchMap } from 'rxjs';

interface InformationPanel {
  message: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private betService: BetService,
    private userService: UserService,
    private walletService: WalletService,
  ) {}

  modeProgressBar: ProgressBarMode = 'determinate';
  valueProgressBar = 0;

  rouletteNumber: number;
  nextRound: boolean = true;

  informationPanel: InformationPanel = {
    message: `Enter your next bet`,
    color: `black`
  };

  // Bet
  betMap: Map<string, number> = new Map();

  // Token
  tokens: string[] = ['1€', '1€', '1€', '1€', '2€', '2€', '2€', '2€', '3€', '3€', '3€', '3€'];

  // Box lists
  zero: string[] = [];
  one: string[] = [];
  two: string[] = [];
  three: string[] = [];
  four: string[] = [];
  five: string[] = [];
  six: string[] = [];
  seven: string[] = [];
  eight: string[] = [];
  nine: string[] = [];
  ten: string[] = [];
  eleven: string[] = [];
  twelve: string[] = [];
  thirteen: string[] = [];
  fourteen: string[] = [];
  fiveteen: string[] = [];
  sixteen: string[] = [];
  seventeen: string[] = [];
  eighteen: string[] = [];
  nineteen: string[] = [];
  twenty: string[] = [];
  twentyOne: string[] = [];
  twentyTwo: string[] = [];
  twentyThree: string[] = [];
  twentyFour: string[] = [];
  twentyFive: string[] = [];
  twentySix: string[] = [];
  twentySeven: string[] = [];
  twentyEight: string[] = [];
  twentyNine: string[] = [];
  thirty: string[] = [];
  thirtyOne: string[] = [];
  thirtyTwo: string[] = [];
  thirtyThree: string[] = [];
  thirtyFour: string[] = [];
  thirtyFive: string[] = [];
  thirtySix: string[] = [];
  red: string[] = [];
  black: string[] = [];
  firstColumn: string[] = [];
  secondColumn: string[] = [];
  thirdColumn: string[] = [];
  firstRow: string[] = [];
  secondRow: string[] = [];
  thirdRow: string[] = [];
  firstHalf: string[] = [];
  secondHalf: string[] = [];
  even: string[] = [];
  odd: string[] = [];

  ngOnInit(): void {
    this.increaseProgressBar();
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.updateProfit(event);
    }
  }

  private updateProfit(event: CdkDragDrop<string[]>): void {
    let amountToken = event.item.element.nativeElement.lastChild?.textContent?.substring(0, 1);
    let cellChoosen = event.container.element.nativeElement.lastChild?.textContent?.trim();

    if (this.betMap.get(cellChoosen!)) {
      this.betMap.set(cellChoosen!, this.betMap.get(cellChoosen!)! + Number(amountToken));
    } else {
      this.betMap.set(cellChoosen!, Number(amountToken));
    }
  }

  private increaseProgressBar(): void {
    setInterval(() => {

      if (this.nextRound) {
        this.valueProgressBar += 10;
        if (this.valueProgressBar === 100) {
          this.generateNumber();
          this.informationPanel = {
            message: `No more!`,
            color: `blue`
          };

        } else if (this.valueProgressBar === 120) {
          this.nextRound = false;
          this.valueProgressBar = 0;
          
          let betRequest: BetRequest = this.buildBetRequest();
          this.betService.bet(betRequest).pipe(
            switchMap(response => {
              this.walletService.setCurrentAmount(response.amount);
              return this.betService.checkProfit(this.userService.user!.id, response.gameId);
            }),
          ).subscribe(response => {
              this.rouletteNumber = response.rouletteNumber;
              if (response.profit > 0) {
                this.walletService.setCurrentAmount(response.amount);
                this.informationPanel = {
                  message: `Congratulations! You have earned a profit of ${response.profit}.00 €`,
                  color: `green`
                };
              } else {
                this.informationPanel = {
                  message: `We are sorry! You have not won anything with any of your bets.`,
                  color: `red`
                };
              }
              this.clean();
              this.nextRound = true;
            }
          );
        }
      }
    
    }, 1000);
  }

  private generateNumber(): void {
    this.nextRound = false;
    for (let i = 0; i < 10000; i++) {
      setTimeout(() => {
        this.rouletteNumber = Math.floor(Math.random() * 37);
      }, 1000);
    }
    this.nextRound = true;

  }

  private buildBetRequest(): BetRequest {
    let betsArray: {[key: string]: number} = {};
      this.betMap.forEach((val: number, key: string) => {
        betsArray[key] = val;
    });

    return {
      userId: this.userService.user!.id,
      bets: betsArray
    }
  }

  private clean(): void {
    this.betMap = new Map();
    
    this.tokens = ['1€', '1€', '1€', '1€', '2€', '2€', '2€', '2€', '3€', '3€', '3€', '3€'];
  
    this.zero = [];
    this.one = [];
    this.two = [];
    this.three = [];
    this.four = [];
    this.five = [];
    this.six = [];
    this.seven = [];
    this.eight = [];
    this.nine = [];
    this.ten = [];
    this.eleven = [];
    this.twelve = [];
    this.thirteen = [];
    this.fourteen = [];
    this.fiveteen = [];
    this.sixteen = [];
    this.seventeen = [];
    this.eighteen = [];
    this.nineteen = [];
    this.twenty = [];
    this.twentyOne = [];
    this.twentyTwo = [];
    this.twentyThree = [];
    this.twentyFour = [];
    this.twentyFive = [];
    this.twentySix = [];
    this.twentySeven = [];
    this.twentyEight = [];
    this.twentyNine = [];
    this.thirty = [];
    this.thirtyOne = [];
    this.thirtyTwo = [];
    this.thirtyThree = [];
    this.thirtyFour = [];
    this.thirtyFive = [];
    this.thirtySix = [];
    this.red = [];
    this.black = [];
    this.firstColumn = [];
    this.secondColumn = [];
    this.thirdColumn = [];
    this.firstRow = [];
    this.secondRow = [];
    this.thirdRow = [];
    this.firstHalf = [];
    this.secondHalf = [];
    this.even = [];
    this.odd = [];
  }

}
