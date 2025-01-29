import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.css'],
    standalone: false
})

export class DragAndDropComponent implements OnInit {
  
  @ViewChild('myrect',{static: true}) myrect!: ElementRef;
  top: number = 40;
  left:number = 40;
  constructor() { }

  ngOnInit(): void {
    let mouseDown = fromEvent<MouseEvent>(this.myrect.nativeElement, 'mousedown');
    let mouseMove = fromEvent<MouseEvent>(document,'mousemove');
    let mouseUp = fromEvent<MouseEvent>(document,'mouseup');

    mouseDown.subscribe((e:MouseEvent)=> {
      //console.log(e);
      let x= e.screenX;
      let y= e.screenY;
      
      mouseMove
      // takeUntil has the function of saying "ok now don't put the sub in this mousemove anymore and in mouseUp"
      .pipe(takeUntil(mouseUp))
      .subscribe((em: MouseEvent)=>{
        //console.log(em);
        let offsetX= x -em.screenX;
        let offsetY= y -em.screenY;
        this.top-=offsetY;
        this.left-=offsetX;
        x = em.screenX;
        y = em.screenY;
      });

    })
  }
}
