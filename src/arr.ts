export interface ArrEventDetail{
  type: number,
  value?: number,
  index: number
}
export abstract class Arr {
  public arr: Array<number>;
  public sorter: Sorter;
  public get size() : number {
    return this.arr.length;
  }
  
  constructor() {
    this.init();
  }
  abstract init(): void;

  get(i: number): number{
    this.report(5, {type: 0, index: i});
    return this.arr[i];
  }

  set(i: number, value: number): void{
    this.report(50, {type: 1, index: i, value: value});
    this.arr[i] = value;
  }

  report(delay: number = 5, detail: ArrEventDetail): void{
    const event = new CustomEvent("arr-access", {detail: detail});
    window.dispatchEvent(event);
  }

  abstract begin():void;
}

interface Sorter{
  sort(arr: Arr): void;
}

export class BasicArr extends Arr implements Sorter{
  constructor(){
    super();
    this.sorter = this;
  }
  init(): void{
    this.arr = new Array<number>(450);
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i] = i;
    }
    for(let i = 1;i < this.arr.length;i++){
      const random = Math.floor(Math.random() * (i+1));
      [this.arr[i], this.arr[random]] = [this.arr[random], this.arr[i]];
    }
  }
  begin(): void{
    if(this.sorter) this.sorter.sort(this);
  }
  sort(arr: Arr): void{
    const size = arr.size;
    for(let i=1; i< size; i++){
      let j = i;
      while(j>0 && arr.get(j-1) < arr.get(j)){
        let tmp = arr.get(j);
        arr.set(j, arr.get(j-1));
        arr.set(j-1, tmp);
        j--;
      }
    }
  }
}

export class QuickSorter implements Sorter{
  sort(arr: Arr): void{
    this._sort(arr, 0, arr.size-1);
  }

  _sort(arr:Arr, begin: number, end: number){
    if(begin<end){
      let q = this.partition(arr, begin, end);
      this._sort(arr, begin, q-1);
      this._sort(arr, q+1, end);
    }
  }

  partition(arr: Arr, begin: number, end: number) : number{
    let holder = arr.get(begin);
    while(true){
      while(begin<end && holder <= arr.get(end)) end--;
      arr.set(begin, arr.get(end));
      while(begin<end && holder >= arr.get(begin)) begin++;
      arr.set(end, arr.get(begin));
      if(begin>=end) break;
    }
    arr.set(begin, holder);
    return begin;
  }
}