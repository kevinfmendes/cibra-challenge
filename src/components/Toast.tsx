import React, { useState, useEffect } from 'react';
import * as RadixToast from '@radix-ui/react-toast';

interface ToastProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  open,
  setOpen,
  title,
  description,
  type = 'success',
  duration = 3000,
}) => {
  function getBackgroundColor() {
    switch (type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'info':
        return 'bg-blue-600';
      default:
        return 'bg-green-600';
    }
  };

  return (
    <RadixToast.Provider>
      <RadixToast.Root
        className={`${getBackgroundColor()} text-white px-6 py-4 rounded-lg shadow-lg`}
        open={open}
        onOpenChange={setOpen}
        duration={duration}
      >
        <RadixToast.Title className="font-medium mb-1">{title}</RadixToast.Title>
        {description && (
          <RadixToast.Description>{description}</RadixToast.Description>
        )}
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-80 max-w-[100vw] m-0 list-none z-50" />
    </RadixToast.Provider>
  );
};

export default Toast;