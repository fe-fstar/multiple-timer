"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function LoginRegisterSwitch({ defaultForm }) {
    const [activeForm, setActiveForm] = useState(defaultForm);

    useEffect(() => {
        setActiveForm(defaultForm);
    }, [defaultForm]);

    return (
        <Tabs value={activeForm} onValueChange={setActiveForm} className="custom-container">
            <TabsList className="grid w-full grid-cols-2 text-base h-12 px-2 glassmorphism data-[state=active]:*:bg-primary data-[state=active]:*:text-primary-foreground">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    );
}
