export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="text-muted-foreground min-w-[350px] text-sm" style={{ color: '#000' }}>{children}</div>
}