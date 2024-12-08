import { Link } from "@/i18n/routing"

export default function StyledLink({ className, children, ...props }) {
    return <Link className={`underline-offset-2 hover:underline ${className}`.trim()} {...props}>{children}</Link>
}