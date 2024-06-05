// since `.js, .ts` files are not included by default,
// the following comment tells UnoCSS to force scan this file (to pick the logo icon).
// @unocss-include

export default {
  name: 'CONNECTANDO',
  description:
    'Connectando, tu pagina web de confianza para planear tus viajes',
  logo: 'i-twemoji-ticket',
  author: 'Jesus Demetrio Ramos Ayala ft. Pinegrow',
  url: 'http://localhost:3000',
  github: 'https://github.com/Catati64/Connectando_Front',
  defaultLocale: 'en', // default
  identity: {
    type: 'Organization',
  } as any,
  twitter: '@catati64',
  trailingSlash: false, // default
  titleSeparator: '|', // default
  nav: [
    { text: 'Home', link: '/', type: 'primary', icon: 'i-mdi-home' },
    { text: 'Eventos y sitios', link: '/event', type: 'primary', icon: 'i-mdi-home' },
    { text: 'Consultar', link: '/consult', type: 'primary', icon: 'i-mdi-home' },
    {
      text: 'Ayuda',
      link: '/help-faqs',
      type: 'primary',
      icon: 'i-mdi-home',
    },
    {
      text: 'About Us',
      link: '/quick-start',
      type: 'primary',
      icon: 'i-mdi-home',
    },
    {
      text: 'Anuncia un viaje',
      link: '/new-trip',
      type: 'secondary',
      icon: 'i-tabler-truck-return',
    },
    {
      text: 'Contact Us',
      link: '/contact-us',
      type: 'secondary',
      icon: 'i-material-symbols-add-call',
    },
    {
      text: 'Help & FAQs',
      link: '/help-faqs',
      type: 'secondary',
      icon: 'i-material-symbols-contact-support-outline',
    },
  ],
}
