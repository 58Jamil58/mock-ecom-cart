import React from 'react';
import { convertToINR, formatINR } from '../utils/currency';
import './Receipt.css';

const Receipt = ({ receipt, onClose }) => {
  return (
    <div className="receipt-modal" onClick={onClose}>
      <div className="receipt-content" onClick={(e) => e.stopPropagation()}>
        <h2>Receipt</h2>
        <p>{receipt.message}</p>
        <p>Total: {formatINR(convertToINR(receipt.total))}</p>
        <p>Timestamp: {new Date(receipt.timestamp).toLocaleString()}</p>
        <h3>Items:</h3>
        <ul>
          {receipt.items.map(item => (
            <li key={item.productId}>
              {item.title} - {formatINR(convertToINR(item.price))} x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Customer: {receipt.customer.name} ({receipt.customer.email})</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Receipt;
