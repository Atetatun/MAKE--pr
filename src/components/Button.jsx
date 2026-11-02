export function Button({ 
  variant = 'primary', 
  size = 'default', 
  disabled = false,
  children,
  className = '',
  ...props 
}) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-navy text-white hover:bg-blue-900',
    secondary: 'border-2 border-navy text-navy hover:bg-slate-50',
    danger: 'bg-error text-white hover:bg-red-600',
    ghost: 'text-navy hover:bg-slate-50',
  };
  
  const sizes = {
    small: 'text-sm px-3 py-2',
    default: 'text-base px-4 py-3',
    large: 'text-lg px-6 py-4',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
