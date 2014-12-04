class PlayerOpacityValueConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        if (value)
            return ".3";
        else
            return "1";
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw new Error("This ValueConverter only does conversion. It cannot convert back.");
    }
}
nullstone.addTypeInterfaces(PlayerOpacityValueConverter, Fayde.Data.IValueConverter_);
export = PlayerOpacityValueConverter;