import React from 'react';
import {
    ChevronDoubleDownIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronDoubleUpIcon
} from '@heroicons/react/24/solid'
import {DIRECTIONS} from "../../constants/directions";

const DirectionsButtons = {
    [DIRECTIONS.RIGHT]: (
        <ChevronDoubleRightIcon className="text-amber-50"/>
    ),
    [DIRECTIONS.LEFT]: (
        <ChevronDoubleLeftIcon className="text-amber-50"/>
    ),
    [DIRECTIONS.UP]: (
        <ChevronDoubleUpIcon className="text-amber-50"/>
    ),
    [DIRECTIONS.DOWN]: (
        <ChevronDoubleDownIcon className="text-amber-50"/>
    ),
}

const DoubleArrowButton = (props) => {
    const {
        direction = DIRECTIONS.RIGHT, width = 100, height = 30, onClick = () => {}, label,
    } = props;
    let className = 'flex';
    // className = className.concat(`${width} ${height}`)

    return (
        <div>
            <button onClick={onClick}
                // className={className}
                    className="border-4 border-amber-50 rounded-md h-20 w-32 dark:bg-cyan-800 hover:dark:bg-cyan-700 duration-75
                flex justify-center items-center p-5 shadow-lg hover:shadow-cyan-500/50">
                {DirectionsButtons[direction]}
            </button>
            {label && (
                <h3 className="text-amber-50 font-thin text-sm pt-2 inline-block w-32 break-words">
                    {label}
                </h3>
            )}
        </div>
    );
};

export default DoubleArrowButton;
