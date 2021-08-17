import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { GA_TRACKING_ID } from "../helpers/gtag";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="57x57" href="/favicon.ico/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicon.ico/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicon.ico/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon.ico/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/favicon.ico/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon.ico/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/favicon.ico/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon.ico/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon.ico/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico/favicon-16x16.png" />
          {/*
                    <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
                          rel="preload"
                          as="style"
                          onLoad={function (e) {
                              e.currentTarget.onload = null;
                              e.currentTarget.rel = 'stylesheet'
                          }}/>
                          */}

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/93d61a4330c045d2e7ca15ba8/55173477bdea70d58747fdf45.js");`,
            }}
          />

          <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
