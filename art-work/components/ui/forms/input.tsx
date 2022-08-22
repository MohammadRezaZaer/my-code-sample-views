import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  lableClass?: string;
  errorClass?: string;
  placeholder?: string;
  label?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline' | 'line';
  dimension?: 'small' | 'medium' | 'big';
}

const variantClasses = {
  normal:
    'bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent',
  outline: 'border border-grey2 rounded-xl focus:border-green1 invalid:border-Error invalid:text-Error focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
  line: '  border-b text-center md:text-left  rounded-none focus:border-black2 bg-transparent',
};

const sizeClasses = {
  small: 'text-sm h-9',
  medium: 'h-12',
  big: 'h-14',
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      name,
      error,
      children,
      variant = 'normal',
      dimension = 'big',
      shadow = false,
      disabled = false,
      type = 'text',
      lableClass='',
      errorClass='',
      placeholder="",
      inputClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
          <div className="flex justify-between">
              {label && (
                  <label
                      htmlFor={name}
                      className={cn('block mb-1 md:mb-3 text-base md:text-xl  leading-none',lableClass)}
                  >
                      {label}
                  </label>
              )}
              {error && <p className={cn("mt-2 text-base text-Error",errorClass)}>{error}</p>}
          </div>


          <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={cn(
            'flex w-full appearance-none items-center md:px-4 text-base  transition duration-300 ease-in-out focus:outline-none focus:ring-0 px-2',
            shadow && 'focus:shadow',
            variantClasses[variant],
            sizeClasses[dimension],
            disabled && 'cursor-not-allowed bg-gray-100',
            error && 'border-Error',
            inputClassName
          )}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
