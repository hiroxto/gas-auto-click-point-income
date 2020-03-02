// eslint-disable-next-line no-undef
import GmailThread = GoogleAppsScript.Gmail.GmailThread;

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function autoClickPointIncome (): void {
  const threads = getGmailThreads();

  Logger.log(`Threads count : ${threads.length}`);

  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const messageBody = message.getPlainBody();
      const urls = pickUrlsFromMessageBody(messageBody);

      if (urls.length === 0) {
        Logger.log('urls is empty.');
        Logger.log(message);
        return;
      }

      urls.forEach(url => clickUrl(url));
      thread.moveToTrash();
    });
  });
}

function getGmailThreads (): GmailThread[] {
  return GmailApp.search('ポイントインカム クリック from:mag@pointi.jp');
}

function pickUrlsFromMessageBody (messageBody: string): string[] {
  const pointLines = messageBody.match(/クリックで(.+)ptゲット(\r\n|\n|\r)https(.+)(\r\n|\n|\r)/ig);

  if (pointLines === null) {
    return [];
  }

  return pointLines.map(line => {
    return line.match(/(\r\n|\n|\r)(.+)(\r\n|\n|\r)/)[2];
  });
}

function clickUrl (url: string): boolean {
  Logger.log(`Click : ${url}`);
  try {
    UrlFetchApp.fetch(url);

    return true;
  } catch (e) {
    console.log(e);
    Logger.log(e);
    return false;
  }
}
