export function formatNumberWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatUsdPrice(usdValue) {
  return usdValue.toFixed(2);
}

export function formatGems(gemValue) {
  let value = gemValue;
  if (typeof gemValue === "string") {
    value = parseFloat(gemValue) || 0.0;
  }
  return +value.toFixed(2);
}

export function formatEth(ethValue) {
  let value = ethValue;
  if (typeof ethValue === "string") {
    value = parseFloat(ethValue) || 0.0;
  }
  let decimals = 2;
  if (value < 0.01) {
    decimals = 4;
  } else if (value < 10) {
    decimals = 3;
  }
  return +value.toFixed(decimals);
}

export function formatAddress(address, type) {
  if (type === "short") {
    return address.substr(0, 6);
  }

  return address || "";
}

const decimals = 2;

export function getNormalizedPrice(usdPrice) {
  return usdPrice / 10 ** decimals;
}

export function sanitizeCount(newCount) {
  if (!Number.isNaN(newCount) && newCount >= 0 && newCount < 100) {
    return newCount;
  }
  if (newCount >= 100) {
    return 100;
  }
  return 0;
}

export function preventScrolling(shouldPrevent) {
  if (typeof document !== "undefined") {
    // Prevent scrolling
    if (shouldPrevent) {
      document.getElementById("header").classList.add("filter-open");
      document.body.classList.add("modal-open");
    } else {
      document.getElementById("header").classList.remove("filter-open");
      document.body.classList.remove("modal-open");
    }
  }
}

export function filterSetter(value, filterSet, setFilter) {
  if (filterSet.indexOf(value) === -1) {
    setFilter([...filterSet, value]);
  } else {
    const indexToRemove = filterSet.indexOf(value);
    const result = [...filterSet.slice(0, indexToRemove), ...filterSet.slice(indexToRemove + 1)];
    setFilter(result);
  }
}
