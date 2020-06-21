type NewsItem = {
  id?: string;
  sourceId?: string;
  title: string;
  summary: string;
  body: string;
  date: Date;
  imageUrls: string[];
};

export default NewsItem;
