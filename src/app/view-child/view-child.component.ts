import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.css']
})
export class ViewChildComponent implements OnInit {

  /*
************************** ViewChild TESTING CHANGES ***************************************

    Two ways to make this ViewChild, from now on ! may be present or set undefined
      1- by default static is false and its value is used in ngAfterViewInit
        @ViewChild('myrect') myrect!: ElementRef;
        ngAfterViewInit() {
         console.log(this.myrect)
        }
      2- If static: true is set, the values will be available in ngOnInit and in subsequent functions.
          @ViewChild('myrect',{static: true}) myrect!: ElementRef;
          ngOnInit(): void {
            console.log(this.myrect)
          }
    FYI: If static is set: true both in ngOnInit and in subsequent functions that use this child and in ngAfterViewInit itself will be available too,
     in other words, arrow as true this shit and you can use it wherever you want, and you can't forget the ! that the angular decided to place, is so if it doesn't find it it will return you undefined.
  */
  @ViewChild('myrect', { static: true }) myrect!: ElementRef;
  top: number = 40;
  left: number = 40;
  constructor() { }

  private logToContainer(message: string) {
    const container = document.getElementById('consolelog');
    const messageElement = document.createElement('pre');
    messageElement.innerHTML = message;
    container?.appendChild(messageElement);
  }

  clearContainer = () => {
    const el = document.getElementById('consolelog');
    while (el?.firstChild) el.removeChild(el.firstChild);
  }

  ngOnInit(): void {
    //// console.log(this.myrect)
    this.logToContainer('ngOnInit ' + JSON.stringify(this.myrect));
    this.test()
  }

  test() {
    //// console.log(this.myrect)
    this.logToContainer('test ' + JSON.stringify(this.myrect));
  }

  ngAfterViewInit() {
    //// console.log(this.myrect)
    this.logToContainer('ngAfterViewInit ' + JSON.stringify(this.myrect));
  }

}
