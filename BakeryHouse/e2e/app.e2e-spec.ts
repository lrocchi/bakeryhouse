import { BakeryHousePage } from './app.po';

describe('bakery-house App', () => {
  let page: BakeryHousePage;

  beforeEach(() => {
    page = new BakeryHousePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
