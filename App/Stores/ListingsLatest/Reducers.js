/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ListingsLatestTypes } from './Actions'

export const fetchListingsLatestLoading = (state) => ({
  ...state,
  listingsLatestIsLoading: true,
  listingsLatestErrorMessage: null,
});

export const fetchListingsLatestSuccess = (state, { listingsLatest }) => ({
  ...state,
  listingsLatest,
  listingsLatestIsLoading: false,
  listingsLatestErrorMessage: null,
});

export const fetchListingsLatestFailure = (state, { errorMessage }) => ({
  ...state,
  listingsLatest: {},
  listingsLatestIsLoading: false,
  listingsLatestErrorMessage: errorMessage,
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const ListingsLatestReducers = createReducer(INITIAL_STATE, {
  [ListingsLatestTypes.FETCH_LISTINGS_LATEST_LOADING]: fetchListingsLatestLoading,
  [ListingsLatestTypes.FETCH_LISTINGS_LATEST_SUCCESS]: fetchListingsLatestSuccess,
  [ListingsLatestTypes.FETCH_LISTINGS_LATEST_FAILURE]: fetchListingsLatestFailure,
});
