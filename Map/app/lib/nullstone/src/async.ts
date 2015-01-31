module nullstone.async {
    export interface IAsyncRequest<T> {
        then(success: (result: T) => any, errored?: (error: any) => any): IAsyncRequest<T>;
    }
    export interface IAsyncResolution<T> {
        (resolve: (result: T) => any, reject: (error: any) => any);
    }

    export function create <T>(resolution: IAsyncResolution<T>): IAsyncRequest<T> {
        var onSuccess: (result: T)=>any;
        var onError: (error: any)=>any;

        var resolvedResult: any;

        function resolve (result: T) {
            resolvedResult = result;
            onSuccess && onSuccess(result);
        }

        var resolvedError: any;

        function reject (error: any) {
            resolvedError = error;
            onError && onError(error);
        }

        resolution(resolve, reject);

        var req = <IAsyncRequest<T>>{
            then: function (success: (result: T) => any, errored?: (error: any) => any): IAsyncRequest<T> {
                onSuccess = success;
                onError = errored;
                if (resolvedResult !== undefined)
                    onSuccess && onSuccess(resolvedResult);
                else if (resolvedError !== undefined)
                    onError && onError(resolvedError);
                return req;
            }
        };
        return req;
    }

    export function resolve<T>(obj: T): IAsyncRequest<T> {
        return async.create<T>((resolve, reject) => {
            resolve(obj);
        });
    }

    export function reject<T>(err: any): IAsyncRequest<T> {
        return async.create<T>((resolve, reject) => {
            reject(err);
        });
    }

    export function many<T>(arr: IAsyncRequest<T>[]): IAsyncRequest<T[]> {
        if (!arr || arr.length < 1)
            return resolve<T[]>([]);

        return create((resolve, reject) => {
            var resolves: T[] = new Array(arr.length);
            var errors: any[] = new Array(arr.length);
            var finished = 0;
            var count = arr.length;
            var anyerrors = false;

            function completeSingle (i: number, res: T, err: any) {
                resolves[i] = res;
                errors[i] = err;
                anyerrors = anyerrors || err !== undefined;
                finished++;
                if (finished >= count)
                    anyerrors ? reject(new AggregateError(errors)) : resolve(resolves);
            }

            for (var i = 0; i < count; i++) {
                arr[i].then(resi => completeSingle(i, resi, undefined),
                        erri => completeSingle(i, undefined, erri));
            }
        });
    }
}