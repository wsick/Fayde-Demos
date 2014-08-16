import TodoItem = require("../Models/TodoItem");

class FilterObject extends Fayde.MVVM.ObservableObject {
    Items: Fayde.Collections.FilteredCollection<TodoItem>;
    IsAll = true;
    IsActive = false;
    IsCompleted = false;

    constructor(source: Fayde.Collections.DeepObservableCollection<TodoItem>) {
        super();
        var items = new Fayde.Collections.FilteredCollection<TodoItem>((item: TodoItem) => this.FilterItem(item), source);
        Object.defineProperty(this, "Items", { value: items, writable: false });
    }

    FilterItem(item: any): boolean {
        if (this.IsActive)
            return !item.IsComplete;
        if (this.IsCompleted)
            return item.IsComplete;
        return true;
    }

    OnPropertyChanged(propertyName: string) {
        super.OnPropertyChanged(propertyName);
        if (this.Items)
            this.Items.Update();
    }
}
Fayde.MVVM.NotifyProperties(FilterObject, ["IsAll", "IsActive", "IsCompleted"]);
export = FilterObject; 