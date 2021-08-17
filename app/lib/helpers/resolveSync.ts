export default (promiseFns: (() => Promise<any>)[]): Promise<void> => (
  promiseFns.reduce(
    (result, promise) => result.then(() => promise()),
    Promise.resolve(),
  )
);
