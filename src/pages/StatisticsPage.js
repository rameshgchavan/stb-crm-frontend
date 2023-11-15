import "chart.js/auto";

import STBPieChart from "../components/charts/STBPieChart";
import STBRCBarChart from "../components/charts/STBRCBarChart";

const StatisticsPage = () => {
    return (
        <div >
            <STBPieChart />
            <hr />
            <STBRCBarChart />
        </div>
    )
}

export default StatisticsPage