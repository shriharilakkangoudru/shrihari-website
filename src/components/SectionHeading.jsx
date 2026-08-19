export default function SectionHeading({ title, subtitle, action, align = 'center' }) {
  return (
    <div
      className={`mb-8 flex flex-col gap-3 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      } ${action ? 'sm:flex-row sm:items-end sm:justify-between' : ''}`}
    >
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-slate-500 sm:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}