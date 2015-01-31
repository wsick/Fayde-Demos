module nullstone {
    export class DirResolver implements ITypeResolver {
        loadAsync (moduleName: string, name: string): async.IAsyncRequest<any> {
            var reqUri = moduleName + '/' + name;
            return async.create((resolve, reject) => {
                (<Function>require)([reqUri], (rootModule) => {
                    resolve(rootModule);
                }, (err) => reject(new DirLoadError(reqUri, err)));
            });
        }

        resolveType (moduleName: string, name: string, /* out */oresolve: IOutType): boolean {
            oresolve.isPrimitive = false;
            oresolve.type = require(moduleName + '/' + name);
            return oresolve.type !== undefined;
        }
    }
}