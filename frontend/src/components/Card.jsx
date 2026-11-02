export function Card({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) {
  return (
    <div 
      className={`bg-white p-6 rounded-lg border border-border shadow-light ${hover ? 'transition-all duration-150 hover:shadow-medium hover:scale-105' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
