import React, {Fragment} from 'react';
import {View, FlatList, compose} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ListingsLatestActions from '../../Stores/ListingsLatest/Actions';
import {
  selectListingsLatest, selectSortBy,
  selectStart,
} from '../../Stores/ListingsLatest/Selectors';
import Operations from './components/Operations';
import SortByModal from './components/SortByModal';

class ListingsLatestContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      isVisibleSortByModal: false,
      isVisibleLimitToModal: false,
      defaultCurrency: 'BTC',
      sortDir: 'desc',
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = (start) => {
    this.props.fetchListingsLatest(start, this.state.defaultCurrency, this.props.sortBy, this.state.sortDir);
  };

  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      const {start} = this.props;
      this.makeRemoteRequest(start + 20);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  formatWithFloat = (price) => {
    return Math.round(price * 100000000) / 100000000;
  };

  getPrice = (item) => {
    let price;
    if (this.state.defaultCurrency === 'USD') {
      price = `$${this.formatWithFloat(item.quote[this.state.defaultCurrency].price || 0)}`;
    } else {
      price = `${this.formatWithFloat(item.quote[this.state.defaultCurrency].price || 0)} ${this.state.defaultCurrency}`;
    }
    return price;
  };

  render() {
    return (<Fragment>
        <Operations
          sortDir={this.state.sortDir}
          sortBy={this.props.sortBy}
          defaultCurrency={this.state.defaultCurrency}
          isVisibleSortByModal={this.state.isVisibleSortByModal}
          resetLists={() => this.props.resetLists()}
          setState={(field, value) => this.setState({ [field]: value })}
          fetchListingsLatest={(start, currency, sortBy, sortDir) => this.props.fetchListingsLatest(start, currency, sortBy, sortDir)}/>
        <FlatList
          data={this.props.listingsLatest}
          renderItem={({item, index}) => (
            <ListItem
              leftElement={<Text style={{fontSize: 12, color: 'gray'}}>{`${index + 1} `}</Text>}
              title={`${item.name}`}
              subtitle={item.symbol}
              titleStyle={{fontSize: 12, fontWeight: '600'}}
              subtitleStyle={{color: 'gray'}}
              leftAvatar={{source: {uri: `https://s2.coinmarketcap.com/static/img/coins/128x128/${item.id}.png`}}}
              rightTitle={this.getPrice(item)}
              rightTitleStyle={{fontSize: 10, fontWeight: '600', color: 'black'}}
              rightSubtitle={`MCap ${item.quote[this.state.defaultCurrency].market_cap ? item.quote[this.state.defaultCurrency].market_cap.toFixed() : 0} ${this.state.defaultCurrency}`}
              rightSubtitleStyle={{fontSize: 10}}
              rightSubtitleProps={{ellipsizeMode: 'tail', numberOfLines: 1}}
              rightTitleProps={{ellipsizeMode: 'tail', numberOfLines: 1}}
            />
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
        <SortByModal
          defaultCurrency={this.state.defaultCurrency}
          sortDir={this.state.sortDir}
          isVisibleSortByModal={this.state.isVisibleSortByModal}
          resetLists={() => this.props.resetLists()}
          setState={(field, value) => this.setState({ [field]: value })}
          fetchListingsLatest={(start, currency, sortBy, sortDir) =>
            this.props.fetchListingsLatest(start, currency, sortBy, sortDir)} />
      </Fragment>
    );
  }
};

export const mapStateToProps = createStructuredSelector({
  listingsLatest: selectListingsLatest(),
  start: selectStart(),
  sortBy: selectSortBy(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchListingsLatest: (start, currency, sortBy, sortDir) => dispatch(ListingsLatestActions.fetchListingsLatest(start, currency, sortBy, sortDir)),
  resetLists: () => dispatch(ListingsLatestActions.resetLists()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingsLatestContainer);
