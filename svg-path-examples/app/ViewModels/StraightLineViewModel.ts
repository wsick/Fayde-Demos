import ObservablePoint = require('../Models/ObservablePoint');
import ObservableCollection = Fayde.Collections.ObservableCollection;
import LineSegment = Fayde.Media.LineSegment;

class StraightLineViewModel extends Fayde.MVVM.ViewModelBase {
    Segments = new ObservableCollection();
    StartPoint = new ObservablePoint(0, 0);

    constructor () {
        super();
    }

    AddPoint (e: Fayde.IEventBindingArgs<Fayde.Input.MouseButtonEventArgs>) {
        if (e.args.Handled)
            return;
        var segment = new LineSegment();
        var pos = e.args.GetPosition(e.sender);
        segment.Point = new ObservablePoint(pos.x, pos.y);
        this.Segments.Add(segment);
    }
}
Fayde.MVVM.NotifyProperties(StraightLineViewModel, ["Segments", "StartPoint"]);
export = StraightLineViewModel;