import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale, localeDetection, localePrefix, pathnames } from './config';

export const routing = defineRouting({
    locales,
    defaultLocale,
    localeDetection,
    localePrefix,
    pathnames,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
