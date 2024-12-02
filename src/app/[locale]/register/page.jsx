import { getUser } from "@/app/queries/user";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage({ params }) {
    let user = await getUser();
    if (user) {
        let [redirect, locale] = await Promise.all([
            import("@/i18n/routing").then(mod => mod.redirect),
            params.locale]);

        redirect({ href: "/", locale });
    }
    return <main className="page min-h-screen grid place-items-center">
        <RegisterForm />
    </main>;
}