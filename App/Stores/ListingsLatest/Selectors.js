import { createSelector } from 'reselect';
const selectListings = (state) => state.listings;

const selectListingsLatest = () => createSelector(
  selectListings,
  (state) => state.listingsLatest,
);
const selectStart = () => createSelector(
  selectListings,
  (state) => state.start,
);
const selectLimit = () => createSelector(
  selectListings,
  (state) => state.limit,
);
const selectCurrency = () => createSelector(
  selectListings,
  (state) => state.currency,
);
const selectSortBy = () => createSelector(
  selectListings,
  (state) => state.sortBy,
);
const selectLimitTo = () => createSelector(
  selectListings,
  (state) => state.limitTo,
);
const selectSortDir = () => createSelector(
  selectListings,
  (state) => state.sortDir,
);
const selectLoading = () => createSelector(
  selectListings,
  (state) => state.listingsLatestIsLoading,
);
export {
  selectListingsLatest,
  selectStart,
  selectLimit,
  selectCurrency,
  selectSortBy,
  selectLimitTo,
  selectSortDir,
  selectLoading
}
