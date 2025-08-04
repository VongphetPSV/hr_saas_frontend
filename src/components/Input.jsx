import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  type = 'text',
  placeholder,
  className = '',
  required = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm';
  const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '';
  const disabledClasses = disabled ? 'bg-gray-50 cursor-not-allowed' : '';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;