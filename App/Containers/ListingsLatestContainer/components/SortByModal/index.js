import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';

class SortByModal extends React.Component {
  sortByType = (type) => {
    this.props.resetLists();
    this.props.fetchListingsLatest(1, this.props.defaultCurrency, type, this.props.sortDir);
    this.onClose();
  };

  onClose = () => {
    this.props.setState('isVisibleSortByModal', false);
    this.props.setState('isVisibleLimitToModal', false);
  };

  render() {
    return (<Modal
      transparent
      visible={this.props.isVisibleSortByModal}
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
    </Modal>);
  }
}
export default SortByModal;
