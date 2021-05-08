import React, { useState } from 'react';
import "./Change_Color.scss";

Change_Color.propTypes = {
    // su dung use state
};
function getRandomColor() {
    const COLOR_LIST = ['Brown', 'BlanchedAlmond', 'Coral', 'DarkBlue', 'CornflowerBlue', 'AliceBlue', 'Aqua', 'Aquamarine']

    const randomIndex = Math.trunc(Math.random() * COLOR_LIST.length)
    //math.trunc: lay phan nguyen
    return COLOR_LIST[randomIndex];
}
function Change_Color(props) {
    // const initColor = localStorage.getItem('box_color') || 'Brown'
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'Brown';
        return initColor
    })
    function handleBoxClick() {
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color', newColor)
    }

    return (

        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
            COLOR
        </div>
    );
}

export default Change_Color;
