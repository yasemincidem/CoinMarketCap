import { createSelector } from 'reselect';
const selectListings = (state) => state.listings;

const selectListingsLatest = () => createSelector(
  selectListings,
  (state) => state.listingsLatest,
);

export {
  selectListingsLatest
}
