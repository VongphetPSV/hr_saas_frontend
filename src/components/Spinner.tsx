import { LoadingProps } from '@/types/common';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface Props extends LoadingProps {
  size?: SpinnerSize;
}

const Spinner: React.FC<Props> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizes[size]} ${className}`} />
    </div>
  );
};

export default Spinner;
