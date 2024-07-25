import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import './app.scss';

import React from 'react';
import type { Metadata, Viewport } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Loader, Toast } from '@/src/components';
import { AuthWrapper } from '@/src/context/AuthWrapper';
import TanStackWrapper from '@/src/context/TanStackWrapper';
import theme from '@/src/theme';

export const viewport: Viewport = {
   width: 'device-width',
   height: 'device-height',
   userScalable: true
};

export const metadata: Metadata = {
   authors: {
      name: 'TechGrit',
      url: 'https://www.techgrit.com/'
   },
   title: 'Infinity',
   description:
      'With a steadfast commitment to aiding companies in their organizational endeavors, Infynity offers a comprehensive platform designed to streamline team management and goal tracking processes. Infynity facilitates this through its innovative features, providing interactive representations of team goals and scorecards, thereby offering a clear and intuitive means for organizations to monitor progress and drive success. With Infynity at their disposal, organizations can navigate the complexities of team management with ease, fostering a culture of collaboration and achievement.',
   keywords: [
      'Infinity',
      'Goal',
      'Planning',
      'Goal Planning',
      'Scorecard',
      'Organizational Chart',
      'Team Goal',
      'Annual Goal'
   ],
   openGraph: {
      title: 'Infinity',
      url: 'https://www.facebook.com/',
      images: '/og.png'
   },
   twitter: {
      title: 'Infinity',
      card: 'summary_large_image',
      site: 'https://twitter.com/',
      images: '/og.png'
   },
   manifest: '/manifest.json',
   robots: 'index, follow'
};

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang={'en'}>
         <head>
            <ColorSchemeScript />
         </head>
         <body>
            <TanStackWrapper>
               <MantineProvider theme={theme}>
                  <Loader />
                  <Toast />
                  <AuthWrapper>{children}</AuthWrapper>
               </MantineProvider>
            </TanStackWrapper>
         </body>
      </html>
   );
}
