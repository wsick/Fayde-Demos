import MouseEventArgs = Fayde.Input.MouseEventArgs;
import TouchEventArgs = Fayde.Input.TouchEventArgs;

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Load(args: Fayde.IEventBindingArgs<any>) {
        var canvas = <Fayde.Controls.Canvas>args.sender;
        for (var en = canvas.Children.getEnumerator(); en.moveNext();) {
            var cur = <Fayde.Shapes.Path>en.current;
            cur.MouseEnter.on(this._MouseEnter, this);
            cur.MouseLeave.on(this._MouseLeave, this);
            cur.TouchDown.on(this._TouchDown, this);
            cur.TouchUp.on(this._TouchUp, this);
            cur.TouchEnter.on(this._TouchEnter, this);
            cur.TouchLeave.on(this._TouchLeave, this);
        }
    }

    private _MouseEnter(sender, e: MouseEventArgs) {
        this.HighlightShape(sender);
    }

    private _MouseLeave(sender, e: MouseEventArgs) {
        this.UnhighlightShape(sender);
    }

    private _TouchEnter(sender, e: TouchEventArgs) {
        this.HighlightShape(sender);
    }

    private _TouchLeave(sender, e: TouchEventArgs) {
        this.UnhighlightShape(sender);
    }

    private _TouchDown(sender, e: TouchEventArgs) {
        this.HighlightShape(sender);
    }

    private _TouchUp(sender, e: TouchEventArgs) {
        this.UnhighlightShape(sender);
    }

    private HighlightShape(shape: Fayde.Shapes.Shape) {
        shape.StrokeThickness = 10;
        Fayde.Controls.Canvas.SetZIndex(shape, 9999);
    }

    private UnhighlightShape(shape: Fayde.Shapes.Shape) {
        shape.StrokeThickness = 2;
        Fayde.Controls.Canvas.SetZIndex(shape, 0);
    }
}
export = MainViewModel;
