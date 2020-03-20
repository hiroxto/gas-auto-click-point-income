import { pickUrlsFromMessageBody_ } from '~/autoClickPointIncome.ts';

describe('pickUrlsFromMessageBody', (): void => {
  describe('valid urls', (): void => {
    test('should return urls.', (): void => {
      const messageBody = `
▼クリックで１ptゲット
https://example.com/path/to/click-1

▼クリックで１ptゲット
https://example.com/path/to/click-2

▼クリックで１ptゲット
https://example.com/path/to/click-3

▼詳細はこちらから
https://dummy.example.com/path/to/click-1

■トップ
https://example.com/
`;
      const urls = ['https://example.com/path/to/click-1', 'https://example.com/path/to/click-2', 'https://example.com/path/to/click-3'];
      const response = pickUrlsFromMessageBody_(messageBody);
      expect(response).toStrictEqual(urls);
    });
  });

  describe('invalid urls', (): void => {
    describe('with http urls', (): void => {
      test('should return empty.', (): void => {
        const messageBody = `
▼クリックで１ptゲット
http://example.com/path/to/click-1

▼クリックで１ptゲット
http://example.com/path/to/click-2

▼クリックで１ptゲット
http://example.com/path/to/click-3

▼詳細はこちらから
https://dummy.example.com/path/to/click-1

■トップ
https://example.com/
`;
        const response = pickUrlsFromMessageBody_(messageBody);
        expect(response).toStrictEqual([]);
      });
    });

    describe('with empty clickable urls', (): void => {
      test('should return empty array.', (): void => {
        const messageBody = `
▼詳細はこちらから
https://example.com/path/to/click-1

▼詳細はこちらから
https://example.com/path/to/click-2

▼詳細はこちらから
https://example.com/path/to/click-3

▼詳細はこちらから
https://dummy.example.com/path/to/click-1

■トップ
https://example.com/
`;
        const response = pickUrlsFromMessageBody_(messageBody);
        expect(response).toStrictEqual([]);
      });
    });
  });
});
