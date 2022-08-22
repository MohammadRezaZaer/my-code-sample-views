import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  error?: string;
  theme?: 'primary' | 'secondary';
}

const RadioCheckbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, error, theme = 'primary', ...rest }, ref) => {
    return (
      <div className={className}>
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={ref}
            className="accent-black w-6 h-6  border border-grey3 checked:border-black2 checked:bg-black2 pointer-events-none rounded-full"
            {...rest}
          />

          <label
            htmlFor={name}
            className={classNames(' text-base font-medium pl-2 pointer-events-none\t', {
              primary: theme === 'primary',
              secondary: theme === 'secondary',
            })}
          >
            {label}
          </label>
        </div>

        {error && (
          <p className="my-2 text-xs ltr:text-right rtl:text-left text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

RadioCheckbox.displayName = 'Checkbox';

export default RadioCheckbox;
