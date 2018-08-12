import * as R from 'ramda';
import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectComponent } from '../../components/Select/Select.component';
import { AppState } from '../../reducers';
import { addCurrency, getCurrencies } from '../../store/currencies.actions';
import { SelectOptions, selectOptionsSelector } from '../../store/currencies.selectors';

interface StoreProps {
  currencies: SelectOptions[];
}

interface DispatchProps {
  getCurrencies: () => void;
  addCurrency: (curr: string) => void;
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
    if (item) {
      this.props.addCurrency(item);
    }
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


const mapStateToProps: (state: AppState) => StoreProps = R.applySpec({
  currencies: selectOptionsSelector,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators(
  { getCurrencies, addCurrency },
  dispatch,
);

export const NewCurrencyComponent =
  connect<StoreProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(NewCurrency);

