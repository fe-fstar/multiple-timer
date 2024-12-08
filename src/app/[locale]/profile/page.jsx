import { getUser } from "@/app/queries/user";
import ProfileForm from "@/components/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser(); // Kullanıcı bilgilerini getir

  if (!user) {
    // Kullanıcı oturum açmamışsa giriş sayfasına yönlendir
    redirect("/login");
  }

  return (
    <main className="page min-h-screen grid place-items-center">
      <ProfileForm user={user} />
    </main>
  );
}
