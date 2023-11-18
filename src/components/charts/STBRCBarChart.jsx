import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import checkAdminGetDbName from "../../functions/checkAdminGetDbName";
import { Form } from "react-bootstrap";
import { DateTime } from "luxon";

const STBRCBarChart = () => {
    const customersList = useSelector(state => state.customersListReducer)?.data;
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    const monthsList = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const yearsList = [];

    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    const yearOptions = useRef(DateTime.now().toFormat("yyyy"));

    const [stbData, setSTBData] = useState({
        paidSTBs: {
            labels: [],
            datasets: [{
                label: "Paid STBs",
                data: []
            }]
        },
        freeSTBs: {
            labels: [],
            datasets: [{
                label: "Free STBs",
                data: []
            }]
        }
    });

    useEffect(() => {
        listTransactions();
    }, [])

    const listTransactions = async () => {
        const acNoData = (await axios(`/transactions/rcstbcount`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, ofYear: yearOptions.current }
            }
        ))?.data

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

        setSTBData({
            paidSTBs: {
                labels: monthsList,
                datasets: [
                    {
                        label: "Paid STBs",
                        data: acNoData.map((acNos, index) => { return acNos.length - freeSTBData[index].length }),
                        backgroundColor: ["blue"]
                    }
                ]
            },

            freeSTBs: {
                labels: monthsList,
                datasets: [
                    {
                        label: "Free STBs",
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

            <div style={{ position: "relative", height: "50vh", width: "80vw", margin: "auto" }} >
                <Bar data={stbData.paidSTBs} options={options} />
            </div >
            <div style={{ position: "relative", height: "20vh", width: "80vw", margin: "auto" }} >
                <Bar data={stbData.freeSTBs} options={options} />
            </div >
        </>
    )
}

export default STBRCBarChart