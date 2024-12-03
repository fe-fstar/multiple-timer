export default function Form({ className, children, ...rest }) {
    return (
        <form className={`custom-container bg-background/70 backdrop-blur-sm rounded-lg border border-foreground/20 ${className}`.trim()} {...rest}>
            {children}
        </form>
    );
}