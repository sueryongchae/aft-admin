import GlobalStyles from '@/styles/GlobalStyles';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SnackBarBox from '@/components/SnackbarContainer';
import ToastBox from '@/components/ToastContainer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'aft-admin',
  description: '',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStyles />
        <SnackBarBox />
        <ToastBox />
        {children}
        {/* 채널 톡 */}
        <Script
          id="1"
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            var w = window;
            if (w.ChannelIO) {
              return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
            }
            var ch = function() {
              ch.c(arguments);
            };
            ch.q = [];
            ch.c = function(args) {
              ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
              if (w.ChannelIOInitialized) {
                return;
              }
              w.ChannelIOInitialized = true;
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
              s.charset = 'UTF-8';
              var x = document.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            }
            if (document.readyState === 'complete') {
              l();
            } else if (window.attachEvent) {
              window.attachEvent('onload', l);
            } else {
              window.addEventListener('DOMContentLoaded', l, false);
              window.addEventListener('load', l, false);
            }
          })();
          ChannelIO('boot', {
            "pluginKey": "fee3991a-3187-4f6b-99bc-730d474d880d"
          });
          `,
          }}
        />
        {/* 스마트락 */}
        <Script
          id="2"
          dangerouslySetInnerHTML={{
            __html: `
          window.smartlook||(function(d) {
          var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
          var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
          c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
          })(document);
          smartlook('init', 'f22bb582c3e61ca1362c0b5068fdadbd75e95a16', { region: 'eu' });
          `,
          }}
        />
        {/* GOOGLE TAG MANAGER */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1XX2CCL3W7" />
        <Script
          id="3"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1XX2CCL3W7');
        `,
          }}
        />
        <Script
          id="4"
          dangerouslySetInnerHTML={{
            __html: ` 
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MGP583L');
          `,
          }}
        />
      </body>
    </html>
  );
}
