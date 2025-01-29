import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss'],
    providers: [],
    standalone: false
})
export class SubjectComponent implements OnInit, OnDestroy {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }


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

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    test() {
        this.clearContainer();

        const subject: Subject<any> = new Subject();
        const behaviorSubject: BehaviorSubject<number> = new BehaviorSubject(0);
        const replaySubject: ReplaySubject<any> = new ReplaySubject();
        /* create an instance of AsyncSubject. */
        const asyncSubject: AsyncSubject<number> = new AsyncSubject<number>();
        /* Subscribe to subject. */
        const asyncSubjectSubscription =
            asyncSubject.subscribe({
                next: (value) => /* console.log('before:', value) */ this.logToContainer('From AsyncSubject before: ' + value),
                error: /* console.error */ (error) => this.logToContainer('error AsyncSubject: ' + JSON.stringify(error)),
                complete: () => /* console.log('complete before') */ this.logToContainer('Complete AsyncSubject before'),
            });

        subject.next(1)

        behaviorSubject.next(1);
        behaviorSubject.next(2);
        behaviorSubject.next(3);

        replaySubject.next(1);
        replaySubject.next(2);
        replaySubject.next(3);

        /* Emit some values. */
        asyncSubject.next(1);
        asyncSubject.next(2);
        asyncSubject.next(3);

        subject.subscribe(val => /* console.log('From Subject', val) */ this.logToContainer('From Subject: ' + val)); // this will not emits
        behaviorSubject.subscribe(val => /* console.log('From BehaviorSubject', val) */ this.logToContainer('From BehaviorSubject: ' + val)); // this will emits only last value
        replaySubject.subscribe(val => /* console.log('From ReplaySubject', val) */ this.logToContainer('From ReplaySubject: ' + val)); // this will emit all values
        /* Subscribe late to subject. */
        asyncSubject.subscribe({
            next: (val) => /* console.log('after:', value) */ this.logToContainer('From AsyncSubject after: ' + val),
            error: /* console.error */ (error) => this.logToContainer('Error AsyncSubject: ' + JSON.stringify(error)),
            complete: () => /* console.log('complete after') */ this.logToContainer('Complete AsyncSubject after'),
        });

        /*
         * Complete the observable stream.
         * If we do not complete, the AsyncSubject will never emit a next notification.
        */
        asyncSubject.complete();

        /* unsubscribe */
        asyncSubjectSubscription.unsubscribe();
    }
}
