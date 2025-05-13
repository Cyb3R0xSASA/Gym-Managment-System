import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

const Accordion = ({ panels = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const togglePanel = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
        {panels.map((panel, index) => {
            const isOpen = activeIndex === index;

            return (
            <div
                key={index}
                className="bg-white rounded-[15px] card-shadow overflow-hidden transition-all duration-300"
            >
                <button
                onClick={() => togglePanel(index)}
                className="w-full flex items-center justify-between gap-4 text-right p-[30px] large-text font-medium text-[#1A183F] transition-colors"
                >
                <span className="flex-1">{panel.label}</span>
                <span className={`min-w-[30px] min-h-[30px] cursor-pointer flex items-center justify-center rounded-[8px] ${isOpen ? ' btn-gradient' : `bg-[#1A183F]/10`} text-white`}>
                    {isOpen ? (
                    <Minus className="w-7 h-7" />
                    ) : (
                    <Plus className="w-7 h-7 text-[#1A183F]" />
                    )}
                </span>
                </button>
                <div
                className={`px-[30px] transition-all duration-300 text-[#777777] normal-text leading-relaxed ${
                    isOpen ? "max-h-[400px] pb-[20px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
                >
                {panel.content}
                </div>
            </div>
            );
        })}
        </div>
    );
};

export default Accordion;
