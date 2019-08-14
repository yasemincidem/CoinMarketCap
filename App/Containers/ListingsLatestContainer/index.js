import React from 'react';
import { View, FlatList, ActivityIndicator, compose } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ListingsLatestActions from '../../Stores/ListingsLatest/Actions'
import {
  selectLimit,
  selectListingsLatest,
  selectLoading,
  selectRefreshing,
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
      const { start, limit } = this.props;
      console.log('start', start + 20);
      console.log('limit', limit);
      this.makeRemoteRequest(start + 20);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.props.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    console.log('listingsLatest', this.props.listingsLatest);
    return (<FlatList
        data={this.props.listingsLatest}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            title={`${item.name}`}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        )}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
      />
    );
  }
};

ListingsLatestContainer.propTypes = {
};

export const mapStateToProps = createStructuredSelector({
  listingsLatest: selectListingsLatest(),
  start: selectStart(),
  limit: selectLimit(),
  refreshing: selectRefreshing(),
  loading: selectLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchListingsLatest: (start) => dispatch(ListingsLatestActions.fetchListingsLatest(start)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingsLatestContainer)
