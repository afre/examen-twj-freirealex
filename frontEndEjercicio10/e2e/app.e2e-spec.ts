import { FrontEndEjercicio10Page } from './app.po';

describe('front-end-ejercicio10 App', () => {
  let page: FrontEndEjercicio10Page;

  beforeEach(() => {
    page = new FrontEndEjercicio10Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
