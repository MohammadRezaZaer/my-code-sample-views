import cn from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'normal' | 'outline' | 'custom' | 'dark' | 'shinyDark' | 'underlinedFilish' | 'backShinyDark' | 'greyPurple' | 'balckWhite';
  size?: 'big' | 'medium' | 'small';
  icon?: string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const classes = {
  root: 'inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none  outline-none',
  normal:
    'bg-accent text-light border border-transparent hover:bg-accent-hover',
  dark: 'text-light box px-7',

  shinyDark: 'text-light shiny-dark bg-primary  btn-fluid-text font-medium  ',
  backShinyDark: 'btn-fluid-text font-medium',
  underlinedFilish: 'text-light  underlinedFilish  btn-fluid-text font-medium  ',

  greyPurple: 'text-white btn-fluid-text font-bold  bg-grayThree px-5 py-3 text-xl hover:bg-button-click',
  balckWhite: 'text-white btn-fluid-text font-semibold  bg-black2 px-[13%] py-3 text-xl hover:bg-transparent border hover:text-black2 border-black2 rounded-xl',


  custom: 'border border-transparent',
  outline:
    'border border-border-400 bg-transparent text-body hover:text-light hover:bg-accent hover:border-accent',
  loading:
    'h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin ',
  disabled:
    'border border-border-base bg-gray-300 hover:bg-gray-300 border-border-400 text-body cursor-not-allowed',
  disabledOutline: 'border border-border-base text-muted cursor-not-allowed',
  small: 'px-3 py-0 h-9 text-sm h-10',
  medium: 'px-3 md:px-4 h-[43px] md:min-h-[65px]',
  big: 'px-10 py-0 h-14'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'normal',
      size = '',
      icon,

      children,
      active,
      loading = false,
      disabled = false,
      ...rest
    } = props
    const classesName = cn(
      classes.root,
      {
        [classes.normal]: !disabled && variant === 'normal',
        [classes.disabled]: disabled && variant === 'normal',
        [classes.outline]: !disabled && variant === 'outline',
        [classes.dark]: !disabled && variant === 'dark',
        [classes.shinyDark]: !disabled && variant === 'shinyDark',
        [classes.underlinedFilish]: !disabled && variant === 'underlinedFilish',
        [classes.backShinyDark]: !disabled && variant === 'backShinyDark',

        [classes.greyPurple]: !disabled && variant === 'greyPurple',
        [classes.balckWhite]: !disabled && variant === 'balckWhite',
        [classes.disabledOutline]: disabled && variant === 'outline',
        [classes.small]: size === 'small',
        [classes.medium]: size === 'medium',
        [classes.big]: size === 'big'
      },
      className
    )

    if (variant !== 'backShinyDark') {
      return (


        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-pressed={active}
          data-variant={variant}
          ref={ref}
          className={classesName}
          disabled={disabled}
          {...rest}
        >
          {children}
          {loading && (
            <span
              className={classes.loading}
              style={{
                borderTopColor:
                  variant === 'outline' ? 'currentColor' : '#ffffff'
              }}
            />
          )}

        </motion.button>
      )

    } else {
      const classesName = cn(
        'w-full h-16 relative border-0 rounded-xl text-white bg-black2 font-semibold flex items-center justify-center transition duration-150 text-xl align-baseline',
        {
          [classes.backShinyDark]: !disabled && variant === 'backShinyDark',
          [classes.small]: size === 'small',
          [classes.medium]: size === 'medium',
          [classes.big]: size === 'big'
        },
        className
      )
      return (

        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-pressed={active}
          data-variant={variant}
          ref={ref}
          className={classesName}
          disabled={disabled}
          {...rest}
        ><span
          className='text-ellipsis whitespace-nowrap overflow-hidden inline-block'>
          <span
            className='back-shiny-dark rounded-xl' />
          <span
            className='absolute top-0 right-0 bottom-0 left-0 bg-black2 hover:bg-black3 rounded-xl flex justify-center items-center'>{icon}{children}</span>
        </span>
        </motion.button>


      )
    }
  }
)

export default Button
