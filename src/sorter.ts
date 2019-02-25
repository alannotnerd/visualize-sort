import { Arr } from "./arr";

export interface Sorter{
  sort(arr: Arr): void;
}

export class InsertSorter implements Sorter{
  sort(arr: Arr): void{
    const size = arr.size;
    for(let i=1; i< size; i++){
      let j = i;
      const temp = arr.get(j);
      while(j>0 && arr.get(j-1) > temp){
        arr.set(j, arr.get(j-1));
        j--;
      }
      arr.set(j, temp);
    }
  }
}

export class BinaryInsertSorter implements Sorter{
  binarySearch(arr: Arr, tail: number, target: number):number{
    let head=0;
    let mid:number, value: number;
    while(head < tail){
      mid = head + Math.floor((tail-head) / 2);
      value = arr.get(mid);
      if(value < target) head=mid+1;
      else tail = mid-1;
    }
    value = arr.get(head);
    let res = (value<target)?head+1:head;
    return res;
  }

  sort(arr: Arr): void{
    for(let i=1; i<arr.size; i++){
      const target = arr.get(i);
      const index = this.binarySearch(arr, i, target);
      for(let j=i; j>index; j--){
        arr.set(j, arr.get(j-1));
      }
      arr.set(index, target);
    }
  }
}

export class SelectionSorter implements Sorter{
  sort(arr: Arr): void{
    let head = 0, tail = arr.size - 1;
    while(tail - head > 0){
      let [mini, maxi, min, max] = this._search(arr, head, tail);
      if(mini != head) {
        arr.set(mini, arr.get(head));
        arr.set(head, min);
      }
      if(maxi != tail){
        arr.set(maxi, arr.get(tail));
        arr.set(tail, max);
      }
      head++; tail--;
    }
  }

  _search(arr: Arr, head: number, tail: number): [number, number, number, number]{
    let min, mini, max, maxi;
    min = arr.get(head);
    max = arr.get(tail);
    mini = head;
    maxi = tail;
    for(let i=head+1; i<tail; i++){
      const temp = arr.get(i);
      if(temp < min){
        min = temp;
        mini = i;
      }
      if(temp > max){
        max = temp;
        maxi = i;
      }
    }
    return [mini,maxi, min, max];
  }
}
export class BubbleSorter implements Sorter{
  sort(arr: Arr): void{
    const size = arr.size;
    for(let i=0; i<size-1; i++){
      for(let j=0; j<size-i-1; j++){
        const temp = arr.get(j);
        const temp2 = arr.get(j+1);
        if(temp > arr.get(j+1)){
          arr.set(j, temp2);
          arr.set(j+1, temp);
        }
      }
    }
  }
}

export class ShellSorter implements Sorter{
  sort(arr: Arr): void{
    let len = arr.size;
    let gap = 1;
    while(gap < len / 3){
      gap = gap * 3 + 1;
    }
    for(gap; gap>0; gap = Math.floor(gap/3)){
      for(let i = gap; i < len; i++){
        let temp = arr.get(i);
        let j = i- gap;
        for(j; j >= 0 && arr.get(j) > temp; j -= gap){
          arr.set(j+gap, arr.get(j));
        }
        arr.set(j+gap, temp);
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
