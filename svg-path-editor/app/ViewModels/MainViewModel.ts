import PathDetailItem = require('../Models/PathDetailItem');
import ObservableCollection = Fayde.Collections.ObservableCollection;
import Geometry = Fayde.Media.Geometry;

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    RawData: string = "M10,10 L100,100";
    PathDetails = new ObservableCollection<PathDetailItem>();
    ActivePathData: Geometry = null;

    constructor () {
        super();
        this.UpdateActivePath();
    }

    UpdateActivePath () {
        var geom = Fayde.Media.ParseGeometry(this.RawData);
        this.ActivePathData = geom;
    }

    OnPropertyChanged (propertyName: string) {
        if (propertyName === "RawData") {
            this.UpdateActivePath();
        }
    }
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["RawData", "PathDetails", "ActivePathData"]);
export = MainViewModel;