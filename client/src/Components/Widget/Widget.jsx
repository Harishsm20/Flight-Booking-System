import React from 'react';
import Card from "../card";
import "../../DisplayAirline.css";

const Widget = ({ icon, title, subtitle }) => {
    return (
      <Card extra="!flex-row flex-grow items-center rounded-[20px]">
        <div className="ml-[18px]">
          {icon}
        </div>
  
        <div className="ml-4 flex flex-col justify-center">
          <p className="font-dm text-sm font-medium text-gray-600 widget-title">{title}</p>
          <h6 className="text-xl font-bold text-navy-700 dark:text-white mt-1 text-sm widget-subtitle">
            {subtitle}
          </h6>
        </div>
      </Card>
    );
  };
  
  export default Widget;