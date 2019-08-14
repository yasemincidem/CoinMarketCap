/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ListingsLatestTypes } from './Actions'

export const resetLists = () => ({
  listingsLatest: [],
  loading: true,
  listingsLatestIsLoading: true,
});

export const fetchListingsLatest = (state, { start = INITIAL_STATE.start, limit = INITIAL_STATE.limit, currency = 'BTC', sortBy='market_cap', sortDir='asc' }) => ({
  ...state,
  start,
  limit,
  currency,
  sortBy,
  sortDir,
});

export const fetchListingsLatestLoading = (state) => ({
  ...state,
  listingsLatestIsLoading: true,
  listingsLatestErrorMessage: null,
});

export const fetchListingsLatestSuccess = (state, { listingsLatest }) => ({
  ...state,
  listingsLatest: [...state.listingsLatest, ...listingsLatest],
  listingsLatestIsLoading: false,
  listingsLatestErrorMessage: null,
  loading: false,
});

export const fetchListingsLatestFailure = (state, { errorMessage }) => ({
  ...state,
  listingsLatest: {},
  listingsLatestIsLoading: false,
  listingsLatestErrorMessage: errorMessage,
  loading: false,
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const ListingsLatestReducers = createReducer(INITIAL_STATE, {
  [ListingsLatestTypes.RESET_LISTS]: resetLists,
  [ListingsLatestTypes.FETCH_LISTINGS_LATEST]: fetchListingsLatest,
  [ListingsLatestTypes.FETCH_LISTINGS_LATEST_LOADING]: fetchListingsLatestLoading,
  [ListingsLatestTypes.FETCH_LISTINGS_LATEST_SUCCESS]: fetchListingsLatestSuccess,
  [ListingsLatestTypes.FETCH_LISTINGS_LATEST_FAILURE]: fetchListingsLatestFailure,
});
