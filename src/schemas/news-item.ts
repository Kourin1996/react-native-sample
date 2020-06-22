import Realm from 'realm';

class NewsItemSchema {
  public static schema: Realm.ObjectSchema = {
    name: 'NewsItem',
    primaryKey: 'id',
    properties: {
      id: 'int',
      sourceId: 'int',
      title: { type: 'string', indexed: true },
      body: 'string',
      imageUrl: 'string?',
      published: 'date',
      url: 'string?',
    },
  };

  public id!: number;
  public sourceId!: number;
  public title!: string;
  public body!: string;
  public imageUrl?: string;
  public published!: Date;
  public url?: string;
}

export default NewsItemSchema;
