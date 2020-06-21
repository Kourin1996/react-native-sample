import Realm from 'realm';

class NewsSourceSchema {
  public static schema: Realm.ObjectSchema = {
    name: 'NewsSource',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      description: 'string',
      rssUrl: { type: 'string', indexed: true },
      siteUrl: 'string',
      logoUrl: 'string?',
      lastUpdated: 'date',
    },
  };

  public id!: number;
  public name!: string;
  public description!: string;
  public rssUrl!: string;
  public siteUrl!: string;
  public logoUrl!: string;
  public lastUpdated!: Date;
}

export default NewsSourceSchema;
