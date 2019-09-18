module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  // console.log('Custom loader');

  try {
    const re = /\/\*<< (.*?) >>\*\/[\s]*(.*?)[\s]*\/\*<< >>\*\//;

    let hasSplitTags = true;
    while (hasSplitTags) {
      const match = re.exec(source);

      if (match) {
        const { index } = match;
        const strLength = match[0].length;
        const envKey = match[1];

        if (process.env[envKey]) {
          source = source.substring(index, index + strLength);
          hasSplitTags = true;
        }
      } else {
        hasSplitTags = false;
      }
    }
  } catch (e) {
    console.log('Exception!!!');
    console.log(e);
  }

  console.log('============================');
  console.log(source);
  console.log('============================\n');

  return source;
};
