import {Record} from 'immutable';

export const INITIAL_STATE = Record({
  listingsLatest: {},
  listingsLatestIsLoading: false,
  listingsLatestErrorMessage: null,
});
