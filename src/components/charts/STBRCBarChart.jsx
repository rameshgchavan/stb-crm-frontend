import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { DateTime } from "luxon";
import { readTransactionsAcNosOfYear } from "../../crudAPIs/transactionsAPIs";

// This component shows bar chart of statistics of transaction's of a year and used by pages/StatisticsPage
const STBRCBarChart = () => {
    // Get customer list and scrutinized user from redux store
    const customersList = useSelector(state => state.customersListReducer)?.data;
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token

    // Array to store months name
    const monthsList = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    // Initialized array and pushed years into it form 2022 to current year
    const yearsList = [];
    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    // Variable to store current year
    const yearOptions = useRef(DateTime.now().toFormat("yyyy"));

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
        // Get all month's (Jan to Dec) transactions a/c no of given year
        const acNoData = await readTransactionsAcNosOfYear(scrutinizedUser, yearOptions.current);

        // Map and filter free stb data 
        const freeSTBData = await acNoData.map((acNoList) => {
            return acNoList.map((acNos) => {
                //Populated customer for transactions 
                let customerIndex = customersList.findIndex((customer) => customer.AcNo === acNos.AcNo)

                return customerIndex === -1
                    ? {
                        AcNo: acNos.AcNo,
                        IsFree: false
                    }
                    : {
                        AcNo: customersList[customerIndex].AcNo,
                        IsFree: customersList[customerIndex].IsFree || false
                    }

            }).filter((sorted) => sorted.IsFree === true);
        });

        // Set sorted data for chart
        setSTBData({
            paidSTBs: {
                labels: monthsList,
                datasets: [
                    {
                        label: "Recharged Paid STBs",
                        data: acNoData.map((acNos, index) => { return acNos.length - freeSTBData[index].length }),
                        backgroundColor: ["blue"]
                    }
                ]
            },

            freeSTBs: {
                labels: monthsList,
                datasets: [
                    {
                        label: "Recharged Free STBs",
                        data: freeSTBData.map((freeSTBs) => { return freeSTBs.length }),
                        backgroundColor: ["Orange"]
                    }
                ]
            }
        });
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <>
            <div style={{ position: "relative", width: "80vw", margin: "auto" }}>
                {/* Year element */}
                <Form.Select name="year" defaultValue={yearOptions.current} style={{ width: "100px" }}
                    onChange={(e) => {
                        yearOptions.current = e.target.value;
                        listTransactions()
                    }}
                >
                    {yearsList?.map((year, index) =>
                        <option key={index} value={year}>{year}</option>
                    )}
                </Form.Select>
            </div>

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