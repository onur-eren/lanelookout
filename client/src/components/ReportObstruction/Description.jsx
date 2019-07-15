import React from "react";

function Description({ setDescription }) {

    const handleChange = (event) => {
        setDescription(event.currentTarget.value);
    }
    const Element = () => {
        return <label>
            Description:
           <textarea
                style={{ width: 300, height:100 }}
                placeholder="Describe report"
                onChange={handleChange}
            ></textarea>
        </label>
    }
    return (
        <center style={{ backgroundColor: 'gray' }}>
            <Element/>
        </center>
    );
}
export default Description;