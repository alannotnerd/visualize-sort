import { BasicArr } from "./arr";
import { QuickSorter } from "./sorter" 
import { ArrViewer } from "./arrviewer";

(()=>{
  let s = new ArrViewer("main", new BasicArr(new QuickSorter()));
  s.show();
})();