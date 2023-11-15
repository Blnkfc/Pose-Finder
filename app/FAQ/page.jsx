'use client'
import { useStore } from "@/src/store";
import { useState } from "react";

const useExpandState = () => {
    const [expand, setExpand] = useState(false);

    const toggleExpand = () => {
        setExpand((prevExpand) => !prevExpand);
    };

    return [expand, toggleExpand];
};

const FAQItem = ({ title, description }) => {
    const [expand, toggleExpand] = useExpandState();

    return (
        <div className={"FAQ__item"} onClick={toggleExpand}>
            <div
                className="FAQ__item__title"
                style={{ backgroundColor: expand ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}
            >
                {title}
                <span style={{ transform: expand ? "rotate(90deg)" : "rotate(-90deg)" }}> &#8249; </span>
            </div>
            <div className="FAQ__item__description" style={{ display: expand ? "flex" : "none" }}>
                {description}
            </div>
        </div>
    );
};

const FAQ = () => {
    const FAQData = useStore((state) => state.FAQList);

    const FQAList = FAQData.map((E, index) => (
        <FAQItem key={index} title={E.title} description={E.description} />
    ));

    return <div className={"FAQ"}>{FQAList}</div>;
};

export default FAQ;
