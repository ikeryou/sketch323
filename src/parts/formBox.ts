import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Update } from "../libs/update";
import { Util } from "../libs/util";
import { FormItem } from "./formItem";

// -----------------------------------------
//
// -----------------------------------------
export class FormBox extends MyDisplay {

  private _id:number
  private _con:HTMLElement;
  private _conRot:Point = new Point();
  private _item:Array<FormItem> = [];

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;
    this._conRot.x = this._id * 0

    this._con = this.getEl();

    this.addClass('s-gpu');

    this.qsAll('.item').forEach((val) => {
      this._item.push(new FormItem({
        el:val,
      }));
    });

    this._resize();
  }

  protected _update(): void {
    super._update();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const mx = MousePointer.instance.easeNormal.x;
    const my = MousePointer.instance.easeNormal.y;

    const maxWidth = Math.max(sw, sh) * Func.instance.val(0.5, 0.5)
    let itemWidth = Util.instance.map(this._id, maxWidth * 0.0, maxWidth, 0, Conf.instance.NUM - 1);
    let nextItemWidth = Util.instance.map(this._id + 1, maxWidth * 0.0, maxWidth, 0, Conf.instance.NUM - 1)

    this._item.forEach((val,i) => {
      const radian = Util.instance.radian((360 / this._item.length) * i);
      const x = Math.sin(radian) * itemWidth * 0.5;
      const z = Math.cos(radian) * itemWidth * 0.5;
      let rot = Util.instance.degree(Math.atan2(z, x)) + 90;

      if(Update.instance.cnt % 2 == 0) {
        Tween.instance.set(val.getEl(), {
          x:x,
          z:z * -1,
          rotationY:rot,
          rotationX:-90,
        })

        const sa = 5;
        val.setRate(Util.instance.map(Math.sin(Util.instance.radian(this._c * 3 + this._id * sa + i * sa)), 0, 1, -1, 1));
        if(Update.instance.cnt % 10 == 0) val.setSize(itemWidth, (itemWidth - nextItemWidth) * 0.5);
      }
    });


    Tween.instance.set(this._con, {
      x: sw * 0.5,
      rotationY:mx * 40,
      rotationX:-90 + my * -40,
      y:sh * 0.5,
    })
  }

  protected _resize(): void {
    super._resize();
  }
}