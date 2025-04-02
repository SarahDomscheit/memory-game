import React from 'react'
import "../components/CardCreater/CardCreater.css"
import "./PreviewCard.css"

export default function PreviewCard({option, setFetchPicUrl}) {
  return (
    <div className={`card`} onClick={setFetchPicUrl(option.value)}>
    <div className={`card-inner`}>
    <div
        className={`card-front blue` }
      ></div>
      <div className="card-front icon" style={{backgroundImage: `url(${option.logo})` }}></div>
    </div>
  </div>
  )
}
