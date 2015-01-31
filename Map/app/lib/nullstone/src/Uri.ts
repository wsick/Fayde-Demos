/// <reference path="conversion" />

module nullstone {
    export enum UriKind {
        RelativeOrAbsolute = 0,
        Absolute = 1,
        Relative = 2
    }
    export class Uri {
        private $$originalString: string;
        private $$kind: UriKind;

        constructor (uri: Uri);
        constructor (uri: string, kind?: UriKind);
        constructor (uri?: any, kind?: UriKind) {
            if (typeof uri === "string") {
                this.$$originalString = uri;
                this.$$kind = kind || UriKind.RelativeOrAbsolute;
            } else if (uri instanceof Uri) {
                this.$$originalString = (<Uri>uri).$$originalString;
                this.$$kind = (<Uri>uri).$$kind;
            }
        }

        get kind (): UriKind {
            return this.$$kind;
        }

        get host (): string {
            var s = this.$$originalString;
            var ind = Math.max(3, s.indexOf("://") + 3);
            var end = s.indexOf("/", ind);
            //TODO: Strip port
            return (end < 0) ? s.substr(ind) : s.substr(ind, end - ind);
        }

        get absolutePath (): string {
            var s = this.$$originalString;
            var ind = Math.max(3, s.indexOf("://") + 3);
            var start = s.indexOf("/", ind);
            if (start < 0 || start < ind)
                return "/";
            var qstart = s.indexOf("?", start);
            if (qstart < 0 || qstart < start)
                return s.substr(start);
            return s.substr(start, qstart - start);
        }

        get scheme (): string {
            var s = this.$$originalString;
            var ind = s.indexOf("://");
            if (ind < 0)
                return null;
            return s.substr(0, ind);
        }

        get fragment (): string {
            var s = this.$$originalString;
            var ind = s.indexOf("#");
            if (ind < 0)
                return "";
            return s.substr(ind);
        }

        get originalString (): string {
            return this.$$originalString.toString();
        }

        toString (): string {
            return this.$$originalString.toString();
        }

        equals (other: Uri): boolean {
            return this.$$originalString === other.$$originalString;
        }

        static isNullOrEmpty (uri: Uri): boolean {
            if (uri == null)
                return true;
            return !uri.$$originalString;
        }
    }
    registerTypeConverter(Uri, (val: any): any => {
        if (val == null)
            val = "";
        return new Uri(val.toString());
    });
}