import React, { Component } from 'react';
import shortid from 'short-id';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';
import { saveLocalStorage, getLocalStorage } from '../../servises/localStorage';

toast.configure({
  autoClose: 5000,
  draggable: false,
});

export default class Dashboard extends Component {
  state = {
    balance: 0,
    transactions: [],
  };

  componentDidMount() {
    const transactions = getLocalStorage('transactions');

    if (!transactions) return;

    this.setState({ transactions });
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;

    if (prevState.transactions === transactions) return;

    saveLocalStorage('transactions', transactions);
  }

  depositTransaction = inputValue => {
    if (inputValue <= 0) {
      toast.info('Введите сумму для проведения операции!');
      return;
    }

    const transaction = {
      id: shortid.generate(),
      type: 'Deposit',
      inputValue,
      date: new Date().toLocaleString(),
    };
    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance: Number(state.balance) + Number(transaction.inputValue),
    }));
  };

  withdrawTransaction = inputValue => {
    if (inputValue <= 0) {
      toast.info('Введите сумму для проведения операции!');
      return;
    }
    if (inputValue > this.state.balance) {
      toast.info('На счету недостаточно средств для проведения операции!');
      return;
    }

    const transaction = {
      id: shortid.generate(),
      type: 'Withdraw',
      inputValue,
      date: new Date().toLocaleString(),
    };

    this.setState(state => ({
      transactions: [...state.transactions, transaction],
      balance: Number(state.balance) - Number(transaction.inputValue),
    }));
  };

  transactionsCounter = (transactions, billType) => {
    const filterByType = transactions.filter(el => el.type === billType);
    const total = filterByType.reduce(
      (acc, value) => Number(acc) + Number(value.inputValue),
      0,
    );

    return total;
  };

  render() {
    const { transactions, balance } = this.state;
    return (
      <div className={styles.dashboard}>
        {/* <!-- Разметка компонента <Controls> --> */}
        <Controls
          onSubmitDeposit={this.depositTransaction}
          onSubmitWithdraw={this.withdrawTransaction}
        />

        {/* <!-- Разметка компонента <Balance> --> */}
        <Balance
          income={this.transactionsCounter(transactions, 'Deposit')}
          expenses={this.transactionsCounter(transactions, 'Withdraw')}
          balance={balance}
        />

        {/* <!-- Разметка компонента <TransactionHistory> --> */}
        <TransactionHistory items={transactions} />
        {/* {transactions.lenght > 0 && <TransactionHistory items={transactions} />} */}
      </div>
    );
  }
}
