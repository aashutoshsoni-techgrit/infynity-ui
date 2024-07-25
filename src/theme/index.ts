import chroma from 'chroma-js';
import { createTheme } from '@mantine/core';
import colours from '@/src/constants/palette';

const theme = createTheme({
   colors: {
      // @ts-expect-error any
      primary: chroma
         .scale([
            chroma(colours.shadeBlue).brighten(2),
            colours.shadeBlue,
            chroma(colours.shadeBlue).darken(2)
         ])
         .colors(10)
   },
   primaryColor: 'primary'
});

export default theme;
