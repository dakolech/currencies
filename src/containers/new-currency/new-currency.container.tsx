import * as R from 'ramda';
import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectComponent } from '../../components/Select/Select.component';
import { AppState } from '../../reducers';
import { getCurrencies } from '../../store/currencies.actions';

interface StoreProps {
  currencies: any[];
}

interface DispatchProps {
  getCurrencies: () => void;
}

export class NewCurrency extends Component<StoreProps & DispatchProps> {
  constructor(props: StoreProps & DispatchProps) {
    super(props);
    this.handleSelectCurrency = this.handleSelectCurrency.bind(this);
  }

  public componentDidMount() {
    this.props.getCurrencies();
  }

  public handleSelectCurrency(item: string) {
    console.log(item);
  }

  public render() {
    return (
      <SelectComponent
        currentValue={''}
        options={this.props.currencies}
        handleChange={this.handleSelectCurrency}
      />
    );
  }
}

const mapStateToProps = (state: AppState): StoreProps => ({
  currencies: R.pathOr([], [ 'currencies', 'values' ], state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators(
  { getCurrencies },
  dispatch,
);

export const NewCurrencyComponent =
  connect<StoreProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(NewCurrency);

