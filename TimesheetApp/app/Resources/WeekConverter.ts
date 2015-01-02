class WeekConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        var dt = <DateTime>value;
        if (!dt || !(dt instanceof DateTime))
            dt = new DateTime();
        dt = dt.Date;
        var base = new DateTime(dt.Year, 1, 1);
        if (base.DayOfWeek === DayOfWeek.Sunday)
            base = base.Subtract(new TimeSpan(14, 0, 0, 0));
        else
            base = base.Subtract(new TimeSpan(<number>base.DayOfWeek + 7, 0, 0, 0));

        var diff = new TimeSpan(dt.Ticks - base.Ticks);
        var week = Math.floor(diff.TotalDays / 7);
        return week + "-" + dt.Year;
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw new Error("NotImplemented");
    }
}
Fayde.Data.IValueConverter_.mark(WeekConverter);
export = WeekConverter;