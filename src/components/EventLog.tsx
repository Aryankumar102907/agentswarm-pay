import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface LogEntry {
  id: string;
  type: 'success' | 'pending' | 'error' | 'info';
  message: string;
  txHash?: string;
  timestamp: number;
}

interface EventLogProps {
  logs: LogEntry[];
}

export const EventLog = ({ logs }: EventLogProps) => {
  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'error': return 'bg-destructive text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="neo-card p-4 space-y-3 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-black uppercase tracking-tight">Event Log</h3>
      {logs.length === 0 ? (
        <p className="text-muted-foreground text-sm">No events yet</p>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="border-2 border-foreground p-3 bg-background">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge className={getTypeColor(log.type)}>{log.type.toUpperCase()}</Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm font-medium mb-2">{log.message}</p>
              {log.txHash && (
                <a
                  href={`https://sepolia.arbiscan.io/tx/${log.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary hover:underline flex items-center gap-1"
                >
                  View on Arbiscan <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
