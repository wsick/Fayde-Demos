class DoubleValueConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        if (value === undefined) return null;
        return value.toFixed(2);
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw new Error("This ValueConverter only does conversion. It cannot convert back.");
    }
}
nullstone.addTypeInterfaces(DoubleValueConverter, Fayde.Data.IValueConverter_);
export = DoubleValueConverter;