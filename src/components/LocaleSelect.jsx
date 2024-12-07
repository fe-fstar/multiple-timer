"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { locales } from "@/i18n/config";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function LocaleSelect() {
    const pathname = usePathname();
    const localeActive = useLocale();
    const params = useParams();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    function onLocaleChange(event) {
        const nextLocale = event;
        startTransition(() => {
            router.replace(
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (<Select defaultValue={localeActive} onValueChange={onLocaleChange} disabled={isPending} aria-label="language" name="language" id="language">
        <SelectTrigger>
            <SelectValue placeholder={localeActive} />
        </SelectTrigger>
        <SelectContent>
            {locales.map(locale => (
                <SelectItem key={locale} value={locale}>{locale.toUpperCase()}</SelectItem>
            ))}
        </SelectContent>
    </Select>
    );
}