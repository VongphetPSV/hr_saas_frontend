import { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends BaseProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export interface InputProps extends BaseProps {
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface CardProps extends BaseProps {
  title?: string;
  description?: string;
}

export interface SelectProps extends BaseProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface TableProps<T> extends BaseProps {
  data: T[];
  columns: Array<{
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], item: T) => ReactNode;
  }>;
  loading?: boolean;
  onRowClick?: (item: T) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface LoadingProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface ErrorBoundaryProps extends BaseProps {
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

export interface AuthGuardProps extends BaseProps {
  requiredRole?: string;
  fallback?: ReactNode;
}


