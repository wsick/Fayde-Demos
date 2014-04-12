class WeekConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        var dt = <DateTime>value;
        if (!dt || !(dt instanceof DateTime))
            dt = new DateTime();
        dt = dt.Date;
        var base = new DateTime(dt.Year, 1, 1);
        var diff = new TimeSpan(dt.Ticks - base.Ticks);
        var week = Math.floor(diff.TotalDays / 7);
        return week + "-" + dt.Year;
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw new Error("NotImplemented");
    }
}
Fayde.RegisterTypeInterfaces(WeekConverter, Fayde.Data.IValueConverter_);
export = WeekConverter;