"use client";

import Form from "./Form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActionState } from "react";
import { updatePassword } from "@/actions/auth";

export default function ProfileForm({ user }) {
  const [state, action, pending] = useActionState(updatePassword);

  return (
    <Form className="py-8 space-y-8" action={action}>
      <h1 className="text-4xl text-center font-medium">Profile</h1>
      <hr />
      <div className="mx-auto space-y-4 flex flex-col w-[min(100%,480px)] items-stretch">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            defaultValue={user?.username || ""}
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="username"
            required
            disabled
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            defaultValue={user?.email || ""}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            disabled
          />
        </div>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="New Password"
            autoComplete="password"
            required
          />
          {!state?.success && state?.message?.includes("password_minmax") && (
            <p className="form-failure">password_minmax</p>
          )}
        </div>
        <div>
          <Label htmlFor="confirm_password">Confirm New Password</Label>
          <Input
            name="confirm_password"
            id="confirm_password"
            type="password"
            placeholder="Confirm New Password"
            autoComplete="password"
            required
          />
          {!state?.success &&
            state?.message?.includes("passwords_mismatch") && (
              <p className="form-failure">passwords_mismatch</p>
            )}
        </div>
        <Button type="submit" size="sm" className="mx-auto" disabled={pending}>
          {pending ? "Loading..." : "Change Password"}
        </Button>
      </div>
    </Form>
  );
}
