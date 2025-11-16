import React, { useState, useEffect } from 'react';
import { bankService } from '../../services/bankService';
import BankAccountForm from './BankAccountForm';
import Button from '../common/Button';
import Modal from '../common/Modal';

export default function BankAccountManager() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAccount, setEditAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await bankService.getAll();
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };

  const handleSave = async (account) => {
    try {
      if (editAccount) {
        await bankService.update(editAccount._id, account);
      } else {
        await bankService.create(account);
      }
      fetchAccounts();
      setShowForm(false);
      setEditAccount(null);
    } catch (error) {
      console.error('Failed to save account:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this bank account?')) {
      try {
        await bankService.delete(id);
        fetchAccounts();
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  return (
    <div className="bank-account-manager">
      <h3>Bank Accounts</h3>
      <Button onClick={() => setShowForm(true)}>Add Bank Account</Button>

      <div className="accounts-list">
        {accounts.map((acc) => (
          <div key={acc._id} className="account-card">
            <div className="account-info">
              <strong>{acc.bankName}</strong>
              <p>A/C: {acc.accountNumber}</p>
              <p>IFSC: {acc.ifscCode}</p>
              {acc.isPrimary && <span className="badge">Primary</span>}
            </div>
            <div className="account-actions">
              <button onClick={() => { setEditAccount(acc); setShowForm(true); }}>
                Edit
              </button>
              <button onClick={() => handleDelete(acc._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={showForm} 
        onClose={() => { setShowForm(false); setEditAccount(null); }}
        title={editAccount ? 'Edit Bank Account' : 'Add Bank Account'}
      >
        <BankAccountForm
          account={editAccount}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditAccount(null); }}
        />
      </Modal>
    </div>
  );
}
