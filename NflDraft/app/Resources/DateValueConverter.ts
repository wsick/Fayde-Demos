class DateValueConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        if (value === undefined) return null;
        return value.getMonth() + "/" + value.getDate() + "/" + value.getFullYear();
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw new Error("This ValueConverter only does conversion. It cannot convert back.");
    }
}
nullstone.addTypeInterfaces(DateValueConverter, Fayde.Data.IValueConverter_);
export = DateValueConverter;