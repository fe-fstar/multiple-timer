"use client"

import Form from "./Form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActionState } from "react";
import { register } from "@/actions/auth";

export default function RegisterForm() {
    const [state, action, pending] = useActionState(register);

    return (
        <Form className="py-8 space-y-8" action={action}>
            <h1 className="text-4xl text-center font-medium">Register</h1>
            <hr />
            <div className="mx-auto space-y-4 flex flex-col w-[min(100%,480px)] items-stretch">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input defaultValue={state?.data?.username} name="username" id="username" placeholder="Username" autoComplete="username" required />
                    {!state?.success && state?.message?.includes("username_taken") && <p className="form-failure">username_taken</p>}
                    {!state?.success && state?.message?.includes("username_minmax") && <p className="form-failure">username_min_max</p>}
                    {!state?.success && state?.message?.includes("username_pattern") && <p className="form-failure">username_pattern</p>}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input defaultValue={state?.data?.email} name="email" id="email" type="email" placeholder="Email" autoComplete="username" required />
                    {!state?.success && state?.message?.includes("email_taken") && <p className="form-failure">email_taken</p>}
                    {!state?.success && state?.message?.includes("email_pattern") && <p className="form-failure">email_pattern</p>}
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input defaultValue={state?.data?.password} name="password" id="password" type="password" placeholder="Password" autoComplete="password" required />
                    {!state?.success && state?.message?.includes("password_minmax") && <p className="form-failure">password_minmax</p>}
                </div>
                <div>
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input defaultValue={state?.data?.confirm_password} name="confirm_password" id="confirm_password" type="password" placeholder="Confirm Password" autoComplete="password" required />
                    {!state?.success && state?.message?.includes("passwords_mismatch") && <p className="form-failure">passwords_mismatch</p>}
                </div>
                <Button type="submit" size="sm" className="mx-auto" disabled={pending}>{pending ? "Loading..." : "(Try to) Register"}</Button>
            </div>
        </Form>
    );
}