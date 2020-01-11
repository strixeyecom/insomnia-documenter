import showdown from 'showdown';
const markdown = new showdown.Converter({
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
  excludeTrailingPunctuationFromURLs: true,
  tables: true
});

export default markdown;
