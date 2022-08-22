import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  error?: string;
}

const BoxedCheckbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, error, ...rest }, ref) => {
    return (
      <div className={cn('flex items-center', className)}>
        <input
          id={name}
          name={name}
          type="checkbox"
          ref={ref}
          className="boxed-checkbox accent-black w-6 h-6 rounded-md border border-grey3 checked:border-black2"
          {...rest}
        />

        <label htmlFor={name} className="text-body text-sm">
          {label}
        </label>
      </div>
    );
  }
);

BoxedCheckbox.displayName = 'Boxed Checkbox';
export default BoxedCheckbox;
