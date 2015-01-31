module nullstone.markup {
    export interface ICustomCollector {
        (ownerUri: string, ownerName: string, propName: string, val: any);
    }
    export interface IMarkupDependencyResolver<T> {
        add(uri: string, name: string): boolean;
        collect(root: T, customCollector?: ICustomCollector);
        resolve(): async.IAsyncRequest<any>;
    }
    export class MarkupDependencyResolver<T> implements IMarkupDependencyResolver<T> {
        private $$uris: string[] = [];
        private $$names: string[] = [];
        private $$resolving: string[] = [];

        constructor (public typeManager: ITypeManager, public parser: IMarkupParser<T>) {
        }

        collect (root: T, customCollector?: ICustomCollector) {
            //TODO: We need to collect
            //  ResourceDictionary.Source
            //  Application.ThemeName
            var blank = {};
            var oresolve: IOutType = {
                isPrimitive: false,
                type: Object
            };
            var last = {
                uri: "",
                name: "",
                obj: undefined
            };
            var parse = {
                resolveType: (uri, name) => {
                    this.add(uri, name);
                    last.uri = uri;
                    last.name = name;
                    return oresolve;
                },
                resolveObject: (type)=> {
                    return blank;
                },
                objectEnd: (obj, isContent, prev) => {
                    last.obj = obj;
                },
                propertyEnd: (ownerType, propName) => {
                },
                attributeEnd: (ownerType, attrName, obj) => {
                }
            };
            if (customCollector) {
                parse.propertyEnd = (ownerType, propName) => {
                    customCollector(last.uri, last.name, propName, last.obj);
                };
                parse.attributeEnd = (ownerType, attrName, obj) => {
                    customCollector(last.uri, last.name, attrName, obj);
                };
            }

            this.parser
                .on(parse)
                .parse(root);
        }

        add (uri: string, name: string): boolean {
            var uris = this.$$uris;
            var names = this.$$names;
            var ind = uris.indexOf(uri);
            if (ind > -1 && names[ind] === name)
                return false;
            if (this.$$resolving.indexOf(uri + "/" + name) > -1)
                return false;
            uris.push(uri);
            names.push(name);
            return true;
        }

        resolve (): async.IAsyncRequest<any> {
            var as: async.IAsyncRequest<any>[] = [];
            for (var i = 0, uris = this.$$uris, names = this.$$names, tm = this.typeManager, resolving = this.$$resolving; i < uris.length; i++) {
                var uri = uris[i];
                var name = names[i];
                resolving.push(uri + "/" + name);
                as.push(tm.loadTypeAsync(uri, name));
            }
            return async.many(as);
        }
    }
}