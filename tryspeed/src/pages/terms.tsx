import { termsAndServices } from '@settings/terms';
import { Link, Element } from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@components/layouts/layout';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function TermsPage() {
  const { t } = useTranslation('terms');
  const { title, date, content } = termsAndServices;

  return (
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-light font-bold mb-4 sm:mb-5 2xl:mb-7">
          {t(title)}
        </h1>
        <p className="text-sm md:text-base text-light 2xl:text-lg px-0.5">
          {date}
        </p>
      </header>
      {/* End of page header */}

      <div className="flex flex-col md:flex-row">
        <nav className=" md:w-72 xl:w-3/12 mb-8 md:mb-0">
          <ol className=" sticky md:top-16 lg:top-22 bg-gray-100 rounded-lg p-2 m-1 z-10">
            {content?.map((item) => (
              <li key={item.title}>
                <Link
                  spy={true}
                  offset={-120}
                  smooth={true}
                  duration={500}
                  to={makeTitleToDOMId(item.title)}
                  activeClass="text-sm lg:text-base text-heading font-semibold"
                  className="cursor-pointer inline-flex py-3 text-sub-heading uppercase"
                >
                  {t(item.title)}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {/* End of section scroll spy menu */}

        <div className="md:w-9/12 md:ps-8 md:pb-96 bg-gray-100 rounded-lg m-1 p-2 pt-4">
          {content?.map((item) => (
            <Element
              key={item.title}
              name={makeTitleToDOMId(item.title)}
              className="mb-10"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
                {t(item.title)}
              </h2>
              <div
                className="text-body-dark leading-loose"
                dangerouslySetInnerHTML={{ __html: t(item.description) }}
              />
            </Element>
          ))}
        </div>
        {/* End of content */}
      </div>
    </section>
  );
}

TermsPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'terms'])),
    },
  };
};
