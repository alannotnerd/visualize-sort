import { CanvasSpace, Pt, Group, CanvasForm, Space } from "pts";
import { Arr, BasicArr, ArrEventDetail, QuickSorter } from "./arr";
export class ArrSpace extends CanvasSpace{
  private _anmid = -1;
  play(time=0):this{
    requestAnimationFrame(this.play.bind(this));
    this.playItems(time);
    return this;
  }
}
export class ArrViewer{
  private space: ArrSpace;
  private form: CanvasForm;
  private arr: Arr;
  private count = 0;
  private _arr: Array<number>;
  private eventArray: Array<ArrEventDetail> = new Array();
  private _lastAccess = -1;
  private frame_count = 0;
  private last_time = 0;
  constructor(id: String, arr: Arr = new BasicArr()){
    this.space = new ArrSpace("#"+id);
    this.space.setup({resize: true, retina: true, bgcolor: "#000"});
    this.form = this.space.getForm();
    this.arr = arr;
    let sort = new QuickSorter();
    this.arr.sorter = sort;
    this._arr = this.arr.arr.slice();
    addEventListener("arr-access", (e:CustomEvent<ArrEventDetail>)=>{
      this.eventArray.push(e.detail);
      this.count ++;
    });
  }
  process(e: ArrEventDetail){
    switch (e.type) {
      case 0:
        this._lastAccess = e.index;
        break;
      case 1:
        this._arr[e.index] = e.value;
        break;
      default:
        break;
    }
  }
  show(delay=1) {
    this.arr.begin();
    const w = 1600 / this.arr.size;
    this.space.add((time, ftime)=>{
      if(time - this.last_time > delay && this.frame_count <= this.count){
        this.last_time = time;
        this.process(this.eventArray[this.frame_count]);
        this.frame_count ++;
      }
      this.form.fill("#f88").text([10, 50], `count: ${this.frame_count}, arr: ${this.eventArray.length}`);
      for(let i = 0; i< this.arr.size; i++){
        const tl = new Pt(w*i, 900);
        const br = new Pt(w*i+w, (450-this._arr[i]) * 2);
        this.form.fill(i == this._lastAccess?"#822":"#888").rect([tl, br]);
      }
    });
    this.space.play();
  }
}