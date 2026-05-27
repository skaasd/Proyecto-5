type ConstanciaIndicatorProps = {
  days: number;
};

export function ConstanciaIndicator({ days }: ConstanciaIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm">
      <span className="h-2.5 w-2.5 rounded-full bg-accent-success" aria-hidden="true" />
      <span className="text-muted-foreground">Constancia</span>
      <span className="font-medium text-foreground">{days} días</span>
    </div>
  );
}
