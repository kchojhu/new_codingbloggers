import { NewCodingbloggersPage } from './app.po';

describe('new-codingbloggers App', function() {
  let page: NewCodingbloggersPage;

  beforeEach(() => {
    page = new NewCodingbloggersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
