export function Input({ 
  type = 'text', 
  placeholder = '',
  error = false,
  disabled = false,
  errorMessage = '',
  id = '',
  className = '',
  ...props 
}) {
  const baseStyles = 'w-full px-3 py-3 border rounded-lg font-body text-base transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan disabled:bg-slate-100 disabled:cursor-not-allowed';
  
  const borderStyles = error 
    ? 'border-error' 
    : 'border-border';

  const errorId = errorMessage && id ? `${id}-error` : '';

  return (
    <>
      <input 
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${baseStyles} ${borderStyles} ${className}`}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={errorId}
        {...props}
      />
      {errorMessage && (
        <span id={errorId} className="text-error text-sm mt-1 block">
          {errorMessage}
        </span>
      )}
    </>
  );
}

export function Textarea({ 
  placeholder = '',
  error = false,
  disabled = false,
  rows = 4,
  errorMessage = '',
  id = '',
  className = '',
  ...props 
}) {
  const baseStyles = 'w-full px-3 py-3 border rounded-lg font-body text-base transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan disabled:bg-slate-100 disabled:cursor-not-allowed resize-none';
  
  const borderStyles = error 
    ? 'border-error' 
    : 'border-border';

  const errorId = errorMessage && id ? `${id}-error` : '';

  return (
    <>
      <textarea 
        id={id}
        placeholder={placeholder}
        rows={rows}
        className={`${baseStyles} ${borderStyles} ${className}`}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={errorId}
        {...props}
      />
      {errorMessage && (
        <span id={errorId} className="text-error text-sm mt-1 block">
          {errorMessage}
        </span>
      )}
    </>
  );
}
