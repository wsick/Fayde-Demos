/// <reference path="../lib/Fayde/Fayde.d.ts" />

import TodoItem = require("../Models/TodoItem");
import FilterObject = require("../MVVM/FilterObject");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new Fayde.Collections.DeepObservableCollection<TodoItem>();
    Filter: FilterObject;
    ActiveText = "";
    IsAllFilter = true;
    IsActiveFilter = false;
    IsCompletedFilter = false;

    constructor() {
        super();
        this.Items.ItemPropertyChanged.Subscribe(this._OnItemPropertyChanged, this);
        this.Filter = new FilterObject(this.Items, (item: TodoItem) => {
            if (this.IsActiveFilter) return !item.IsComplete;
            if (this.IsCompletedFilter) return item.IsComplete;
            return true;
        });
    }
    
    get NumItemsLeft(): number {
        var count = 0;
        var enumerator = this.Items.GetEnumerator();
        while (enumerator.MoveNext()) {
            if (!enumerator.Current.IsComplete)
                count++;
        }
        return count;
    }
    private _OnItemPropertyChanged(sender: any, e: Fayde.Collections.ItemPropertyChangedEventArgs<TodoItem>) {
        this.OnPropertyChanged("NumItemsLeft");
        this.OnPropertyChanged("IsAllComplete");
    }

    get IsAllComplete(): boolean {
        var enumerator = this.Items.GetEnumerator();
        while (enumerator.MoveNext()) {
            if (!enumerator.Current.IsComplete)
                return false;
        }
        return this.Items.Count > 0;
    }
    set IsAllComplete(value: boolean) {
        var enumerator = this.Items.GetEnumerator();
        while (enumerator.MoveNext()) {
            enumerator.Current.IsComplete = value;
        }
    }

    AddTodo(e: Fayde.IEventBindingArgs<Fayde.Input.KeyEventArgs>) {
        if (e.args.Key !== Fayde.Input.Key.Enter)
            return;
        if (!this.ActiveText)
            return;
        var item = new TodoItem();
        item.Text = this.ActiveText;
        this.Items.Add(item);
        this.ActiveText = "";
        this.OnPropertyChanged("NumItemsLeft");
        this.OnPropertyChanged("IsAllComplete");
    }

    OnPropertyChanged(propertyName: string) {
        super.OnPropertyChanged(propertyName);
        switch (propertyName) {
            case "IsAllFilter":
            case "IsActiveFilter":
            case "IsCompletedFilter":
                if (this.Filter)
                    this.Filter.Update();
                break;
        }
    }
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["Items", "ActiveText", "IsAllFilter", "IsActiveFilter", "IsCompletedFilter"]);
export = MainViewModel; 