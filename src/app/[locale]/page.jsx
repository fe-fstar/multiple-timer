import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const m = useTranslations("HomePage");
  return (
    <div className="page *:min-h-screen flex flex-col justify-center items-center">
      <section className="flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-6xl max-sm:text-5xl font-semibold">
          {m.rich("title", {
            gradient: (chunks) => (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFCCE] via-primary to-[#FFFCCE] bg-[length:500%_auto] animate-[text-flow_4s_ease-in-out_infinite_reverse]">
                {chunks}
              </span>
            ),
          })}
        </h1>
        <p className="text-xl max-sm:text-lg">{m("subtitle")}</p>
        <Button asChild size="lg">
          <Link href="/login-register">{m("getStarted")}</Link>
        </Button>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </div>
  );
}
