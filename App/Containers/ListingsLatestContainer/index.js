import React, {Fragment} from 'react';
import {View, FlatList, compose, Modal, TouchableOpacity} from 'react-native';
import {Button, Icon, ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ListingsLatestActions from '../../Stores/ListingsLatest/Actions';
import {
  selectListingsLatest, selectSortBy,
  selectStart,
} from '../../Stores/ListingsLatest/Selectors';

class ListingsLatestContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      defaultCurrency: 'BTC',
      isVisibleSortByModal: false,
      isVisibleLimitToModal: false,
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

  renderCurrency = () => {
    let defaultCurrency;
    if (this.state.defaultCurrency === 'BTC') {
      defaultCurrency = 'USD';
    } else {
      defaultCurrency = 'BTC';
    }
    this.setState({defaultCurrency});
    this.props.resetLists();
    this.props.fetchListingsLatest(1, defaultCurrency, this.props.sortBy, this.state.sortDir);
  };

  toggleSortByRank = () => {
    const sortDir = this.state.sortDir === 'asc' ? 'desc' : 'asc';
    this.setState({sortDir});
    this.props.resetLists();
    this.props.fetchListingsLatest(1, this.state.defaultCurrency, this.props.sortBy, sortDir);
  };

  toggleSortByModal = () => {
    this.setState({isVisibleSortByModal: !this.state.isVisibleSortByModal});
  };

  sortByType = (type) => {
    this.props.resetLists();
    this.props.fetchListingsLatest(1, this.state.defaultCurrency, type, this.state.sortDir);
    this.onClose();
  };

  onClose = () => {
    this.setState({isVisibleSortByModal: false});
    this.setState({isVisibleLimitToModal: false});
  };

  render() {
    return (<Fragment>
        <View style={{
          height: 70,
          display: 'flex',
          borderWidth: 1,
          borderRadius: 2,
          borderColor: '#CED0CE',
          shadowOpacity: 0.75,
          shadowRadius: 5,
          shadowColor: '#b3afaf',
          shadowOffset: {height: 0, width: 0},
          backgroundColor: '#f1f1f1',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>

          <Button
            buttonStyle={{
              height: 35,
              width: 50,
              borderRadius: 20,
              backgroundColor: 'white',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#e3e4e3',
            }}
            title={this.state.defaultCurrency}
            onPress={this.renderCurrency}
            titleStyle={{fontSize: 12, color: 'black'}}
          />
          <Button
            buttonStyle={{
              height: 35,
              width: 120,
              borderRadius: 20,
              backgroundColor: 'white',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#e3e4e3',
            }}
            title='Sort by'
            onPress={this.toggleSortByModal}
            titleStyle={{fontSize: 12, color: 'black'}}
          />
          <Button
            buttonStyle={{
              height: 35,
              width: 120,
              borderRadius: 20,
              backgroundColor: 'white',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#e3e4e3',
            }}
            title='Sort by Rank'
            iconRight
            icon={<Icon
              name={this.state.sortDir === 'asc' ? 'arrow-down' : 'arrow-up'}
              type='font-awesome'
              size={14}
              color='blue'/>}
            onPress={this.toggleSortByRank}
            titleStyle={{fontSize: 12, color: 'black'}}
          />
        </View>
        <FlatList
          data={this.props.listingsLatest}
          renderItem={({item}) => (
            <ListItem
              leftElement={<Text style={{fontSize: 12, color: 'gray'}}>{`${item.cmc_rank} `}</Text>}
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
        <Modal
          transparent
          visible={this.state.isVisibleSortByModal}
          onRequestClose={this.onClose}>
          <TouchableOpacity style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            paddingBottom: 30,
          }} onPress={this.onClose}>
            <View style={{
              justifyContent: 'center',
              borderRadius: 6,
              width: '100%',
              backgroundColor: 'white',
            }}>
              <View style={{backgroundColor: '#f1f1f1', height: 40, justifyContent: 'center', paddingLeft: 20}}><Text>Sort
                By</Text></View>
              <TouchableOpacity style={{padding: 20}} onPress={() => this.sortByType('market_cap')}><Text>Market
                Cap</Text></TouchableOpacity>
              <TouchableOpacity style={{padding: 20}} onPress={() => this.sortByType('volume_24h')}><Text>Volume
                24h</Text></TouchableOpacity>
              <TouchableOpacity style={{padding: 20}} onPress={() => this.sortByType('circulating_supply')}><Text>Circulating
                Supply</Text></TouchableOpacity>
              <TouchableOpacity style={{padding: 20}}
                                onPress={() => this.sortByType('price')}><Text>Price</Text></TouchableOpacity>
              <TouchableOpacity style={{padding: 20}}
                                onPress={() => this.sortByType('name')}><Text>Name</Text></TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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
