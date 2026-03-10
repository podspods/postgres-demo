import { useEffect, useState } from "react";

export type HealthResponse = {
  status: string;
  timestamp: string;
  uptime: number;
};

// const URL = "http://localhost:3001/api/motorcycle-brands";
const URL = "http://localhost:3002/health";

export type TestApiProps = {};
export default function TestApi({ ...props }: TestApiProps) {
  const [count, setCount] = useState<number>(0);
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      // Appel à l'API health
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HealthResponse = await response.json();
      setHealthData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch health data");
      console.error("Error fetching health:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);

      fetchHealth();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchHealth]);

  return (
    <>
      <h1>TestApi 60000: {count}</h1>
      'lastUpdated' :{lastUpdated.toDateString()}
      <br />
      {/* {error} */}
      {/* {healthData?.timestamp} */}
      {/* {loading} */}
      'status' {`[${healthData?.status}]`}
      <br />
      'timestamp'{`[${healthData?.timestamp}]`}
      <br />
      'uptime'{`[${healthData?.uptime}]`}
      <br />
    </>
  );
}
