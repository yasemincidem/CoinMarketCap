import { createActions } from 'reduxsauce';

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const { Types, Creators } = createActions({
  // Fetch listings latest
  fetchListingsLatest: null,
  // The operation has started and is loading
  fetchListingsLatestLoading: null,
  // Listings latest were successfully fetched
  fetchListingsLatestSuccess: ['listingsLatest'],
  // An error occurred
  fetchListingsLatestFailure: ['errorMessage'],
});

export const ListingsLatestTypes = Types;
export default Creators;
