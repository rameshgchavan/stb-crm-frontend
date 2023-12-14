import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";

// This component shows bar chart of statistics of transaction's of a year and used by pages/StatisticsPage
const STBRCBarChart = ({ statistics }) => {
    const { totalRCSTBs, freeSTBs } = statistics;

    // Initialized chart data
    const [stbData, setSTBData] = useState({
        paidSTBs: {
            labels: [],
            datasets: [{
                label: "Recharged Paid STBs",
                data: []
            }]
        },
        freeSTBs: {
            labels: [],
            datasets: [{
                label: "Recharged Free STBs",
                data: []
            }]
        }
    });

    useEffect(() => {
        listTransactions();
    }, [])

    /* This function get transaction list and set length of 
     filtered transaction data into chart data*/
    // This function is called on component load
    const listTransactions = async () => {
        // Map and filter free stb data 
        // const freeSTBData = await acNoData.map((acNoList) => {
        //     return acNoList.map((acNos) => {
        //         //Populated customer for transactions 
        //         let customerIndex = customersList.findIndex((customer) => customer.AcNo === acNos.AcNo)

        //         return customerIndex === -1
        //             ? {
        //                 AcNo: acNos.AcNo,
        //                 IsFree: false
        //             }
        //             : {
        //                 AcNo: customersList[customerIndex].AcNo,
        //                 IsFree: customersList[customerIndex].IsFree || false
        //             }

        //     }).filter((sorted) => sorted.IsFree === true);
        // });

        // Set sorted data for chart
        setSTBData({
            paidSTBs: {
                labels: statistics.map(stat => stat.yearMonth.split("-")[1]),
                datasets: [
                    {
                        label: "Recharged Paid STBs",
                        data: statistics.map(stat => stat.data.totalRCSTBs - stat.data.freeSTBs),
                        backgroundColor: ["blue"]
                    }
                ]
            },

            freeSTBs: {
                labels: statistics.map(stat => stat.yearMonth.split("-")[1]),
                datasets: [
                    {
                        label: "Recharged Free STBs",
                        data: statistics.map(stat => stat.data.freeSTBs),
                        backgroundColor: ["Orange"]
                    }
                ]
            }
        });
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        maxBarThickness: 50
    }
    return (
        <>
            {/*  Bar chart of paid STBs*/}
            <div style={{ position: "relative", height: "50vh", width: "80vw", margin: "auto" }} >
                <Bar data={stbData.paidSTBs} options={options} />
            </div >

            {/*  Bar chart of free STBs*/}
            <div style={{ position: "relative", height: "20vh", width: "80vw", margin: "auto" }} >
                <Bar data={stbData.freeSTBs} options={options} />
            </div >
        </>
    )
}

export default STBRCBarChart