import { takeLatest, all } from 'redux-saga/effects'
import {fetchListingsLatest} from './ListingsLatest';
import { ListingsLatestTypes } from '../Stores/ListingsLatest/Actions'

export default function* root() {
  yield all([
    takeLatest(ListingsLatestTypes.FETCH_LISTINGS_LATEST, fetchListingsLatest),
])
}
