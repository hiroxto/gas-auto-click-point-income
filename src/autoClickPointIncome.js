function autoClickPointIncome() {
  const threads = GmailApp.search('ポイントインカム クリック from:mag@pointi.jp');

  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const messageBody = message.getPlainBody();
      const urls = pickUrlsFromMessageBody(messageBody);
      urls.forEach(url => clickUrl(url));

      thread.moveToTrash();
    });
  });
}

function pickUrlsFromMessageBody(messageBody) {
  const pointLines = messageBody.match(/クリックで(.+)ptゲット(\r\n|\n|\r)https(.+)(\r\n|\n|\r)/ig);

  if (pointLines === null) {
    return []
  }

  return pointLines.map(line => {
    return line.match(/(\r\n|\n|\r)(.+)(\r\n|\n|\r)/)[2]
  })
}

function clickUrl(url) {
  Logger.log(`Click : ${url}`);
  try {
    return UrlFetchApp.fetch(url);
  }
  catch (e) {
    console.log(e);
    Logger.log(e);
    return e;
  }
}