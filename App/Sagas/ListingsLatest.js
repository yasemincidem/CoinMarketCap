import { call, put, select } from 'redux-saga/effects';
import ApiService  from '../Services/ApiService';
import ListingsLatestActions from '../Stores/ListingsLatest/Actions';
import {
  selectCurrency,
  selectLimit,
  selectSortBy,
  selectSortDir,
  selectStart,
} from '../Stores/ListingsLatest/Selectors';

export function* fetchListingsLatest() {
  const start = yield select(selectStart());
  const limit = yield select(selectLimit());
  const currency = yield select(selectCurrency());
  const sortBy = yield select(selectSortBy());
  const sortDir = yield select(selectSortDir());
  yield put(ListingsLatestActions.fetchListingsLatestLoading());
  const listingsLatest = yield call(ApiService, `listings/latest?start=${start}&limit=${limit}&convert=${currency}&sort=${sortBy}&sort_dir=${sortDir}`, {
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
