import Link from '@components/ui/link';
import { ROUTES } from '@lib/routes';
import { useTranslation } from 'next-i18next';

const topLinks = [
  { href: ROUTES.RESULT_HISTORY, icon: null, label: 'Result History' },

];

const AuthTopMenu = () => {
  const { t } = useTranslation('common');

  return (
    <>
      {topLinks.map(({ href, label, icon }) => (
        <li key={`${href}${label}`}>
          <Link
            href={href}
            className="flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
          >
            {icon && <span className="me-2">{icon}</span>}
            {t(label)}
          </Link>
        </li>
      ))}
    </>
  );
};

export default AuthTopMenu;
