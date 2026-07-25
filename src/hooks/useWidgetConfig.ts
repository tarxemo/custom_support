import * as React from 'react';
import { CustomerSupportAPIClient } from '../api/client';
import type { WidgetConfigResponse } from '../types';

type WidgetConfigData = WidgetConfigResponse['data'];

/**
 * Fetches console-driven widget customization once on mount. This is a
 * non-blocking enhancement: while loading, or if the fetch fails, `config`
 * stays null and callers should render using their own local defaults/props
 * unchanged - the widget must never depend on this succeeding.
 */
export function useWidgetConfig(apiKey: string, baseUrl?: string): { config: WidgetConfigData | null } {
    const [config, setConfig] = React.useState<WidgetConfigData | null>(null);

    React.useEffect(() => {
        let cancelled = false;

        const client = new CustomerSupportAPIClient(apiKey, baseUrl);
        client
            .getWidgetConfig()
            .then((data) => {
                if (!cancelled) {
                    setConfig(data);
                }
            })
            .catch(() => {
                // Silently keep config null - the widget falls back to
                // local props/defaults, same as if this hook didn't exist.
            });

        return () => {
            cancelled = true;
        };
    }, [apiKey, baseUrl]);

    return { config };
}
