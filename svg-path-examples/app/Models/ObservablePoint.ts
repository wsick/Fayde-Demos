class ObservablePoint extends Point implements Fayde.INotifyPropertyChanged {
    PropertyChanged = new nullstone.Event<Fayde.PropertyChangedEventArgs>();
    OnPropertyChanged(propertyName: string) {
        if (this.PropertyChanged)
            this.PropertyChanged.raise(this, new Fayde.PropertyChangedEventArgs(propertyName));
    }
}
Fayde.MVVM.NotifyProperties(ObservablePoint, ["x", "y"]);
export = ObservablePoint;