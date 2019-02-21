import { CanvasSpace, Pt, Group, CanvasForm, Space } from "pts";
import { Arr, BasicArr } from "./arr";
export class ArrViewer{
  private space: CanvasSpace;
  private form: CanvasForm;
  private arr: Arr;
  constructor(id: String, arr: Arr = new BasicArr()){
    this.space = new CanvasSpace("#"+id);
    this.space.setup({resize: true, retina: true, bgcolor: "#000"});
    this.form = this.space.getForm();
    this.arr = arr;
  }
  show() {
    const w = 1600 / this.arr.size;
    for(let i = 0; i<this.arr.size; i++){
      console.log(this.arr.get(i));
      this.space.add((time, ftime)=>{
        this.form.fill("#f88").text([10, 50], `time: ${time.toFixed(2)}, ftime: ${ftime.toFixed(2)}`);
      })
      //rects
      this.space.add((time, ftime)=>{
        const tl = new Pt(w*i, 900);
        const br = new Pt(w*i+w, 900-this.arr.get(i));
        this.form.fill("#888").rect([tl, br]);
      })
    }
    this.space.play(50);
  }
}