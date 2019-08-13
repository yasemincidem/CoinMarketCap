import React from 'react';
import {View, Text, compose} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ListingsLatestActions from '../../Stores/ListingsLatest/Actions'
import { selectListingsLatest } from '../../Stores/ListingsLatest/Selectors'

class ListingsLatestContainer extends React.Component {

  componentDidMount() {
    this.props.fetchListingsLatest();
  }

  render() {
    console.log('listingsLatest', this.props.listingsLatest);
    return (<View>
      <Text>
        test
      </Text>
    </View>);
  }
};

ListingsLatestContainer.propTypes = {
};

export const mapStateToProps = createStructuredSelector({
  listingsLatest: selectListingsLatest(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchListingsLatest: () => dispatch(ListingsLatestActions.fetchListingsLatest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingsLatestContainer)
