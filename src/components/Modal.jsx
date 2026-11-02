import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'default',
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) {
  if (!isOpen) return null;

  const sizeStyles = {
    small: 'w-full max-w-sm',
    default: 'w-full max-w-md',
    large: 'w-full max-w-2xl',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`${sizeStyles[size]} bg-white rounded-xl shadow-large p-8 max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-navy font-heading">{title}</h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          {children}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
