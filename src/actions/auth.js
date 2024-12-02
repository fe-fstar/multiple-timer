"use server";

import { LoginFormSchema, RegisterFormSchema } from "@/definitions/auth";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "./session";

export async function login(_, formData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        username_xor_email: formData.get('username_xor_email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: validatedFields.error.flatten().fieldErrors,
            data: Object.fromEntries(formData)
        };
    }

    let username_xor_email = validatedFields.data.type === "email" ? "email" : "username";

    // Check if a user with this username or email exists
    let userFound = await db
        .select()
        .from(users)
        .where(eq(users[username_xor_email], validatedFields.data.username_xor_email.value))
        .limit(1);

    if (userFound.length === 0) {
        return { success: false, message: "invalid_credentials", data: Object.fromEntries(formData) };
    }

    userFound = userFound[0];

    // Check if the found user's password is valid
    const isPasswordValid = await bcrypt.compare(validatedFields.data.password, userFound.password);

    if (!isPasswordValid) {
        return { success: false, message: "invalid_credentials", data: Object.fromEntries(formData) };
    }

    // Add token to cookies
    await createSession(userFound.id);

    // Go home
    let [getLocale, redirect] = await Promise.all([
        import("next-intl/server").then(mod => mod.getLocale),
        import("@/i18n/routing").then(mod => mod.redirect)]);

    let locale = await getLocale();

    redirect({ href: "/", locale });
}

export async function register(_, formData) {
    let errors = [];
    const formDataObject = Object.fromEntries(formData);
    try {
        // Validate form fields
        const validatedFields = RegisterFormSchema.safeParse(formDataObject);

        if (!validatedFields.success) {
            for (let errorList of Object.values(validatedFields.error.flatten().fieldErrors)) {
                errors = [...errors, ...errorList];
            }
        }

        // Check if username or email is taken
        let [emailFound, usernameFound] = await Promise.all([
            db.select().from(users).where(eq(users.email, formData.get("email"))).limit(1),
            db.select().from(users).where(eq(users.username, formData.get("username"))).limit(1),
        ]);

        if (emailFound.length !== 0) {
            errors.push("email_taken");
        }

        if (usernameFound.length !== 0) {
            errors.push("username_taken");
        }

        // Return if at least one is taken
        if (errors.length !== 0) {
            return {
                success: false,
                message: errors,
                data: formDataObject
            }
        }

        // Encrypt password
        let hashedPassword = await bcrypt.hash(formDataObject.password, 10);

        // Insert user
        let result = await db
            .insert(users)
            .values({ ...formDataObject, password: hashedPassword })
            .returning({ id: users.id });

        // Create session
        await createSession(result[0].id);
    } catch (error) {
        errors.push("server_error");
        return {
            success: false,
            message: errors,
            data: formDataObject
        }
    }

    // Go home
    let [getLocale, redirect] = await Promise.all([
        import("next-intl/server").then(mod => mod.getLocale),
        import("@/i18n/routing").then(mod => mod.redirect)]);

    let locale = await getLocale();

    redirect({ href: "/", locale });
}

export async function logout() {
    deleteSession();
    let [getLocale, redirect] = await Promise.all([
        import("next-intl/server").then(mod => mod.getLocale),
        import("@/i18n/routing").then(mod => mod.redirect)]);

    let locale = await getLocale();

    redirect({ href: "/login", locale });
}