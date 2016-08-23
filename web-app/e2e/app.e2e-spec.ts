import { GociPage } from './app.po';

describe('goci App', function() {
  let page: GociPage;

  beforeEach(() => {
    page = new GociPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
