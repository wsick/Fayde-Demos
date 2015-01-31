module nullstone.markup {
    export class Markup<T> {
        uri: Uri;
        root: T;

        constructor (uri: string) {
            this.uri = new Uri(uri);
        }

        createParser (): IMarkupParser<T> {
            return NO_PARSER;
        }

        resolve (typemgr: ITypeManager, customCollector?: ICustomCollector): async.IAsyncRequest<any> {
            var resolver = new MarkupDependencyResolver<T>(typemgr, this.createParser());
            resolver.collect(this.root, customCollector);
            return resolver.resolve();
        }

        loadAsync (): async.IAsyncRequest<Markup<T>> {
            var reqUri = "text!" + this.uri.toString();
            var md = this;
            return async.create((resolve, reject) => {
                (<Function>require)([reqUri], (data: string) => {
                    md.setRoot(md.loadRoot(data));
                    resolve(md);
                }, reject);
            });
        }

        loadRoot (data: string): T {
            return <T><any>data;
        }

        setRoot (markup: T): Markup<T> {
            this.root = markup;
            return this;
        }
    }
}