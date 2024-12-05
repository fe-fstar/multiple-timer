import { logout } from "@/actions/auth";
import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";
import { getUser } from "@/app/queries/user";
import Logo from "./Logo";

export default async function Header() {
    let user = await getUser();
    return <header className="sticky top-0 w-full flex justify-between *:flex *:gap-x-4 *:items-center items-center px-4 py-2 z-50 border-b border-border bg-background/60 backdrop-blur">
        <Link href="/" className="grow basis-0">
            <Logo size={48} invert />
        </Link>
        {
            user ?
                <nav>
                    <Link href="#">Plans</Link>
                    <Link href="#">Bookmarks</Link>
                    <Link href="#">Profile</Link>
                    <Button className="text-only" onClick={logout}>Logout</Button>
                </nav> :
                <nav>
                    <Link href="#">Plans</Link>
                    <Link href={{ pathname: "/login-register", query: { referer: "login" } }} prefetch={true}>Login</Link>
                    <Link href={{ pathname: "/login-register", query: { referer: "register" } }} prefetch={true}>Register</Link>
                </nav>
        }
        <div className="grow basis-0 *:ms-auto">
            <div>
                EN / TR
            </div>
        </div>
    </header>
}