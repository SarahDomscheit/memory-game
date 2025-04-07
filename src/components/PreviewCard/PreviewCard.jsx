import React from "react";
import "../CardCreater/CardCreater.css";
import "./PreviewCard.css";

export default function PreviewCard({ option, fetchPicUrl, setFetchPicUrl }) {
  // console.log(fetchPicUrl)
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`cardPreview rounded-lg ${
          fetchPicUrl.slice(0, 20) === option.value.slice(0, 20)
            ? `match transition-transform transform scale-105`
            : ""
        }`}
        onClick={() => setFetchPicUrl(option.value)}
      >
        <div className={`card-inner`}>
          <div className={`card-front blue`}></div>
          <div
            className="card-front icon"
            style={{ backgroundImage: `url(${option.logo})` }}
          ></div>{" "}
        </div>
      </div>
      <p className="text-xs text-center my-1 w-[100px] ">{option.name}</p>
    </div>
  );
}
