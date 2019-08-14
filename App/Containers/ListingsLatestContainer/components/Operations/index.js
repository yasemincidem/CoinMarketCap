// @flow
import {Button, Icon} from 'react-native-elements';
import styled from 'styled-components/native';
import React from 'react';

const Container = styled.View`
  height: 70;
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CED0CE;
  shadow-opacity: 0.75px;
  shadow-radius: 5px;
  shadow-color: #b3afaf;
  shadow-offset: {height: 0, width: 0};
  background-color: #f1f1f1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const StyledButton = styled(Button).attrs({
  buttonStyle: {
    height: 35,
    borderRadius: 20,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e3e4e3',
  },
  titleStyle: {fontSize: 12, color: 'black'},
})`
    width: ${props => props.size || '50px'}
`;

type Props = {
  defaultCurrency: string,
  sortBy: string,
  sortDir: string,
  setState: Function,
  resetLists: Function,
  fetchListingsLatest: Function,
  isVisibleSortByModal: boolean,
};
class Operations extends React.PureComponent<Props> {

  renderCurrency = () => {
    let defaultCurrency;
    if (this.props.defaultCurrency === 'BTC') {
      defaultCurrency = 'USD';
    } else {
      defaultCurrency = 'BTC';
    }
    this.props.setState('defaultCurrency', defaultCurrency);
    this.props.resetLists();
    this.props.fetchListingsLatest(1, defaultCurrency, this.props.sortBy, this.props.sortDir);
  };

  toggleSortByRank = () => {
    const sortDir = this.props.sortDir === 'asc' ? 'desc' : 'asc';
    this.props.setState('sortDir', sortDir);
    this.props.resetLists();
    this.props.fetchListingsLatest(1, this.props.defaultCurrency, this.props.sortBy, sortDir);
  };

  toggleSortByModal = () => {
    this.props.setState('isVisibleSortByModal', !this.props.isVisibleSortByModal);
  };

  render() {
    return (<Container>
      <StyledButton
        title={this.props.defaultCurrency}
        onPress={this.renderCurrency}
      />
      <StyledButton
        size={120}
        title='Sort by'
        onPress={this.toggleSortByModal}
      />
      <StyledButton
        title='Sort by Rank'
        size={120}
        iconRight
        icon={<Icon
          name={this.props.sortDir === 'asc' ? 'arrow-down' : 'arrow-up'}
          type='font-awesome'
          size={14}
          color='blue'/>}
        onPress={this.toggleSortByRank}
      />
    </Container>);
  }
}

export default Operations;
