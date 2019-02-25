import { Arr } from "./arr";

export interface Sorter{
  sort(arr: Arr): void;
}

export class BubbleSorter implements Sorter{
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