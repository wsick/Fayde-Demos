/// <reference path="../lib/Fayde/Fayde.d.ts" />

import Entry = require("Models/Entry");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Entries = new Fayde.Collections.ObservableCollection<Entry>();

    constructor() {
        super();
        this.Entries.Add(new Entry());
    }

    Add() {
    }
}
export = MainViewModel;