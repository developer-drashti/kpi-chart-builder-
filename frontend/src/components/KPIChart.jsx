import { useEffect, useState } from "react";
import { Paper, CircularProgress, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { fetchAggregate } from "../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function KPIChart({ query, chartType }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchAggregate(query);
        setData(result || []);
      } catch (err) {
        console.error("Error fetching KPI data:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    if (query) loadData();
  }, [query]);

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!data.length) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography>No data available 🚫</Typography>
      </Paper>
    );
  }

  const groupByKey = query.group_by || Object.keys(data[0])[0];
  const metricKey =
    query.metric === "count"
      ? "Count"
      : query.metric === "unique_ids"
      ? "Unique Ids"
      : "Rate";

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: `${metricKey} by ${groupByKey}`, // Chart title
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: groupByKey, // X-axis label (e.g., "area")
        },
      },
      y: {
        title: {
          display: true,
          text: metricKey, // Y-axis label (e.g., "unique_ids")
        },
        beginAtZero: true,
      },
    },
  };

  const labels = data.map((row) => row[groupByKey]);
  const values = data.map((row) => row[query.metric]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${metricKey} by ${groupByKey}`,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // ✅ Chart type switch
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "bar":
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return <Paper sx={{ p: 3 }}>{renderChart()}</Paper>;
}

export default KPIChart;
