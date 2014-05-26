class FilterObject {
    private _SourceCollection: Fayde.Collections.DeepObservableCollection<any>;
    private _Items = new Fayde.Collections.ObservableCollection<any>();
    constructor(sourceCollection: Fayde.Collections.DeepObservableCollection<any>, public Filter: (item: any) => boolean) {
        this._SourceCollection = sourceCollection;
        this._SourceCollection.CollectionChanged.Subscribe(this._OnCollectionChanged, this);
        this._SourceCollection.ItemPropertyChanged.Subscribe(this._OnItemPropertyChanged, this);
    }

    get Items() { return this._Items; }

    private _OnCollectionChanged(sender: any, e: Fayde.Collections.NotifyCollectionChangedEventArgs) {
        this.Update();
    }
    private _OnItemPropertyChanged(sender: any, e: Fayde.Collections.ItemPropertyChangedEventArgs<any>) {
        this.Update();
    }

    Update() {
        var filter = this.Filter || ((item: any) => true);
        for (var i = 0, j = 0, enumerator = this._SourceCollection.GetEnumerator(); enumerator.MoveNext(); i++) {
            var isIncluded = filter(enumerator.Current);
            var isCurrent = j < this._Items.Count && this._Items.GetValueAt(j) === enumerator.Current;
            if (isIncluded && !isCurrent)
                this._Items.Insert(enumerator.Current, j);
            else if (!isIncluded && isCurrent)
                this._Items.RemoveAt(j);
            if (isIncluded)
                j++;
        }
    }
}
export = FilterObject; 