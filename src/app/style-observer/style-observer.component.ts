import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-style-observer',
    templateUrl: './style-observer.component.html',
    styleUrls: ['./style-observer.component.scss'],
    standalone: false
})
export class StyleObserverComponent implements OnInit, OnDestroy {
  observer: MutationObserver | null | undefined = null;

  //// constructor() { }

  private logToContainer (message: string) {
    const container = document.getElementById('consolelog');
    const messageElement = document.createElement('pre');
    messageElement.innerHTML = message;
    container?.appendChild(messageElement);
  }

  clearContainer = () => {
    const el = document.getElementById('consolelog');
    while (el?.firstChild) {
        el.removeChild(el.firstChild);
    }
  }

  ngOnInit(): void {
    // identify an element to observe
    const elementToObserve: Element | null | undefined = document.querySelector("#corps");

    // create a new instance of `MutationObserver` named `observer`,
    // passing it a callback function
    this.observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            const newValue = (mutation.target as any)?.attributes['style']?.nodeValue;
            this.logToContainer('Izmjenjen atribut <b>' + mutation.attributeName + '</b> nova vrijednost <b>' + newValue + '</b>.');
        }
    });

    // call `observe()` on that MutationObserver instance,
    // passing it the element to observe, and the options object
    this.observer.observe((elementToObserve as any), {attributes: true, subtree: true, childList: true});
  }

  changeDivStyle = () => {
    const ele: HTMLElement | null | undefined = document.getElementById('corps');
    if (ele?.style?.color == 'red') {
        //// ! operator tells the compiler to ignore the possibility of it being undefined
        ele!.style.color = 'black';
    } else {
        ele!.style.color = 'red';
    }

    // if (ele?.style.display == 'block') {
    //     ele!.style.display = 'none';
    // } else {
    //     ele!.style.display = 'block';
    // }
  }

  ngOnDestroy(): void {
    // Later, you can stop observing
    if (this.observer) {
       alert('disconnect observer!');
       this.observer.disconnect();
    }
  }
}
