type CoinDisplayProps = {
  coins: number;
  label?: string;
};

export function CoinDisplay({ coins, label = "Monedas" }: CoinDisplayProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm">
      <span className="h-2.5 w-2.5 rounded-full bg-accent-insight" aria-hidden="true" />
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{coins}</span>
    </div>
  );
}
