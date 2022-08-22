import { ROUTES } from '@lib/routes';
import {Appletop} from "@components/icons/appletop";
import { FilterIcon } from '@components/icons/filter-icon';
import { FacebookIcon } from "@components/icons/facebook";
import { InstagramIcon } from "@components/icons/instagram";
import { TwitterIcon } from "@components/icons/twitter";
import {Androidtop} from "@components/icons/androidtop";


export const siteSettings = {
  name: 'Try My Speed',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'trymyspeed',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  product: {
    placeholderImage: '/product-placeholder.svg',
    cardMaps: {
      grocery: 'Krypton',
      furniture: 'Radon',
      bag: 'Oganesson',
      makeup: 'Neon',
      book: 'Xenon',
      medicine: 'Helium',
      default: 'Argon',
    },
  },
  appsLinks: [
    { href: ROUTES.Android, label: "menu-android-app" ,icon: <Androidtop/>,},
    { href: ROUTES.Apple, label: "menu-apple-app" ,icon: <Appletop/>,},

  ],
  authorizedLinks: [
    { href: ROUTES.PROFILE, label: 'auth-menu-profile' },
    { href: ROUTES.LOGOUT, label: 'auth-menu-logout' },
  ],

  dashboardSidebarMenu: [
    {
      href: ROUTES.PROFILE,
      label: 'profile-sidebar-profile',
    },
    // {
    //   href: ROUTES.CHANGE_PASSWORD,
    //   label: 'profile-sidebar-password',
    // },
    {
      href: ROUTES.HELP,
      label: 'profile-sidebar-help',
    },
    {
      href: ROUTES.LOGOUT,
      label: 'profile-sidebar-logout',
    },
  ],
  author: {
    name: "TRY MY SPEED.",
    websiteUrl: "https://cfbtel.com",
    address: "USA",
    phone: "+900-300-4000-70",
    social: [
      {
        link: "https://www.facebook.com",
        icon: <FacebookIcon  />,
        hoverClass: "text-social-facebook",
      },
      {
        link: "https://www.instagram.com",
        icon: <InstagramIcon  />,
        hoverClass: "text-social-instagram",
      },
      {
        link: "https://www.twitter.com",
        icon: <TwitterIcon  />,
        hoverClass: "text-social-twitter",
      },

    ],
  },




  authorizedLinksMobile: [
    { href: ROUTES.PROFILE, label: 'auth-menu-profile' },
    { href: ROUTES.CHANGE_PASSWORD, label: 'profile-sidebar-password' },
    { href: ROUTES.LOGOUT, label: 'auth-menu-logout' },
  ],

};
