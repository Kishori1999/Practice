export default <T>(path: string, defaultValue: T): T => {
  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    return require(path);
  } catch (err) {
    return defaultValue;
  }
};
