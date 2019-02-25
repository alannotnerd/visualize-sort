import { BasicArr, LocalOrderArr } from "./arr";
import { QuickSorter, InsertSorter, BubbleSorter, BinaryInsertSorter, SelectionSorter, ShellSorter } from "./sorter"
import { ArrViewer } from "./arrviewer";
import { MusicBox } from "./musicbox";
(()=>{
  let s = new ArrViewer("main", new LocalOrderArr(new BubbleSorter()));
  s.show(10);
  // let a = new BasicArr(new SelectionSorter());
  // a.begin();
  // console.log(a.arr);
})();