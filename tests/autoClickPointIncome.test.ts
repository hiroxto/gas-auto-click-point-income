import { pickUrlsFromMessageBody_ } from '~/autoClickPointIncome.ts';

describe('pickUrlsFromMessageBody_', (): void => {
  describe('URL の抽出が可能なメール', (): void => {
    test('クリック系の URL を抽出する', (): void => {
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
      const expectedUrls = [
        'https://pointi.jp/al/click_mail_magazine.php?num=1',
        'https://pointi.jp/al/click_mail_magazine.php?num=2',
        'https://pointi.jp/al/click_mail_magazine.php?num=3',
      ];
      const pickedUrls = pickUrlsFromMessageBody_(messageBody);
      expect(pickedUrls).toStrictEqual(expectedUrls);
    });

    test('クイズ系の URL を抽出する', (): void => {
      const messageBody = `
▼メリメロクイズ回答で[ ３pt! ]
https://pointi.jp/al/click_mail_magazine.php?no=1

▼詳細はこちらから
https://pointi.jp/dummy/url

■トップ
https://pointi.jp/
`;
      const expectedUrls = [
        'https://pointi.jp/al/click_mail_magazine.php?no=1',
      ];
      const pickedUrls = pickUrlsFromMessageBody_(messageBody);
      expect(pickedUrls).toStrictEqual(expectedUrls);
    });
  });

  describe('URL の抽出が不可能なメール', (): void => {
    describe('HTTP な URL', (): void => {
      test('何も返さない', (): void => {
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
        const pickedUrls = pickUrlsFromMessageBody_(messageBody);
        expect(pickedUrls).toStrictEqual([]);
      });
    });

    describe('クリックする URL が存在しないメール', (): void => {
      test('何も返さない', (): void => {
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
        const pickedUrls = pickUrlsFromMessageBody_(messageBody);
        expect(pickedUrls).toStrictEqual([]);
      });
    });
  });
});
