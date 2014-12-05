import Entry = require("Models/Entry");

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Entries = new Fayde.Collections.ObservableCollection<Entry>();

    constructor() {
        super();
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2013, 12, 30).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2013, 12, 31).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 1).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 2).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 3).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 4).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 5).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 8).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 9).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
        this.Entries.Add(Entry.FromJson({
            Date: new DateTime(2014, 1, 10).Ticks,
            Start: new TimeSpan(8, 0, 0).Ticks,
            End: new TimeSpan(16, 0, 0).Ticks,
            Rate: 65.0
        }));
    }

    Add() {
    }
}
export = MainViewModel;