//Types
interface WidgetFrameProps {
  children: React.ReactNode;
  title: string;
}

export const WidgetFrame = ({ children, title }: WidgetFrameProps) => {
  return (
    <section className="bg-sidebar-element-bg rounded-2xl p-6 w-full shadow-md">
      <h2 className="font-medium text-xl">{title}</h2>
      {children}
    </section>
  );
};
