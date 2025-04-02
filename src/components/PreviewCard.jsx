import React from 'react'
import "../components/CardCreater/CardCreater.css"
import "./PreviewCard.css"

export default function PreviewCard({option, fetchPicUrl, setFetchPicUrl}) {
    // console.log(fetchPicUrl)
  return (
    <div className={`card rounded-lg ${fetchPicUrl===option.value ? `match transition-transform transform scale-105`:""}`} onClick={() => setFetchPicUrl(option.value)}>
        
    <div className={`card-inner`}>
    <div
        className={`card-front blue` }
      ></div>
      <div className="card-front icon" style={{backgroundImage: `url(${option.logo})` }}></div>
    </div>
  </div>
  )
}

