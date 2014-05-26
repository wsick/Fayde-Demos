import TodoItem = require("../Models/TodoItem");

class FilterObject extends Fayde.MVVM.ObservableObject {
    Items: Fayde.Collections.FilteredCollection<TodoItem>;
    IsAll = true;
    IsActive = false;
    IsCompleted = false;

    constructor(source: Fayde.Collections.DeepObservableCollection<TodoItem>) {
        super();
        var items = new Fayde.Collections.FilteredCollection<TodoItem>((item: TodoItem) => {
            if (this.IsActive) return !item.IsComplete;
            if (this.IsCompleted) return item.IsComplete;
            return true;
        }, source);
        Object.defineProperty(this, "Items", { value: items, writable: false });
    }

    OnPropertyChanged(propertyName: string) {
        super.OnPropertyChanged(propertyName);
        switch (propertyName) {
            case "IsAll":
            case "IsActive":
            case "IsCompleted":
                if (this.Items)
                    this.Items.Update();
                break;
        }
    }
}
Fayde.MVVM.NotifyProperties(FilterObject, ["IsAll", "IsActive", "IsCompleted"]);
export = FilterObject; 