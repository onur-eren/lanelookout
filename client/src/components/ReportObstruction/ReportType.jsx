import React, { useState } from "react";

// TODO
// Import from file
const reportTypes = [
    ["H", "Pothole"],
    ["P", "Parking"],
    ["O", "Other"]
];
function ReportType({setReportType,reportType}) {
    // Creating Default Value
    if (typeof reportType === "undefined"){
        setReportType(reportTypes[1][0]);
    }

    // TODO
    // STYLE need to be in CSS
    const spanStyle = {fontSize: 24, marginRight: 20, lineHeight:2}

    // Sending changes to the parent reportType variable
    const handlechange = (event) => {
        setReportType(event.currentTarget.value);
    }

    // TODO
    // ARROW FUNCTION CAN BE SIMPLIFIED
    const Options = ()=>{
        return reportTypes.map((type) => {
            return (
                <span style={spanStyle} key={type[0]}>
                    <label>
                        <input type="radio"
                            value={type[0]}
                            checked={reportType===type[0]}
                            onChange={handlechange}
                        />
                        {type[1]}
                    </label>
                </span>
            )
        })
    }
    
    // Returning DEFAULT Component
    return (
        <center style={{ backgroundColor:'gray'}}>
            <Options/>
        </center>
    );
}
export default ReportType;