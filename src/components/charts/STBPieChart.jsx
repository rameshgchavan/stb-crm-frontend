import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { readTransactions } from "../../crudAPIs/transactionsAPIs";
import { DateTime } from "luxon";

// This component shows pie chart of customer's statistics data and used by pages/StatisticsPage
const STBPieChart = () => {
    // Get customer list and scrutinized user from redux store
    const customersList = useSelector(state => state.customersListReducer)?.data;
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token

    // Initialized chart data
    const [stbData, setSTBData] = useState({
        labels: [],
        datasets: [{
            label: "STBs",
            data: []
        }]
    });

    useEffect(() => {
        listTransactions();
    }, [])

    /* This function get transaction list and set length of 
     filtered transaction as well customres data into chart data*/
    // This function is called by useEffect
    const listTransactions = async () => {
        // Get all transactions of given month and year
        const collectionName = DateTime.now().minus({ months: 1 }).toFormat("MMM-yyyy");
        const transactionsList = await readTransactions(scrutinizedUser, collectionName);

        //Start --- Get length of filterd data for chart---
        const activeSTBs = transactionsList.filter((transactions) =>
            transactions.TransactionType.toUpperCase() !== "CANCELLATION" &&
            (
                transactions.PlanType.toUpperCase() === "BASIC" ||
                transactions.PlanType.toUpperCase() === "HATHWAY BOUQUET"
            )
        ).length;

        const inActiveSTBs = customersList.filter((customers) =>
            customers.STBStatus.toUpperCase() === "ACTIVE" &&
            customers.STBState.toUpperCase() === "ALLOCATED" &&
            (
                customers.STBLocation.toUpperCase() === "INLINE" ||
                customers.STBLocation.toUpperCase() === "CAMEIN"
            )
        ).length - activeSTBs;

        const suspendedSTBs = customersList.filter((customers) =>
            customers.STBStatus.toUpperCase() === "SUSPEND" &&
            customers.STBState.toUpperCase() === "ALLOCATED" &&
            (
                customers.STBLocation.toUpperCase() === "INLINE" ||
                customers.STBLocation.toUpperCase() === "CAMEIN"
            )
        ).length;

        const faultyTBs = customersList.filter((customers) =>
            customers.STBState.toUpperCase() === "FAULTY"
        ).length;

        const disconnectSTBs = customersList.filter((customers) =>
            customers.STBStatus.toUpperCase() === "DISCONNECT"
        ).length;
        //End --- Get length of filterd data for chart---

        // Set length of filtered data for chart
        setSTBData({
            labels: ["Active", inActiveSTBs <= 0 ? "Unknown" : "Inactive", "Suspened", "Faulty", "Disconnected"],
            datasets: [{
                label: "STBs",
                data: [activeSTBs, inActiveSTBs, suspendedSTBs, faultyTBs, disconnectSTBs],
                backgroundColor: ["green", inActiveSTBs <= 0 ? "yellow" : "lightgreen", "red", "pink", "gray"]
            }]
        });
    }

    return (
        <div style={{ position: "relative", height: "40vh", width: "80vw", margin: "auto" }}>
            <Pie data={stbData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    )
}

export default STBPieChart