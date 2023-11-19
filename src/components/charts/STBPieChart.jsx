import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { readTransactions } from "../../crudAPIs/transactionsAPIs/readTransactionsAPIs";
import { DateTime } from "luxon";

const STBPieChart = () => {
    const customersList = useSelector(state => state.customersListReducer)?.data;
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token

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

    const listTransactions = async () => {
        const collectionName = DateTime.now().minus({ months: 1 }).toFormat("MMM-yyyy");
        // Get all transactions of given month and year
        const transactionsList = await readTransactions(scrutinizedUser, collectionName);

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