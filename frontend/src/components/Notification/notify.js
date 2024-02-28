import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastComponent = forwardRef((props, ref) => {

  const toast = useRef(null);

  useImperativeHandle(ref, () => ({
    showSuccess: (message) => {
      toast.current?.show({
        severity: 'success',
        summary: 'Congratulations!',
        detail: message,
        life: 2000,
        style: {
          // background: '#b1f0b7',
          color: '#333', padding: '20px',
          fontSize: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      });
    },
    showError: (error) => {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000,
        style: {
          // background: '#EF5350', 
          color: '#333',          // Dark text
          padding: '20px',
          fontSize: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      });
    },
    showInfo: (info) => {
      toast.current?.show({
        severity: 'info',
        summary: 'Info',
        detail: info,
        life: 2000,
        style: {
          // background: '#64B5F6',
          color: '#333',
          padding: '20px',
          fontSize: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      });
    },
  }), [toast]);

  return (
    <Toast ref={toast} />
  );
});

export default ToastComponent;
