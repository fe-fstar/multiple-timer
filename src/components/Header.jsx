import { getUser } from "@/app/queries/user";
import { logout } from "@/actions/auth";
import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";
import Logo from "./Logo";
import HeaderSidebar from "./HeaderSidebar";
import LocaleSelect from "./LocaleSelect";

export default async function Header() {
    let user = await getUser();
    const localeSelect = <LocaleSelect />;
    return <header className="sticky top-0 w-full h-header flex justify-center items-center px-4 py-2 z-50 border-b border-border bg-background/60 backdrop-blur">
        <div className="page flex justify-center items-center *:flex *:gap-x-4 *:items-center">
            <div className="grow basis-0">
                <Link href="/">
                    <Logo size={48} invert />
                </Link>
            </div>
            {
                user ?
                    <nav className="max-sm:hidden">
                        <Link href="/">Plans</Link>
                        <Link href="#">Bookmarks</Link>
                        <Link href="#">Profile</Link>
                        <Button className="text-only" onClick={logout}>Logout</Button>
                    </nav> :
                    <nav className="max-sm:hidden">
                        <Link href="#">Plans</Link>
                        <Link href={{ pathname: "/login-register", query: { referer: "login" } }} prefetch={true}>Login</Link>
                        <Link href={{ pathname: "/login-register", query: { referer: "register" } }} prefetch={true}>Register</Link>
                    </nav>
            }
            <div className="grow basis-0 *:ms-auto">
                <div className="max-sm:hidden">
                    {localeSelect}
                </div>
                <HeaderSidebar user={user} localeSelect={localeSelect} />
            </div>
        </div>
    </header>
}