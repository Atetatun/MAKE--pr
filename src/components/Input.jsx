export function Input({ 
  type = 'text', 
  placeholder = '',
  error = false,
  disabled = false,
  className = '',
  ...props 
}) {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg font-body text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan disabled:bg-slate-100 disabled:cursor-not-allowed';
  
  const borderStyles = error 
    ? 'border-error' 
    : 'border-border';

  return (
    <input 
      type={type}
      placeholder={placeholder}
      className={`${baseStyles} ${borderStyles} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}

export function Textarea({ 
  placeholder = '',
  error = false,
  disabled = false,
  rows = 4,
  className = '',
  ...props 
}) {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg font-body text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan disabled:bg-slate-100 disabled:cursor-not-allowed resize-none';
  
  const borderStyles = error 
    ? 'border-error' 
    : 'border-border';

  return (
    <textarea 
      placeholder={placeholder}
      rows={rows}
      className={`${baseStyles} ${borderStyles} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
