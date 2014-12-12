import TodoItem = require("../Models/TodoItem");
import MVVM = Fayde.MVVM;
import FilteredCollection = Fayde.Collections.FilteredCollection;
import DeepObservableCollection = Fayde.Collections.DeepObservableCollection;

class FilterObject extends MVVM.ObservableObject {
    Items: FilteredCollection<TodoItem>;
    IsAll = true;
    IsActive = false;
    IsCompleted = false;

    constructor (source: DeepObservableCollection<TodoItem>) {
        super();
        var items = new FilteredCollection<TodoItem>(item => this.FilterItem(item), source);
        Object.defineProperty(this, "Items", {value: items, writable: false});
    }

    FilterItem (item: TodoItem): boolean {
        if (this.IsActive)
            return !item.IsComplete;
        if (this.IsCompleted)
            return item.IsComplete;
        return true;
    }

    OnPropertyChanged (propertyName: string) {
        super.OnPropertyChanged(propertyName);
        if (this.Items)
            this.Items.Update();
    }
}
MVVM.NotifyProperties(FilterObject, ["IsAll", "IsActive", "IsCompleted"]);
export = FilterObject; 