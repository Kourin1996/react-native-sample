import Realm from 'realm';
import { NewsSource } from 'domains';
import { NewsSourceSchema } from 'schemas';

type ObjectType = Realm.Object & NewsSourceSchema;

export default class NewsSourceRepository {
  private _realm: Realm;
  private _tableName: string;
  constructor(realm: Realm, tableName: string) {
    this._realm = realm;
    this._tableName = tableName;
  }

  getNumberOfSources = (): number => {
    const objects = this._getObjects();
    return objects.length;
  };

  getAll = (): NewsSource[] => {
    const objects = this._getObjects();
    return objects.map(this._objectToSource);
  };

  findByRssUrl = (rssUrl: string): NewsSource[] => {
    const objects = this._getObjects().filtered(`rssUrl = "${rssUrl}"`);
    return objects.map(this._objectToSource);
  };

  putSource = (source: NewsSource): Promise<NewsSource> => {
    const currentSize = this.getNumberOfSources();
    return new Promise((resolve) => {
      source.id = currentSize;
      this._realm.write(() => {
        this._realm.create(this._tableName, source);
        console.log('create new source', source);
        resolve(source);
      });
    });
  };

  _getObjects = (): Realm.Results<ObjectType> => {
    return this._realm.objects<NewsSourceSchema>(this._tableName);
  };

  _objectToSource = (object: ObjectType): NewsSource => {
    return {
      id: object.id,
      name: object.name,
      description: object.description,
      rssUrl: object.rssUrl,
      siteUrl: object.siteUrl,
      logoUrl: object.logoUrl,
      lastUpdated: object.lastUpdated,
    };
  };
}
