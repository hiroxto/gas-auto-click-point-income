import { pickUrlsFromMessageBody_ } from '~/autoClickPointIncome.ts';

describe('pickUrlsFromMessageBody', (): void => {
  describe('valid urls', (): void => {
    test('should return urls.', (): void => {
      const messageBody = `
▼クリックで１ptゲット
https://pointi.jp/al/click_mail_magazine.php?num=1

▼クリックで１ptゲット
https://pointi.jp/al/click_mail_magazine.php?num=2

▼クリックで１ptゲット
https://pointi.jp/al/click_mail_magazine.php?num=3

▼詳細はこちらから
https://pointi.jp/dummy/url

■トップ
https://pointi.jp/
`;
      const pickedUrls = [
        'https://pointi.jp/al/click_mail_magazine.php?num=1',
        'https://pointi.jp/al/click_mail_magazine.php?num=2',
        'https://pointi.jp/al/click_mail_magazine.php?num=3',
      ];
      const response = pickUrlsFromMessageBody_(messageBody);
      expect(response).toStrictEqual(pickedUrls);
    });
  });

  describe('invalid urls', (): void => {
    describe('with http urls', (): void => {
      test('should return empty.', (): void => {
        const messageBody = `
▼クリックで１ptゲット
http://pointi.jp/al/click_mail_magazine.php?num=1

▼クリックで１ptゲット
http://pointi.jp/al/click_mail_magazine.php?num=2

▼クリックで１ptゲット
http://pointi.jp/al/click_mail_magazine.php?num=3

▼詳細はこちらから
https://pointi.jp/dummy/url

■トップ
https://pointi.jp/
`;
        const response = pickUrlsFromMessageBody_(messageBody);
        expect(response).toStrictEqual([]);
      });
    });

    describe('with empty clickable urls', (): void => {
      test('should return empty array.', (): void => {
        const messageBody = `
▼詳細はこちらから
https://pointi.jp/dummy/1

▼詳細はこちらから
https://pointi.jp/dummy/2

▼詳細はこちらから
https://pointi.jp/dummy/3

▼詳細はこちらから
https://pointi.jp/dummy/url

■トップ
https://example.com/
`;
        const response = pickUrlsFromMessageBody_(messageBody);
        expect(response).toStrictEqual([]);
      });
    });
  });
});
