import React from "react";

function Description({ setDescription,description }) {

    const handleChange = (event) => {
        event.preventDefault();
        setDescription(event.currentTarget.value);
        console.log(event.currentTarget.value);
    }
    return (
        <center style={{ backgroundColor: 'gray' }}>
            <label>
            Description:
           <textarea
                value={description}
                style={{ width: 300, height:100 }}
                placeholder="Describe report"
                onChange={handleChange}
            ></textarea>
        </label>
        </center>
    );
}
export default Description;