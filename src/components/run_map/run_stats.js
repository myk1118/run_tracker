import React from 'react';

export default props =>{
    return(
    <div className="currentRunStatsBody">
            <div className="bg-secondary">Header</div>
            <div className="bg-secondary">Nav Bar</div>
            <table>
                <tbody className="col-12">
                    <tr className="currentRunStatsRow">
                        <th className="col-4">Mile</th>
                        <th className="col-2">Pace</th>
                        <th className="col-2">Heart Rate</th>
                        <th className="col-2">Calories Burned</th>
                    </tr>
                    <tr className="currentRunStatsRow">
                        <th>1</th>
                        <th>7:50</th>
                        <th>155</th>
                        <th>255</th>
                    </tr>
                    <tr className="currentRunStatsRow">
                        <th>2</th>
                        <th>8:00</th>
                        <th>160</th>
                        <th>270</th>
                    </tr>
                </tbody>
            </table>
    </div>
    )
}