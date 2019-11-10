import React, { Component } from 'react';
import T from 'prop-types';
import styles from './Controls.module.css';

class Controls extends Component {
  static propTypes = {
    onSubmitDeposit: T.func.isRequired,
    onSubmitWithdraw: T.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleChangeInputValue = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmitDeposit = e => {
    
    this.props.onSubmitDeposit(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  };

  handleSubmitWithdraw = e => {
    
    this.props.onSubmitWithdraw(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  };

  render() {
    // const { onSubmit, withdrawTransaction } = this.props;
    const { inputValue } = this.state;

    return (
      <section className={styles.controls}>
        <input
          className={styles.input}
          type="number"
          name="amount"
          value={inputValue}
          onChange={this.handleChangeInputValue}
        />
        <button
          className={styles.button}
          type="button"
          onClick={this.handleSubmitDeposit}
        >
          Deposit
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={this.handleSubmitWithdraw}
        >
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
