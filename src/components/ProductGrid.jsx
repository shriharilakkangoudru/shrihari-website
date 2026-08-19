export default function ProductGrid({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {children}
    </div>
  );
}