import React from 'react';

function ProgressBar({ percentage }) {
    return (
        <div className="mb-6">
            <label className="block mb-2">Project Progress</label>
            <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600">
                            {percentage}% Completed
                        </span>
                    </div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full">
                        <div
                            className="bg-teal-500 text-xs font-medium text-teal-100 text-center p-0.5 leading-none rounded-l-full"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;
