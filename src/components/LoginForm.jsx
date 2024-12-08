"use client"

import Form from "./Form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActionState } from "react";
import { login } from "@/actions/auth";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login);

    return (
        <Form className="*:mb-8 last:*:mb-0" action={action}>
            <h1 className="text-4xl text-center font-medium">Login</h1>
            <hr />
            <div className="mx-auto space-y-4 flex flex-col w-[min(100%,480px)] items-stretch">
                <div>
                    <Label htmlFor="username_xor_email">Username xor Email</Label>
                    <Input defaultValue={state?.data?.username_xor_email} name="username_xor_email" id="username_xor_email" placeholder="Username xor Email" autoComplete="username email" required />
                    {!state?.success && state?.message?.username_xor_email?.includes("username_xor_email_required") && <p className="form-failure">username_xor_email_required</p>}
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input defaultValue={state?.data?.password} name="password" id="password" type="password" placeholder="Password" autoComplete="password" required />
                    {!state?.success && state?.message?.password?.includes("password_required") && <p className="form-failure">password_required</p>}
                </div>

                {!state?.success && state?.message?.includes("invalid_credentials") && <p className="form-failure">invalid_credentials</p>}

                <Button type="submit" size="sm" className="mx-auto" disabled={pending}>{pending ? "Loading..." : "(Try to) Login"}</Button>
            </div>
        </Form>
    );
}