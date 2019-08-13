import { call, put } from 'redux-saga/effects';
import ApiService  from '../Services/ApiService';
import ListingsLatestActions from '../Stores/ListingsLatest/Actions';

export function* fetchListingsLatest() {
  yield put(ListingsLatestActions.fetchListingsLatestLoading());
  const listingsLatest = yield call(ApiService, 'listings/latest', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ContentType: 'application/json',
      'X-CMC_PRO_API_KEY': 'ed325616-6d15-4d38-86e7-cc7304f35520'
    },
  });
  try {
    yield put(ListingsLatestActions.fetchListingsLatestSuccess(listingsLatest));
  } catch (err) {
    yield put(ListingsLatestActions.fetchListingsLatestFailure('There was an error while fetching user informations.'))
  }
}
