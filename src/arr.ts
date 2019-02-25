import {Sorter, BubbleSorter, QuickSorter} from "./sorter"
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

  constructor(sorter: Sorter) {
    this.sorter = sorter
    this.init();
  }
  /**
   * Custom `arr` initialize method.
   */
  abstract init(): void;

  get(i: number): number{
    this.report({type: 0, index: i, value: 0});
    return this.arr[i];
  }

  complete(i: number): void{
    this.report({type: 0, index: i, value: 1});
  }

  set(i: number, value: number): void{
    this.report({type: 1, index: i, value: value});
    this.arr[i] = value;
  }
  /**
   *  Emit arr-access Event, wher `get` or `set`.
   * @param detail Event Detail
   */
  report(detail: ArrEventDetail): void{
    const event = new CustomEvent("arr-access", {detail: detail});
    window.dispatchEvent(event);
  }

  abstract begin():void;
}

export class BasicArr extends Arr {
  constructor(sorter = new BubbleSorter()){
    super(sorter);
  }

  /**
   * Typically initialize, for `Sorter` which don't care the type of data.
   */
  init(): void{
    this.arr = new Array<number>(225);
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i] = i * 2;
    }
    for(let i = 1;i < this.arr.length;i++){
      const random = Math.floor(Math.random() * (i+1));
      [this.arr[i], this.arr[random]] = [this.arr[random], this.arr[i]];
    }
  }

  /**
   * Begin sorting.
   * You could set a custom `Sorter` before calling it.
   */
  begin(): void{
    if(this.sorter) this.sorter.sort(this);
    let res = true;
    for(let i=0; i<this.arr.length;i++){
      if(i>0) res = res && (this.arr[i-1] < this.arr[i]);
      if(!res) break;
    }
    if(res) this.bravo();
  }

  bravo():void{
    for(let i=0; i<this.arr.length;i++){
      this.complete(i);
    }
  }

}

export class LocalOrderArr extends BasicArr{
  init() : void{
    this.arr = new Array<number>(225);
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i] = i * 2;
    }
    for(let i = 0;i < 225 / 25;i++){
      for(let j = 1; j < 25; j++){
        const random = Math.floor(Math.random() * (j+1));
        [this.arr[j + 25 * i], this.arr[random + 25 * i]] = [this.arr[random + 25 * i], this.arr[j + 25 * i]];
      }
    }
  }
}