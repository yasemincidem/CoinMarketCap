// @flow
import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {Text} from 'react-native-elements';

const Overlay = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.75);
  padding-bottom: 30px
`;
const Container = styled.View`
  justify-content: center;
  border-radius: 6px;
  width: 100%;
  background-color: #FFFFFF;
`;
const Header = styled.View`
  background-color: #f1f1f1;
  height: 40px;
  justify-content: center;
  padding-left: 20px;
`;
const Item = styled.TouchableOpacity`
  padding: 20px;
`;
type Props = {
  resetLists: Function,
  setState: Function,
  fetchListingsLatest: Function,
  defaultCurrency: string,
  sortDir: string,
  isVisibleSortByModal: boolean,
};
class SortByModal extends React.PureComponent<Props> {

  sortByType = (type: string) => {
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
      <Overlay onPress={this.onClose}>
        <Container>
          <Header><Text>Sort By</Text></Header>
          <Item onPress={() => this.sortByType('market_cap')}>
            <Text>Market Cap</Text>
          </Item>
          <Item onPress={() => this.sortByType('volume_24h')}>
            <Text>Volume 24h</Text>
          </Item>
          <Item onPress={() => this.sortByType('circulating_supply')}>
            <Text>Circulating Supply</Text>
          </Item>
          <Item onPress={() => this.sortByType('price')}>
            <Text>Price</Text>
          </Item>
          <Item onPress={() => this.sortByType('name')}>
            <Text>Name</Text>
          </Item>
        </Container>
      </Overlay>
    </Modal>);
  }
}
export default SortByModal;
