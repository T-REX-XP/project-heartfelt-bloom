import { createLightTheme, createDarkTheme } from '@fluentui/react-components';
import type { BrandVariants, Theme } from '@fluentui/react-components';

// Microsoft Teams-inspired brand ramp for LogIQ
const logiqBrand: BrandVariants = {
  10: '#020305',
  20: '#111723',
  30: '#16263D',
  40: '#193253',
  50: '#1B3F6A',
  60: '#1B4C82',
  70: '#18599B',
  80: '#1267B4',
  90: '#3174C2',
  100: '#4F82C8',
  110: '#6790CE',
  120: '#7E9ED4',
  130: '#94ACDA',
  140: '#AAB9E1',
  150: '#C0C7E7',
  160: '#D5D6ED',
};

export const lightTheme: Theme = {
  ...createLightTheme(logiqBrand),
};

export const darkTheme: Theme = {
  ...createDarkTheme(logiqBrand),
};

// Override some tokens for better Teams feel
lightTheme.colorBrandBackground = '#1267B4';
lightTheme.colorBrandBackgroundHover = '#18599B';
lightTheme.colorBrandBackgroundPressed = '#1B4C82';
darkTheme.colorBrandBackground = '#3174C2';
darkTheme.colorBrandBackgroundHover = '#4F82C8';
darkTheme.colorBrandBackgroundPressed = '#1267B4';

// Semantic color helpers
export const statusColors = {
  success: { light: '#107C10', dark: '#54B054' },
  warning: { light: '#CA5010', dark: '#F7894A' },
  danger: { light: '#D13438', dark: '#F1707A' },
  info: { light: '#0078D4', dark: '#3AA0F3' },
};
