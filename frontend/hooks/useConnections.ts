"use client";

import { useEffect, useState } from "react";

type Provider = "gmail" | "googlecalendar";

type ConnectionState = {
  gmail: {
    connected: boolean;
  };
  googleCalendar: {
    connected: boolean;
  };
};

export function useConnections() {
  const [connections, setConnections] =
    useState<ConnectionState | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [disconnecting, setDisconnecting] =
    useState<Provider | null>(null);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/connect/connections", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch connections");
      }

      const data = await response.json();

      setConnections(data.connections);
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const disconnect = async (provider: Provider) => {
    try {
      setDisconnecting(provider);

      const response = await fetch(
        `/api/connect/connections/${provider}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ?? "Failed to disconnect account"
        );
      }

      await fetchConnections();
    } catch (error) {
      console.error("Failed to disconnect account:", error);
      throw error;
    } finally {
      setDisconnecting(null);
    }
  };

  return {
    connections,
    isLoading,
    disconnecting,
    disconnect,
    refresh: fetchConnections,
  };
}