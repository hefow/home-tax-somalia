import React, { useState } from 'react';
import { Home, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import PaymentModal from '../payment/PaymentModal';

function Homeowner() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTaxRecord, setSelectedTaxRecord] = useState(null);

  const quickActions = [
    { 
      name: 'Add Property', 
      icon: Home, 
      onClick: () => setShowAddProperty(true), 
      color: 'bg-blue-500' 
    },
    { 
      name: 'Pay Taxes', 
      icon: DollarSign, 
      onClick: () => handlePayTaxes(), 
      color: 'bg-green-500' 
    },
    // ... other actions
  ];

  const handlePayTaxes = async () => {
    try {
      // Get unpaid tax records
      const response = await fetch('http://localhost:5000/api/taxes/unpaid', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.records && data.records.length > 0) {
        setSelectedTaxRecord(data.records[0]);
        setShowPaymentModal(true);
      } else {
        toast.success('No pending tax payments!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch tax records');
    }
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    setSelectedTaxRecord(null);
    // Refresh tax records or update UI as needed
    toast.success('Tax payment completed successfully!');
  };

  return (
    <div>
      {/* ... existing JSX */}

      {showPaymentModal && selectedTaxRecord && (
        <PaymentModal
          amount={selectedTaxRecord.amount}
          taxRecordId={selectedTaxRecord._id}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
} 