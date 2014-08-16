class TodoItem extends Fayde.MVVM.ObservableObject {
    Text: string = "";
    IsComplete: boolean = false;

    ToggleComplete(e: Fayde.IEventBindingArgs<Fayde.Input.MouseButtonEventArgs>) {
        this.IsComplete = !this.IsComplete;
    }
}
Fayde.MVVM.NotifyProperties(TodoItem, ["Text", "IsComplete"]);
export = TodoItem; 