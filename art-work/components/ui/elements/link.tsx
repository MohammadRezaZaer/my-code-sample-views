import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export interface LinkProps extends NextLinkProps {
  className?: string;
  title?: string;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  title,
  className,
  shallow,
  ...props
}) => {
  return (
    <NextLink href={href} shallow>
      <a className={className} title={title} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
