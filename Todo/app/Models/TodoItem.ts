import MVVM = Fayde.MVVM;

class TodoItem extends MVVM.ObservableObject {
    Text: string = "";
    IsComplete: boolean = false;

    ToggleComplete (e: Fayde.IEventBindingArgs<Fayde.Input.MouseButtonEventArgs>) {
        this.IsComplete = !this.IsComplete;
    }
}
MVVM.NotifyProperties(TodoItem, ["Text", "IsComplete"]);
export = TodoItem; 