import cn from 'classnames';
import { CloseIcon } from '@components/icons/close-icon';

type SpinnerProps = {
  variant?:
    | 'white'
  className?: string;
};

const variantClasses = {
  white: 'border-t-white',

};

const Spinner2: React.FC<SpinnerProps> = ({
  variant = 'white',
  className,
}) => {
  return (
      <span
          className={cn(
              'inline-flex right-[5px] top-[5px] items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin ',
              variantClasses[variant],
              className
          )}



      />
  );
};

export default Spinner2;
