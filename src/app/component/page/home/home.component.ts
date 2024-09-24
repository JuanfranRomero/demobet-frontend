import { CdkDragDrop, CdkDragEnd, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // Bet
  profitsMap: Map<string | undefined | null, number> = new Map();

  // Token
  tokens: string[] = ['1€', '1€', '1€', '1€', '2€', '2€', '2€', '2€', '3€', '3€', '3€', '3€'];

  // Number lists
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
    let cellChoosen = event.container.element.nativeElement.lastChild?.textContent;

    if (this.profitsMap.get(cellChoosen)) {
      this.profitsMap.set(cellChoosen, this.profitsMap.get(cellChoosen)! + 36 * Number(amountToken));
    } else {
      this.profitsMap.set(cellChoosen, 36 * Number(amountToken));
    }

    console.log(this.profitsMap)
  }

}
