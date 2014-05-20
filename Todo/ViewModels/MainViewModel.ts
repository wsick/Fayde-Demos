/// <reference path="../lib/Fayde/Fayde.d.ts" />

import TodoItem = require("../Models/TodoItem");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new Fayde.Collections.DeepObservableCollection<TodoItem>();
    ActiveText: string = "";

    constructor() {
        super();
        this.Items.ItemPropertyChanged.Subscribe(this._OnItemPropertyChanged, this);
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
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["Items", "ActiveText"]);
export = MainViewModel; 