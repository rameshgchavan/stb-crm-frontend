import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

// This component shows pie chart of customer's statistics data and used by pages/StatisticsPage
const STBPieChart = ({ statistics }) => {
    const { totalRCSTBs,
        inActiveSTBs, suspendedSTBs,
        disconnectSTBs, faultySTBs } = statistics;

    // Initialized chart data 
    const [stbData, setSTBData] = useState({
        labels: [],
        datasets: [{
            label: "STBs",
            data: []
        }]
    });

    useEffect(() => {
        setSTBData(
            {
                labels: ["Active", inActiveSTBs <= 0 ? "Unknown" : "Inactive", "Suspened", "Faulty", "Disconnected"],
                datasets: [{
                    label: "STBs",
                    data: [totalRCSTBs, inActiveSTBs, suspendedSTBs, faultySTBs, disconnectSTBs],
                    backgroundColor: ["green", inActiveSTBs <= 0 ? "yellow" : "lightgreen", "red", "pink", "gray"]
                }]
            }
        )
    }, [statistics])

    return (
        <div style={{ position: "relative", height: "40vh", width: "80vw", margin: "auto" }}>
            <Pie data={stbData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    )
}

export default STBPieChart