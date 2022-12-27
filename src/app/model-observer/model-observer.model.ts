
export class ModelObserverModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public isMandatory: boolean = false,
        public hashCode: string = '',
        public isDuplicate: boolean = false,
    ) { }

    mock() {
        return [
           new ModelObserverModel(1, 'Test 1', false, '', false),
           new ModelObserverModel(2, 'Test 2', true, '', false),
           new ModelObserverModel(3, 'Test 3', false, '', false),
           new ModelObserverModel(4, 'Test 4', true, '', false),
           new ModelObserverModel(5, 'Test 5', false, '', false),
        ];
    }
}
