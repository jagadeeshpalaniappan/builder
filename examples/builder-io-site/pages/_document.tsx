import Document, { Html, Head, Main, NextScript } from 'next/document';

import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="index, follow" />
          <meta charSet="UTF-8" />
          <meta name="theme-color" content="#f8f8f8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="icon" type="image/png" href="https://cdn.builder.io/static/favicon.png?v=3" />
          <link
            rel="chrome-webstore-item"
            href="https://chrome.google.com/webstore/detail/cfldfgibklhmjhnkfighkbafbkbfcmij"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `/* Redirect to www.builder.io */
                if (location.host === 'app.builder.io') {
                  location.href = location.href.replace('//app.builder.io', '//www.builder.io');
                } else if (location.host === 'builder.io') {
                  location.href = location.href.replace('//builder.io', '//www.builder.io');
                }`,
            }}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,600&amp;display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Werid style issues with next.js... jsx not always applied */}
          <style>{`
          body {
            font-family: Roboto, helvetica, sans-serif;
          }
          a {
            text-decoration: none !important;
          }
          `}</style>
          <style jsx global>{`
            body {
              font-family: Roboto, helvetica, sans-serif;
            }
            a {
              text-decoration: none !important;
            }
          `}</style>

          {/* Intercom */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                if (navigator.userAgent.match(/chrome-lighthouse|Google Page Speed/i)) {
                  return;
                }
                window.intercomSettings = {
                  app_id: 'xazs9xxv'
                };
                // TODO: load this from the app and have better app logic around when to load tracking
                if (
                  location.hostname === 'localhost' ||
                  location.hostname === 'local.builder.io' ||
                  window.top !== window.self
                ) {
                  return;
                }
                var w = window;
                var ic = w.Intercom;
                if (typeof ic === 'function') {
                  ic('reattach_activator');
                  ic('update', intercomSettings);
                } else {
                  var d = document;
                  var i = function() {
                    i.c(arguments);
                  };
                  i.q = [];
                  i.c = function(args) {
                    i.q.push(args);
                  };
                  w.Intercom = i;

                  function l() {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/xazs9xxv';
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                  }
                  if (w.attachEvent) {
                    w.attachEvent('onload', l);
                  } else {
                    w.addEventListener('load', l, false);
                  }
                }
              })();
            `,
            }}
          />
          {/* Global site tag (gtag.js) - Google Analytics  */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-108006325-1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'UA-108006325-1');
          `,
            }}
          />
          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/5149643.js"
          />
        </body>
      </Html>
    );
  }
}
