// eslint-disable-next-line no-undef
import GmailThread = GoogleAppsScript.Gmail.GmailThread;

export function autoClickPointIncome (): void {
  const threads = getGmailThreads_();

  Logger.log(`Threads count : ${threads.length}`);

  threads.forEach(thread => {
    const messages = thread.getMessages();
    const message = messages[0];
    const messageBody = message.getPlainBody();
    const urls = pickUrlsFromMessageBody_(messageBody);

    if (urls.length === 0) {
      Logger.log('urls is empty.');
      Logger.log(message);
      return;
    }

    urls.forEach(url => clickUrl_(url));
    thread.moveToTrash();
  });
}

export function getGmailThreads_ (): GmailThread[] {
  return GmailApp.search('ポイントインカム クリック from:mag@pointi.jp');
}

export function pickUrlsFromMessageBody_ (messageBody: string): string[] {
  const pointLines = messageBody.match(/https:\/\/pointi\.jp\/al\/click_mail_magazine\.php(.+)(\r\n|\n|\r)/ig);

  if (pointLines === null) {
    return [];
  }

  return pointLines.map(line => line.trim());
}

export function clickUrl_ (url: string): boolean {
  Logger.log(`Click : ${url}`);
  try {
    UrlFetchApp.fetch(url, { followRedirects: true });

    return true;
  } catch (e) {
    console.log(e);
    Logger.log(e);
    return false;
  }
}
