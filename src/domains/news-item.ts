type NewsItem = {
  id?: number;
  sourceId?: number;
  title: string;
  body: string;
  imageUrl?: string;
  published: Date;
};

export default NewsItem;
