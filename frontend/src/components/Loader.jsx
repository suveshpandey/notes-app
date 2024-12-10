import React, { useEffect, useState } from "react";

import { VscVerifiedFilled } from "react-icons/vsc";

const LoadingBar = ({message}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setProgress((prevProgress) => {
            const nextProgress = prevProgress + 1;
            if (nextProgress >= 100) {
            clearInterval(interval);
            return 100; // Ensure it stops at 100%
            }
            return nextProgress;
        });
        }, 40); // 3000ms / 100 steps = 30ms per step

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[250px] absolute top-20 right-10">
            <div className="w-[100%] py-3 px-3 bg-green-100 rounded-t-md "> 
                <h1 className="text-lg text-slate-700 flex items-center"><VscVerifiedFilled className="size-6 mr-1 text-green-500" /> {message || "Done ✔"}</h1>
            </div>
            <div className=" h-1 w-[100%] rounded-b-md bg-green-500 overflow-hidden shadow-md ">
                <div
                className="h-full bg-green-100 w-[99%] transition-transform duration-75"
                style={{ transform: `translateX(${100 - progress}%)`, width: '100%' }}>
                </div>
            </div>
        </div>
    );
};

export default LoadingBar;
