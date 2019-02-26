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
      arr.insertswap(index, i);
    }
  }
}

export class SelectionSorter implements Sorter{
  sort(arr: Arr): void{
    let head = 0;
    const size = arr.size;
    while(head<size){
      let min = head, minv = arr.get(head);
      for(let i = head+1; i<size; i++){
        const temp = arr.get(i);
        if(temp < minv) [min, minv] = [i, temp];
      }
      if(min !== head){
        arr.set(min, arr.get(head));
        arr.set(head, minv);
      }
      head ++;
    }
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
        if(j !== i-gap)arr.set(j+gap, temp);
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

export class InsertMergeSorter implements Sorter{
  sort(arr: Arr): void{
    this._sort(arr, 0, arr.size);
  }

  _sort(arr: Arr, head:number, tail:number): void{
    if(tail-head<2) return;
    let mid = head + Math.floor((tail - head) / 2);
    this._sort(arr, head, mid);
    this._sort(arr, mid, tail);
    this._merge(arr, head, mid, tail);
  }

  _merge(arr:Arr, left: number, mid: number, right: number){
    let lh = left;
    for(let i=mid; i<right; i++){
      const temp = this._insert(arr,lh, i);
      if(temp === i){
        console.log("hello world");
        break;
      } else lh = temp;
    }
  }

  _insert(arr: Arr, head: number, tail:number): number{
    const target = arr.get(tail);
    let i = tail - 1;
    for(i;i>=head;i--){
      const temp = arr.get(i);
      if(temp < target) break;
    }
    i ++;
    if(i !== tail) arr.insertswap(i, tail);
    return i;
  }
}

export class HeapSorter implements Sorter{
  sort(arr: Arr): void{
    let size = arr.size;
    this._heapify(arr, 0, size);
    do {
      let max = arr.get(0);
      size --;
      let top = arr.get(size);
      arr.set(0, top);
      arr.set(size, max);
      this._sink(arr, 0, size, top);
    } while (size>0);
  }

  _heapify(arr: Arr, root: number, size: number): void{
    for(let i = Math.floor(size/2); i>=0; i--) this._sink(arr, i, size, arr.get(i));
  }

  _sink(arr: Arr, node: number, size: number, root: number): void{
    let left = (node + 1) * 2 - 1;
    let right = left + 1;
    if(left<size) var lv = arr.get(left);
    else return;
    if(right<size) var rv = arr.get(right);
    else{
      if(lv > root){
        arr.set(node, lv);
        arr.set(left, root);
        return this._sink(arr, left, size, root);
      }
      return;
    }

    let [maxv, maxi] = (lv>rv)?[lv, left]: [rv, right];
    if(maxv > root){
      arr.set(node, maxv);
      arr.set(maxi, root)
      return this._sink(arr, maxi, size, root);
    }
    return;
  }
}

export class SleepSorter implements Sorter{
  sort(arr: Arr){
    const size = arr.size;
    var count = 0;
    for(let i =0; i< size; i++){
      let time = arr.get(i);
      setTimeout(()=>{
        arr.set(count, time);
        count ++;
      }, time);
    }
  }
}