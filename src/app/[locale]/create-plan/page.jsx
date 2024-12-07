import { getUser } from "@/app/queries/user";
import { Link } from "@/i18n/routing";

export default async function CreatePlanPage() {
    let user = await getUser();

    return <main className="page min-h-screen-minus-header grid place-items-center">
        {user
            ?
            "hi"
            :
            <div className="glassmorphism custom-container flex flex-col justify-center text-center gap-y-4">
                <h2 className="text-3xl">Unauthorized</h2>
                <p>You must be logged in to create a plan.</p>
                <div className="w-full flex justify-center gap-x-8">
                    <Link href={{ pathname: "/login-register", query: { referer: "login" } }}>Login</Link>
                    <Link href={{ pathname: "/login-register", query: { referer: "register" } }}>Register</Link>
                </div>
            </div>
        }
    </main>
}