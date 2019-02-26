import * as arr from "./arr";
import * as sorters from "./sorter"
import { ArrViewer } from "./arrviewer";
import { MusicBox } from "./musicbox";
(()=>{
  let s = new ArrViewer("main", new arr.BasicArr(new sorters.QuickSorter()));
  s.show(10);
  // let a = new BasicArr(new SelectionSorter());
  // a.begin();
  // console.log(a.arr);
})();