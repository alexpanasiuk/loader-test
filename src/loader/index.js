/**
 * Custom loader designed to cut code inside special comment.
 * Current comment syntax: /*<< CONDITION >>\*\/ SOURCE_CODE /*<< >>\*\/
 *
 * @param { String } source Source code or code from previous loader;
 * @returns { String } Source code without content inside special comment if match condition.
 */
function loader(source) {
  // Webpack cache function
  if (this.cacheable) {
    this.cacheable();
  }
  try {
    // Regex for special comments
    const re = /\/\*<< (.*?) >>\*\/(?:[\s]*(.*?)[\s]*)*?\/\*<< >>\*\//;

    source = source.replace(re, (match, p1, p2, offset) => {
      const envKey = p1;
      const content = p2;

      // Uncomment to print matched code
      // console.log(match);

      if (process.env[envKey] || envKey === '') {
        return '';
      }
      return match;
    });
  } catch (e) {
    console.log('=============================');
    console.log('Exception inside cutom loader!');
    console.log(e);
    console.log('=============================');
  }

  return source;
}

module.exports = loader;
