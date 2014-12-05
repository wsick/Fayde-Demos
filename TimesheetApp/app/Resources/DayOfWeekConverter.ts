class DayOfWeekConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        var dt = <DateTime>value;
        if (!dt || !(dt instanceof DateTime))
            return "-";
        return DayOfWeek[dt.DayOfWeek];
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw new Error("NotImplemented");
    }
}
nullstone.addTypeInterfaces(DayOfWeekConverter, Fayde.Data.IValueConverter_);
export = DayOfWeekConverter;