import React, {Fragment} from 'react';
import { View, FlatList, compose } from "react-native";
import {Button, ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ListingsLatestActions from '../../Stores/ListingsLatest/Actions'
import {
  selectListingsLatest,
  selectStart,
} from '../../Stores/ListingsLatest/Selectors';

class ListingsLatestContainer extends React.Component {

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = (start) => {
    this.props.fetchListingsLatest(start);
  };

  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      const { start } = this.props;
      this.makeRemoteRequest(start + 20);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  formatWithFloat = (price) => {
    return Math.round(price*100000000)/100000000;
  };

  render() {
    return (<Fragment>
        <View style={{ height: 70,
          display: 'flex',
          borderWidth: 1,
          borderRadius: 2,
          borderColor: '#CED0CE',
          shadowOpacity: 0.75,
          shadowRadius: 5,
          shadowColor: '#b3afaf',
          shadowOffset: { height: 0, width: 0 },
          backgroundColor: '#f1f1f1',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>

          <Button
            buttonStyle={{height: 35, width: 50, borderRadius: 20, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#e3e4e3'}}
            title='BTC'
            titleStyle={{ fontSize: 12, color: 'black' }}
          />
          <Button
            buttonStyle={{height: 35, width: 100, borderRadius: 20, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#e3e4e3'}}
            title='Sort by Rank'
            titleStyle={{ fontSize: 12, color: 'black' }}
          />
          <Button
            buttonStyle={{height: 35, width: 60, borderRadius: 20, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#e3e4e3'}}
            title='% 1(h)'
            titleStyle={{ fontSize: 12, color: 'black' }}
          />
          <Button
            buttonStyle={{height: 35, width: 80, borderRadius: 20, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#e3e4e3'}}
            title='Top 100'
            titleStyle={{ fontSize: 12, color: 'black' }}
          />
        </View>
      <FlatList
        data={this.props.listingsLatest}
        renderItem={({ item, index }) => (
          <ListItem
            leftElement={<Text style={{ fontSize: 12, color: 'gray'}}>{`${index+1} `}</Text>}
            title={`${item.name}`}
            subtitle={item.symbol}
            titleStyle={{ fontSize: 12, fontWeight: '600' }}
            subtitleStyle={{ color: 'gray' }}
            leftAvatar={{ source: { uri: `https://s2.coinmarketcap.com/static/img/coins/128x128/${item.id}.png` } }}
            rightTitle={`${this.formatWithFloat(item.quote['BTC'].price)} ${'BTC'}`}
            rightTitleStyle={{ fontSize: 10, fontWeight: '600', color: 'black' }}
            rightSubtitle={`MCap ${item.quote['BTC'].market_cap.toFixed()} ${'BTC'}`}
            rightSubtitleStyle={{ fontSize: 10 }}
            rightSubtitleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
            rightTitleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
          />
        )}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
      />
      </Fragment>
    );
  }
};

export const mapStateToProps = createStructuredSelector({
  listingsLatest: selectListingsLatest(),
  start: selectStart(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchListingsLatest: (start) => dispatch(ListingsLatestActions.fetchListingsLatest(start)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingsLatestContainer)
