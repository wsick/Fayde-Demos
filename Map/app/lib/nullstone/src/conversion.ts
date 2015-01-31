module nullstone {
    var converters: any = [];
    converters[Boolean] = function (val: any): boolean {
        if (val == null)
            return null;
        if (typeof val === "boolean")
            return val;
        var c = val.toString().toUpperCase();
        return c === "TRUE" ? true : (c === "FALSE" ? false : null);
    };
    converters[String] = function (val: any): String {
        if (val == null) return "";
        return val.toString();
    };
    converters[Number] = function (val: any): Number {
        if (!val) return 0;
        if (typeof val === "number")
            return val;
        return parseFloat(val.toString());
    };
    converters[Date] = function (val: any): Date {
        if (val == null)
            return new Date(0);
        return new Date(val.toString());
    };
    converters[RegExp] = function (val: any): RegExp {
        if (val instanceof RegExp)
            return val;
        if (val = null)
            throw new Error("Cannot specify an empty RegExp.");
        val = val.toString();
        return new RegExp(val);
    };

    export function convertAnyToType (val: any, type: Function): any {
        var converter: (val: any) => any = (<any>converters)[type];
        if (converter)
            return converter(val);
        if (type instanceof Enum) {
            var enumo = (<Enum><any>type).Object;
            if (enumo.Converter)
                return enumo.Converter(val);
            val = val || 0;
            if (typeof val === "string")
                return enumo[val];
            return val;
        }
        return val;
    }

    export function convertStringToEnum<T> (val: string, en: any): T {
        if (!val)
            return <T><any>0;
        return <T>en[val];
    }

    export function registerTypeConverter (type: Function, converter: (val: any) => any) {
        converters[type] = converter;
    }

    export function registerEnumConverter (e: any, converter: (val: any) => any) {
        e.Converter = converter;
    }
}