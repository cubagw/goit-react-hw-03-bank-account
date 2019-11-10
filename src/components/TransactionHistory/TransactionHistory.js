import React from 'react';
import T from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => {
  return (
    <table className={styles.history}>
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td className={styles.historyTd}>{item.type}</td>
            <td className={styles.historyTd}>{item.inputValue}$</td>
            <td className={styles.historyTd}>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  items: T.arrayOf(T.shape).isRequired,
};

export default TransactionHistory;
