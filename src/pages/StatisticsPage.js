import "chart.js/auto";

import STBPieChart from "../components/charts/STBPieChart";
import STBRCBarChart from "../components/charts/STBRCBarChart";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { readTransactions } from "../crudAPIs/transactionsAPIs";
import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import _ from "lodash";

// This page used by routes/PagesRoutes
// This page shows charts
const StatisticsPage = () => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token

    // Variable to store month and year
    const statMonth = useRef(DateTime.now().minus({ months: 1 }).toFormat("LLL"));
    const statYear = useRef(DateTime.now().toFormat("yyyy"));

    // Initialized array and pushed years into it form 2022 to current year
    const yearsList = [];
    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    // States for char data
    const [statisticsData, setStatisticsData] = useState([]);
    const [pieStatistics, setPieStatistics] = useState();
    const [barStatistics, setBarStatistics] = useState();

    useEffect(() => {
        getStatisticsData();
    }, [])

    // This function get statistics data from database
    const getStatisticsData = async () => {
        // Variable to store collection nam
        const collectionName = "statistics";

        const statData = (await readTransactions(scrutinizedUser, collectionName, statYear.current));

        setStatisticsData(statData);

        getPieStatistics(statData);
        getBarStatistics(statData);
    }

    // This function get only selected month data for pie chart
    const getPieStatistics = (statData) => {
        const yearMonth = `${statYear.current}-${statMonth.current}`

        const yearIndex = statData?.findIndex(stat => stat.yearMonth == yearMonth);
        const statistics = statData[yearIndex]?.data;

        setPieStatistics(statistics);
    }

    // This function get data of selected year for bar chart
    const getBarStatistics = (statData) => {
        const yearMonth = statYear.current;

        const statistics = statData
            ?.filter(stat => {
                const yearStat = stat.yearMonth.split("-")[0];
                return yearStat == yearMonth;
            })
            // converting string year and month to iso date to sort 
            .map(stat => {
                return {
                    ...stat,
                    yearMonth: DateTime.fromJSDate(new Date(`${stat.yearMonth}-01`)).toISODate()
                }
            });

        // sorting by year month
        const sortedStatistics = _.orderBy(statistics,
            [
                "yearMonth"
            ],
            ["asc"]
        )
            // converting iso date to string year and month
            .map(stat => {
                return {
                    ...stat,
                    yearMonth: DateTime.fromISO(stat.yearMonth).toFormat("yyyy-LLL")
                }
            });

        setBarStatistics(sortedStatistics);
    }

    return (
        <div >
            <div style={{ position: "relative", width: "80vw", margin: "auto" }}>
                <div className="d-flex">
                    {/* Year element */}
                    <Form.Select name="year" defaultValue={statYear.current} style={{ width: "100px" }}
                        onChange={(e) => {
                            statYear.current = e.target.value;
                            getStatisticsData();
                        }}
                    >
                        {yearsList?.map((year, index) =>
                            <option key={index} value={year}>{year}</option>
                        )}
                    </Form.Select>

                    {/* Month element */}
                    <Form.Select name="month" defaultValue={statMonth.current} style={{ width: "100px" }}
                        onChange={(e) => {
                            statMonth.current = e.target.value;
                            getPieStatistics(statisticsData);
                        }}
                    >
                        {<option key={0} > Select </option>}
                        {
                            barStatistics?.map((statistics, index) => {
                                const month = statistics?.yearMonth?.split("-")[1];

                                return <option key={index + 1} value={month}> {month} </option>
                            }
                            )
                        }
                    </Form.Select>
                </div>
            </div>

            {pieStatistics && <STBPieChart statistics={pieStatistics} />}
            <hr />
            {
                statisticsData.length != 0 &&
                <STBRCBarChart statistics={barStatistics} />
            }
        </div>
    )
}

export default StatisticsPage