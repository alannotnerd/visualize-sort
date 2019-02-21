export abstract class Arr {
  protected arr: Array<number>;
  public get size() : number {
    return this.arr.length;
  }
  
  constructor() {
    this.init();
  }
  abstract init(): void;
  abstract next(): Array<number>;
  get(i: number){
    return this.arr[i];
  }
}

interface Sorter{
  sort(arr: Array<number>): void;
}

export class BasicArr extends Arr{
  constructor(){
    super();
  }
  init(): void{
    this.arr = new Array<number>(900);
    for (let i = 1; i < this.arr.length; i++) {
      const random = Math.floor(Math.random() * (i + 1));
      [this.arr[i], this.arr[random]] = [random, i];
    }
  }
  next(){
    return this.arr;
  }
}