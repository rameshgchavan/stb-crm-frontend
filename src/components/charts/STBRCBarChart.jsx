import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import checkAdminGetDbName from "../../functions/checkAdminGetDbName";
import { Form } from "react-bootstrap";
import { DateTime } from "luxon";

const STBRCBarChart = (props) => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token
    const { isAdmin, dbName } = checkAdminGetDbName(scrutinizedUser);

    const monthsList = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const yearsList = [];

    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    // const { monthsList, yearsList } = props;

    const yearOptions = useRef(DateTime.now().toFormat("yyyy"));

    const [stbData, setSTBData] = useState({
        labels: [],
        datasets: [{
            label: "Recharged STBs",
            data: [],
            backgroundColor: ["green"]
        }]
    });

    useEffect(() => {
        listTransactions();
    }, [])

    const listTransactions = async () => {
        const dataList = (await axios(`/transactions/rcstbcount`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, ofYear: yearOptions.current }
            }
        ))?.data

        setSTBData({
            labels: monthsList,
            datasets: [{
                label: "Recharged STBs",
                data: dataList,
                backgroundColor: ["green"]
            }]
        });
    }


    return (
        <div style={{ position: "relative", height: "50vh", width: "80vw", margin: "auto" }}>
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

            <Bar data={stbData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    )
}

export default STBRCBarChart