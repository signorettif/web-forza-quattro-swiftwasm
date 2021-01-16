//Types
interface WidgetFrameProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const WidgetFrame = ({
  children,
  title,
  className,
}: WidgetFrameProps) => {
  return (
    <section
      className={
        'bg-sidebar-element-bg rounded-2xl p-6 w-full shadow-md ' + className
      }
    >
      <h2 className="font-medium text-xl">{title}</h2>
      {children}
    </section>
  );
};
