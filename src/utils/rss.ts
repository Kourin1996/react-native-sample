import RssParser from 'react-native-rss-parser';
import { NewsSource, NewsItem } from 'domains';

export const fetchRssSourceInfo = async (
  rssUrl: string,
): Promise<[NewsSource, NewsItem[]]> => {
  const result = await fetch(rssUrl)
    .then((res) => res.text())
    .then((data) => RssParser.parse(data));
  const { title, links, description, lastUpdated, image } = result;

  const source: NewsSource = {
    name: title,
    description: description,
    rssUrl: rssUrl,
    siteUrl: links[0]?.url,
    logoUrl: image?.url,
    lastUpdated: new Date(lastUpdated),
  };
  const items = result.items.map(parseRssItem);

  return [source, items];
};

export const fetchRssItems = async (rssUrl: string): Promise<NewsItem[]> => {
  const result = await fetch(rssUrl)
    .then((res) => res.text())
    .then((data) => RssParser.parse(data));
  const items = result.items.map(parseRssItem);
  return items;
};

const getFirstImageFromFeedItem = (
  item: RssParser.FeedItem,
): string | undefined => {
  for (const enc of item.enclosures) {
    if (enc.mimeType.indexOf('image/') === 0) {
      return enc.url;
    }
  }
};

const parseRssItem = (item: RssParser.FeedItem): NewsItem => {
  const imageUrl = getFirstImageFromFeedItem(item);
  console.log('parseRssItem', item.links);
  return {
    title: item.title,
    body: item.description.replace(/(<\/?[^>]+(>|$))|(\n)|(\s\s+)/g, ''),
    imageUrl: imageUrl,
    published: new Date(item.published),
    url: item.links.length > 0 ? item.links[0].url : undefined,
  };
};
