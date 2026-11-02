export function Badge({ 
  children, 
  variant = 'default',
  className = '',
}) {
  const variants = {
    default: 'bg-slate-200 text-text-primary',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
    primary: 'bg-navy/20 text-navy',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
