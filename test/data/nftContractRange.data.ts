export = (seed: number) => {
  const probabilityFrom = (seed % 10) / 10;
  return ({
    probabilityFrom,
    probabilityTo: probabilityFrom + 0.1,
    serialNumbers: [seed],
  });
};
