import Realm from 'realm';
import { NewsItem } from 'domains';
import { NewsItemSchema } from 'schemas';

type ObjectType = Realm.Object & NewsItemSchema;

export default class NewsItemRepository {
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

  getItems = (limit = 20, offset = 0): NewsItem[] => {
    const objects = this._getObjects();
    return objects
      .sorted('published')
      .slice(offset, limit)
      .map(this._objectToItem);
  };

  getItemsBySourceIndex = (
    sourceId: number,
    limit = 20,
    offset = 0,
  ): NewsItem[] => {
    const objects = this._getObjects();
    return objects
      .filtered(`sourceId = "${sourceId}"`)
      .sorted('published')
      .slice(offset, limit)
      .map(this._objectToItem);
  };

  putItems = (items: NewsItem[]): Promise<NewsItem[]> => {
    const currentSize = this.getNumberOfSources();
    return new Promise((resolve) => {
      this._realm.write(() => {
        const itemsWithIds = items.map((item, index) => {
          item.id = currentSize + index;
          this._realm.create(this._tableName, item);
          return item;
        });
        resolve(itemsWithIds);
      });
    });
  };

  _getObjects = (): Realm.Results<ObjectType> => {
    return this._realm.objects<NewsItemSchema>(this._tableName);
  };

  _objectToItem = (object: ObjectType): NewsItem => {
    return {
      id: object.id,
      sourceId: object.sourceId,
      title: object.title,
      body: object.body,
      imageUrl: object.imageUrl,
      published: object.published,
    };
  };
}
