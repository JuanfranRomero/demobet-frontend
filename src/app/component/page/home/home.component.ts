import { CdkDragDrop, CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  dragEnd($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
    let point: Point = $event.source.getFreeDragPosition();
    //console.log(document.elementsFromPoint(point.x, point.y))
}

}
