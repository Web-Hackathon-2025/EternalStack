import './Button.css';

const Button = ({ children, variant = 'primary', size = 'md', onClick, type = 'button', className = '', ...props }) => {
    const baseClass = `btn btn-${variant} btn-${size} ${className}`;

    return (
        <button
            className={baseClass}
            onClick={onClick}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
