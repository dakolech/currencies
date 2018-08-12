import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrencyContainerComponent } from '../../components/Currency-Container/Currency-Container.component';
import { RemoveButtonComponent } from '../../components/Remove-Button/Remove-Button.component';
import { RowComponent } from '../../components/Row/row.component';
import { TextComponent } from '../../components/Text/Text.component';
import { TitleComponent } from '../../components/Title/Title.component';
import { CurrenciesPayload } from '../../models/currencies-payload.model';
import { AppState } from '../../reducers';
import { removeCurrency } from '../../store/currencies.actions';
import { getCurrencySelector } from '../../store/currencies.selectors';

interface OwnProps {
  currency: string;
}

interface StoreProps {
  currencyInfo: CurrenciesPayload | undefined;
}

interface DispatchProps {
  removeCurrency: (curr: string) => void;
}

function CurrencyItem(props: OwnProps & DispatchProps & StoreProps) {
  const remove = () => props.removeCurrency(props.currency);

  if (props.currencyInfo) {
    const { currency, code, bid, ask } = props.currencyInfo;

    return (
      <CurrencyContainerComponent>
        <RowComponent>
          <TitleComponent>{currency}</TitleComponent>
        </RowComponent>
        <RowComponent>
          <TextComponent>Code: {code}</TextComponent>
        </RowComponent>
        <RowComponent>
          <TextComponent>Buy exchange rate: {bid}</TextComponent>
        </RowComponent>
        <RowComponent>
          <TextComponent>Sell exchange rate: {ask}</TextComponent>
        </RowComponent>
        <RemoveButtonComponent onClick={remove}>
          <TextComponent>Remove</TextComponent>
        </RemoveButtonComponent>
      </CurrencyContainerComponent>
    );
  }

  return null;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
  currencyInfo: getCurrencySelector(ownProps.currency)(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators(
  { removeCurrency },
  dispatch,
);

export const CurrencyItemComponent =
  connect<StoreProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(CurrencyItem);

