import { createSelector } from 'reselect';
const selectListings = (state) => state.listings;

const selectListingsLatest = () => createSelector(
  selectListings,
  (state) => state.listingsLatest,
);
const selectRefreshing = () => createSelector(
  selectListings,
  (state) => state.refreshing,
);
const selectLoading = () => createSelector(
  selectListings,
  (state) => state.loading,
);
const selectStart = () => createSelector(
  selectListings,
  (state) => state.start,
);
const selectLimit = () => createSelector(
  selectListings,
  (state) => state.limit,
);
export {
  selectListingsLatest,
  selectLoading,
  selectRefreshing,
  selectStart,
  selectLimit
}
