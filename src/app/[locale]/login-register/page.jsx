import { getUser } from "@/app/queries/user";
import LoginRegisterSwitch from "@/components/LoginRegisterSwitch";

export default async function LoginRegisterPage({ params, searchParams }) {
    let user = await getUser();
    if (user) {
        let [redirect, locale] = await Promise.all([
            import("@/i18n/routing").then(mod => mod.redirect),
            params.locale,

        ]);

        redirect({ href: "/", locale });
    }

    let defaultForm = (await searchParams).referer;

    return <main className="page min-h-screen grid place-items-center">
        <LoginRegisterSwitch defaultForm={defaultForm} />
    </main>;
}