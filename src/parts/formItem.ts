import { Conf } from "../core/conf";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";


// -----------------------------------------
//
// -----------------------------------------
export class FormItem extends MyDisplay {

  private _div:any;
  private _isFocus:boolean = false;

  constructor(opt:any) {
    super(opt)

    this.addClass('s-gpu');

    this._div = this.qs('.con > input');

    Tween.instance.set(this._div, {
      color:'#FFF',
    })

    this._div.addEventListener('focus', () => {
      const col = Util.instance.randomArr(Conf.instance.COLOR);
      Tween.instance.set(this._div, {
        backgroundColor :col.getStyle(),
      })
      // let txt = '';
      // for(let i = 0; i < 30; i++) {
      //   txt += Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
      // }
      this._div.value = 'FOCUS!!!!!'
      this._isFocus = true;
    })

    this._resize();
  }

  public setRate(r:number): void {
    if(this._isFocus) return;

    let txt = '';
    const num = ~~(r * 60);
    for(let i = 0; i < num; i++) {
      txt += Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
    }
    this._div.placeholder = txt;
  }

  public setSize(w:number, h:number): void {
    Tween.instance.set(this.getEl(), {
      width: w,
      height: h,
    })

    Tween.instance.set(this._div, {
      width: w,
      fontSize:h,
      height: h,
      x:-w * 0.5,
      y:-h * 0.1,
    })
  }
}