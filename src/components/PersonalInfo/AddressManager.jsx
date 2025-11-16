import React, { useState } from 'react';

export default function AddressManager({ addresses = [], onAdd, onUpdate, onDelete }) {
  const [newAddress, setNewAddress] = useState({});

  return (
    <div className="address-manager">
      <h3>Address Management</h3>
      <div className="addresses-list">
        {addresses.map((addr, idx) => (
          <div key={idx} className="address-card">
            <div>{addr.flatDoor}, {addr.premise}</div>
            <div>{addr.area}, {addr.townCity}</div>
            <div>{addr.state} - {addr.pinCode}</div>
            <button onClick={() => onDelete(idx)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="add-address">
        <input placeholder="Flat/Door" onChange={(e) => setNewAddress({...newAddress, flatDoor: e.target.value})} />
        <input placeholder="Building" onChange={(e) => setNewAddress({...newAddress, premise: e.target.value})} />
        <input placeholder="Area" onChange={(e) => setNewAddress({...newAddress, area: e.target.value})} />
        <input placeholder="City" onChange={(e) => setNewAddress({...newAddress, townCity: e.target.value})} />
        <input placeholder="State" onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} />
        <input placeholder="PIN" onChange={(e) => setNewAddress({...newAddress, pinCode: e.target.value})} />
        <button onClick={() => onAdd(newAddress)}>Add Address</button>
      </div>
    </div>
  );
}
