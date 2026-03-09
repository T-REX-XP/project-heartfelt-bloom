import { createLightTheme, createDarkTheme } from '@fluentui/react-components';
import type { BrandVariants, Theme } from '@fluentui/react-components';

/**
 * Office 365 / Microsoft 365 Brand Ramp
 * Based on Microsoft's official brand color guidance for enterprise apps.
 * Primary brand: #0078D4 (Microsoft Blue)
 */
const m365Brand: BrandVariants = {
  10: '#001D3A',
  20: '#002E5C',
  30: '#003E7E',
  40: '#004EA2',
  50: '#005EB7',
  60: '#0070CB',
  70: '#0078D4', // Microsoft 365 primary
  80: '#1A86D9',
  90: '#3595DE',
  100: '#50A3E3',
  110: '#6BB1E8',
  120: '#86BFED',
  130: '#A1CDF2',
  140: '#BCDBF7',
  150: '#D7E9FB',
  160: '#EBF3FD',
};

export const lightTheme: Theme = {
  ...createLightTheme(m365Brand),
};

export const darkTheme: Theme = {
  ...createDarkTheme(m365Brand),
};

// Office 365 enterprise overrides — matches M365 admin center / Teams styling
lightTheme.colorBrandBackground = '#0078D4';
lightTheme.colorBrandBackgroundHover = '#106EBE';
lightTheme.colorBrandBackgroundPressed = '#005A9E';
lightTheme.colorBrandBackgroundSelected = '#0078D4';
lightTheme.colorNeutralBackground1 = '#FFFFFF';
lightTheme.colorNeutralBackground2 = '#FAFAFA';
lightTheme.colorNeutralBackground3 = '#F5F5F5';
lightTheme.colorNeutralBackground4 = '#F0F0F0';
lightTheme.colorNeutralForeground1 = '#242424';
lightTheme.colorNeutralForeground2 = '#424242';
lightTheme.colorNeutralForeground3 = '#616161';
lightTheme.colorNeutralStroke1 = '#D1D1D1';
lightTheme.colorNeutralStroke2 = '#E0E0E0';
lightTheme.colorNeutralStroke3 = '#EBEBEB';

darkTheme.colorBrandBackground = '#2899F5';
darkTheme.colorBrandBackgroundHover = '#3AA0F3';
darkTheme.colorBrandBackgroundPressed = '#0078D4';

/**
 * Office 365 semantic status colors
 * Aligned with Microsoft Fluent Design System guidance
 */
export const statusColors = {
  success: { light: '#107C10', dark: '#54B054' },
  warning: { light: '#CA5010', dark: '#F7894A' },
  danger:  { light: '#D13438', dark: '#F1707A' },
  info:    { light: '#0078D4', dark: '#3AA0F3' },
};

/**
 * Office 365 semantic palette — for use in custom components
 * These match the M365 admin center and SharePoint conventions
 */
export const o365Palette = {
  themePrimary:    '#0078D4',
  themeDark:       '#005A9E',
  themeDarker:     '#004578',
  themeLight:      '#C7E0F4',
  themeLighter:    '#DEECF9',
  themeLighterAlt: '#EFF6FC',
  neutralPrimary:    '#323130',
  neutralSecondary:  '#605E5C',
  neutralTertiary:   '#A19F9D',
  neutralLight:      '#EDEBE9',
  neutralLighter:    '#F3F2F1',
  neutralLighterAlt: '#FAF9F8',
  white: '#FFFFFF',
  red:    '#D13438',
  green:  '#107C10',
  yellow: '#FFB900',
  orange: '#CA5010',
};