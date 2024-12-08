"use client";

import { logout } from "@/actions/auth";
import { Link } from "@/i18n/routing";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";

export default function HeaderSidebar({ user, localeSelect }) {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (<Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Menu size={32} strokeWidth={1} className="sm:hidden cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="last:*:flex last:*:flex-col last:*:gap-y-4 last:*:text-lg">
            <SheetHeader className="mb-4">
                <SheetTitle asChild>
                    <p>Options</p>
                </SheetTitle>
            </SheetHeader>
            {
                user ?
                    <nav>
                        <Link href="#" onClick={close}>Plans</Link>
                        <Link href="#" onClick={close}>Bookmarks</Link>
                        <Link href="#" onClick={close}>Profile</Link>
                        <Button className="w-fit text-only" onClick={() => {
                            close();
                            logout();
                        }}><LogOut size={16} /> Logout</Button>
                        {localeSelect}
                    </nav> :
                    <nav>
                        <Link onClick={close} href="#">Plans</Link>
                        <Link onClick={close} href={{ pathname: "/login-register", query: { referer: "login" } }} prefetch={true}>Login</Link>
                        <Link onClick={close} href={{ pathname: "/login-register", query: { referer: "register" } }} prefetch={true}>Register</Link>
                        {localeSelect}
                    </nav>
            }
        </SheetContent>
    </Sheet>);
}