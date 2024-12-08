import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import localFont from "next/font/local";
import "./globals.css";
import Header from '@/components/Header';

const optika = localFont({
  variable: "--font-optika",
  src: [
    {
      path: "../fonts/Optika-Thin.woff",
      weight: "100",
      style: "normal"
    },
    {
      path: "../fonts/Optika-ThinItalic.woff",
      weight: "100",
      style: "italic"
    },
    {
      path: "../fonts/Optika-Light.woff",
      weight: "300",
      style: "normal"
    },
    {
      path: "../fonts/Optika-LightItalic.woff",
      weight: "300",
      style: "italic"
    },
    {
      path: "../fonts/Optika-Regular.woff",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/Optika-Italic.woff",
      weight: "400",
      style: "italic"
    },
    {
      path: "../fonts/Optika-Medium.woff",
      weight: "500",
      style: "normal"
    },
    {
      path: "../fonts/Optika-MediumItalic.woff",
      weight: "500",
      style: "italic"
    },
    {
      path: "../fonts/Optika-SemiBold.woff",
      weight: "600",
      style: "normal"
    },
    {
      path: "../fonts/Optika-SemiBoldItalic.woff",
      weight: "600",
      style: "italic"
    },
    {
      path: "../fonts/Optika-Bold.woff",
      weight: "700",
      style: "normal"
    },
    {
      path: "../fonts/Optika-BoldItalic.woff",
      weight: "700",
      style: "italic"
    },
    {
      path: "../fonts/Optika-Black.woff",
      weight: "900",
      style: "normal"
    },
    {
      path: "../fonts/Optika-BlackItalic.woff",
      weight: "900",
      style: "italic"
    },

  ],
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={optika.variable}>
      <body className='font-optika font-light text-foreground bg-[rgba(0,0,0,0.8)] bg-[url("/images/bg-sm.webp")] sm:bg-[url("/images/bg-md.webp")] lg:bg-[url("/images/bg.webp")] bg-no-repeat bg-center bg-fixed bg-blend-darken bg-cover overflow-x-hidden selection:bg-primary selection:text-background'>
        <NextIntlClientProvider messages={messages}>
          <Header/>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}