import React from 'react';
import {FormattedMessage} from 'react-intl';
import {getLink} from '../../../helpers';

export default function gatNavigation() {
  return {
    items: [
      {
        name: <FormattedMessage id="Dashboard"/>,
        url: getLink('/dashboard'),
        icon: 'icon-speedometer',
        /*
        badge: {
          variant: 'info',
          text: 'NEW',
        },
        */
      },
      {
        name: <FormattedMessage id="Posts"/>,
        url: getLink('/posts'),
        icon: 'icon-note',
      },
      {
        title: true,
        name: 'Theme',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}      // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Colors',
        url: getLink('/theme/colors'),
        icon: 'icon-drop',
      },
      {
        name: 'Typography',
        url: getLink('/theme/typography'),
        icon: 'icon-pencil',
      },
      {
        title: true,
        name: 'Components',
        wrapper: {
          element: '',
          attributes: {},
        },
      },
      {
        name: 'Base',
        url: getLink('/base'),
        icon: 'icon-puzzle',
        children: [
          {
            name: 'Breadcrumbs',
            url: getLink('/base/breadcrumbs'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Cards',
            url: getLink('/base/cards'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Carousels',
            url: getLink('/base/carousels'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Collapses',
            url: getLink('/base/collapses'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Dropdowns',
            url: getLink('/base/dropdowns'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Forms',
            url: getLink('/base/forms'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Jumbotrons',
            url: getLink('/base/jumbotrons'),
            icon: 'icon-puzzle',
          },
          {
            name: 'List groups',
            url: getLink('/base/list-groups'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Navs',
            url: getLink('/base/navs'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Paginations',
            url: getLink('/base/paginations'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Popovers',
            url: getLink('/base/popovers'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Progress Bar',
            url: getLink('/base/progress-bar'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Switches',
            url: getLink('/base/switches'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Tables',
            url: getLink('/base/tables'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Tabs',
            url: getLink('/base/tabs'),
            icon: 'icon-puzzle',
          },
          {
            name: 'Tooltips',
            url: getLink('/base/tooltips'),
            icon: 'icon-puzzle',
          },
        ],
      },
      {
        name: 'Buttons',
        url: getLink('/buttons'),
        icon: 'icon-cursor',
        children: [
          {
            name: 'Buttons',
            url: getLink('/buttons/buttons'),
            icon: 'icon-cursor',
          },
          {
            name: 'Button dropdowns',
            url: getLink('/buttons/button-dropdowns'),
            icon: 'icon-cursor',
          },
          {
            name: 'Button groups',
            url: getLink('/buttons/button-groups'),
            icon: 'icon-cursor',
          },
          {
            name: 'Brand Buttons',
            url: getLink('/buttons/brand-buttons'),
            icon: 'icon-cursor',
          },
        ],
      },
      {
        name: 'Charts',
        url: getLink('/charts'),
        icon: 'icon-pie-chart',
      },
      {
        name: 'Icons',
        url: getLink('/icons'),
        icon: 'icon-star',
        children: [
          {
            name: 'CoreUI Icons',
            url: getLink('/icons/coreui-icons'),
            icon: 'icon-star',
            badge: {
              variant: 'info',
              text: 'NEW',
            },
          },
          {
            name: 'Flags',
            url: getLink('/icons/flags'),
            icon: 'icon-star',
          },
          {
            name: 'Font Awesome',
            url: getLink('/icons/font-awesome'),
            icon: 'icon-star',
            badge: {
              variant: 'secondary',
              text: '4.7',
            },
          },
          {
            name: 'Simple Line Icons',
            url: getLink('/icons/simple-line-icons'),
            icon: 'icon-star',
          },
        ],
      },
      {
        name: 'Notifications',
        url: getLink('/notifications'),
        icon: 'icon-bell',
        children: [
          {
            name: 'Alerts',
            url: getLink('/notifications/alerts'),
            icon: 'icon-bell',
          },
          {
            name: 'Badges',
            url: getLink('/notifications/badges'),
            icon: 'icon-bell',
          },
          {
            name: 'Modals',
            url: getLink('/notifications/modals'),
            icon: 'icon-bell',
          },
        ],
      },
      {
        name: 'Widgets',
        url: getLink('/widgets'),
        icon: 'icon-calculator',
        badge: {
          variant: 'info',
          text: 'NEW',
        },
      },
      /*
      {
        divider: true,
      },
      {
        title: true,
        name: 'Extras',
      },
      {
        name: 'Pages',
        url: '/pages',
        icon: 'icon-star',
        children: [
          {
            name: 'Login',
            url: '/login',
            icon: 'icon-star',
          },
          {
            name: 'Register',
            url: '/register',
            icon: 'icon-star',
          },
          {
            name: 'Error 404',
            url: '/404',
            icon: 'icon-star',
          },
          {
            name: 'Error 500',
            url: '/500',
            icon: 'icon-star',
          },
        ],
      },
      */
      {
        name: 'Download CoreUI',
        url: 'http://coreui.io/react/',
        icon: 'icon-cloud-download',
        class: 'mt-auto',
        variant: 'success',
      },
      {
        name: 'Try CoreUI PRO',
        url: 'http://coreui.io/pro/react/',
        icon: 'icon-layers',
        variant: 'danger',
      },
    ]
  };
};
