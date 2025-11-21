const root = document.documentElement;

const primaryTextColor   = getComputedStyle(root).getPropertyValue('--primary-text-color');
const cardBgColor        = getComputedStyle(root).getPropertyValue('--card-bg-color');
const palette1A      = getComputedStyle(root).getPropertyValue('--palette-1-a');
const palette1B      = getComputedStyle(root).getPropertyValue('--palette-1-b');
const palette1C      = getComputedStyle(root).getPropertyValue('--palette-1-c');
const palette1D      = getComputedStyle(root).getPropertyValue('--palette-1-d');
const palette1E      = getComputedStyle(root).getPropertyValue('--palette-1-e');

const colors = {
  primaryTextColor,
  cardBgColor,
  palette1:{
    color1:palette1A,
    color2:palette1B,
    color3:palette1C,
    color4:palette1D,
    color5:palette1E
  }
};

export default colors;