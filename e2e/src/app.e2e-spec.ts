import {
  browser,
  element,
  by,
  ExpectedConditions as EC,
  logging,
} from 'protractor';

describe('Getting Started', () => {
  const pageElements = {
    topBarHeader: element(by.css('app-root app-top-bar h1')),
  };

  describe('General', () => {
    beforeAll(async () => {
      await browser.get('/');
    });

    it('should display "Tiny Url Generator"', async () => {
      const title = await pageElements.topBarHeader.getText();

      expect(title).toEqual('Tiny Url Generator');
    });
  });
});
