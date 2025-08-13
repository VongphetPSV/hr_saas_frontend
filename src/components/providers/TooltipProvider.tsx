import { Provider } from '@radix-ui/react-tooltip';

interface TooltipProviderProps {
  children: React.ReactNode;
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <Provider delayDuration={100}>{children}</Provider>;
};
