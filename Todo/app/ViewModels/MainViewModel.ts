import TodoItem = require("../Models/TodoItem");
import FilterObject = require("../ViewModels/FilterObject");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new Fayde.Collections.DeepObservableCollection<TodoItem>();
    Filter: FilterObject;
    ActiveText = "";

    constructor() {
        super();
        Object.defineProperty(this, "Filter", { value: new FilterObject(this.Items), writable: false });
        this.Items.ItemPropertyChanged.on(this._OnItemPropertyChanged, this);
    }
    
    get NumItemsLeft(): number {
        var count = 0;
        var enumerator = this.Items.getEnumerator();
        while (enumerator.moveNext()) {
            if (!enumerator.current.IsComplete)
                count++;
        }
        return count;
    }
    private _OnItemPropertyChanged(sender: any, e: Fayde.Collections.ItemPropertyChangedEventArgs<TodoItem>) {
        this.OnPropertyChanged("NumItemsLeft");
        this.OnPropertyChanged("IsAllComplete");
    }

    get IsAllComplete(): boolean {
        var enumerator = this.Items.getEnumerator();
        while (enumerator.moveNext()) {
            if (!enumerator.current.IsComplete)
                return false;
        }
        return this.Items.Count > 0;
    }
    set IsAllComplete(value: boolean) {
        var enumerator = this.Items.getEnumerator();
        while (enumerator.moveNext()) {
            enumerator.current.IsComplete = value;
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
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["Items", "ActiveText"]);
export = MainViewModel; 