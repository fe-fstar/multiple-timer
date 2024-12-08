export default function Form({ className, children, ...rest }) {
    return (
        <form className={`custom-container glassmorphism ${className}`.trim()} {...rest}>
            {children}
        </form>
    );
}