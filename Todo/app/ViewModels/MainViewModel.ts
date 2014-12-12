import TodoItem = require("../Models/TodoItem");
import FilterObject = require("../ViewModels/FilterObject");
import MVVM = Fayde.MVVM;
import DeepObservableCollection = Fayde.Collections.DeepObservableCollection;

class MainViewModel extends MVVM.ViewModelBase {
    Items = new DeepObservableCollection<TodoItem>();
    Filter: FilterObject;
    ActiveText = "";

    constructor () {
        super();
        Object.defineProperty(this, "Filter", {value: new FilterObject(this.Items), writable: false});
        this.Items.ItemPropertyChanged.on(this._OnItemPropertyChanged, this);
    }

    get NumItemsLeft (): number {
        return ex(this.Items).count(i => i.IsComplete);
    }

    private _OnItemPropertyChanged (sender: any, e: Fayde.Collections.ItemPropertyChangedEventArgs<TodoItem>) {
        this.OnPropertyChanged("NumItemsLeft");
        this.OnPropertyChanged("IsAllComplete");
    }

    get IsAllComplete (): boolean {
        return ex(this.Items).all(i => i.IsComplete);
    }

    set IsAllComplete (value: boolean) {
        ex(this.Items).forEach(i => i.IsComplete = value);
    }

    AddTodo (e: Fayde.IEventBindingArgs<Fayde.Input.KeyEventArgs>) {
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
MVVM.NotifyProperties(MainViewModel, ["Items", "ActiveText"]);
export = MainViewModel; 