// Import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';

// Create a custom Font Awesome library
import { config, library } from '@fortawesome/fontawesome-svg-core';

import {
  faBaby,
  faCar,
  faDove,
  faGlasses,
  faHamburger,
  faHome,
  faMedkit,
  faMoneyCheckAlt,
  faTshirt,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBaby,
  faCar,
  faDove,
  faGlasses,
  faHamburger,
  faHome,
  faMedkit,
  faMoneyCheckAlt,
  faTshirt,
);

// Prevent inline <style> tag
// https://fontawesome.com/how-to-use/on-the-web/other-topics/security#policy
config.autoAddCss = false;
