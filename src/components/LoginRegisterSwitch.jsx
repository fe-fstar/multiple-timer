import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function LoginRegisterSwitch({ defaultForm = "login" }) {
    return (
        <Tabs defaultValue={defaultForm} className="custom-container">
            <TabsList className="grid w-full grid-cols-2 *:text-base h-12 px-2 text-foreground bg-background/70 backdrop-blur-sm rounded-lg border border-foreground/20 data-[state=active]:*:bg-primary data-[state=active]:*:text-primary-foreground">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm/>
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    );
}