"use client";

import { useEffect } from "react";

export default function MouseTrailer() {
	useEffect(() => {
		const blob = document.getElementById("blob");

		if (!blob) return;

		document.body.onpointermove = (event) => {
			const { clientX, clientY } = event;

			blob.animate(
				{
					left: `${clientX}px`,
					top: `${clientY}px`,
				},
				{ duration: 3000, fill: "forwards" }
			);
		};
	}, []);

	return (
        <>
            <div id="blob" className="bg-white m-0 p-0 h-[100px] aspect-[1/1] fixed z-[-2] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#74eef3] to-[#925dc9] animate-rotate"></div>
            <div id="blur" className="h-full w-full fixed z-[-1] backdrop-blur-[200px]"></div>
        </>
    );
}
