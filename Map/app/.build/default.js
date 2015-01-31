var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            _super.call(this);
            this.Loaded.on(this._Load, this);
        }
        Map.prototype._Load = function (sender, e) {
            var canvas = this.RootVisual;
            var enumerator = canvas.Children.getEnumerator();
            while (enumerator.moveNext()) {
                var cur = enumerator.current;
                cur.MouseEnter.on(this._MouseEnter, this);
                cur.MouseLeave.on(this._MouseLeave, this);
                cur.TouchDown.on(this._TouchDown, this);
                cur.TouchUp.on(this._TouchUp, this);
                cur.TouchEnter.on(this._TouchEnter, this);
                cur.TouchLeave.on(this._TouchLeave, this);
            }
        };
        Map.prototype._MouseEnter = function (sender, e) {
            this.HighlightShape(sender);
        };
        Map.prototype._MouseLeave = function (sender, e) {
            this.UnhighlightShape(sender);
        };
        Map.prototype._TouchEnter = function (sender, e) {
            this.HighlightShape(sender);
        };
        Map.prototype._TouchLeave = function (sender, e) {
            this.UnhighlightShape(sender);
        };
        Map.prototype._TouchDown = function (sender, e) {
            this.HighlightShape(sender);
        };
        Map.prototype._TouchUp = function (sender, e) {
            this.UnhighlightShape(sender);
        };
        Map.prototype.HighlightShape = function (shape) {
            shape.StrokeThickness = 10;
            Fayde.Controls.Canvas.SetZIndex(shape, 9999);
        };
        Map.prototype.UnhighlightShape = function (shape) {
            shape.StrokeThickness = 2;
            Fayde.Controls.Canvas.SetZIndex(shape, 0);
        };
        return Map;
    })(Fayde.Application);
    return Map;
});
//# sourceMappingURL=default.js.map