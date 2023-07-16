import React, { useState, useEffect } from 'react';
import data from '../api/data.json';
import './Store.css';


const Store = ({ cookie, setCookie, cookiePerSecond, setCookiePerSecond }) => {
    const [buildings, setBuildings] = useState(data.buildings);

    // her saniye yapılan hesaplamalarla cookie miktarını ve saniyede üretilen miktarı güncellemek için kullanılır    
    useEffect(() => {
 

        const interval = setInterval(() => {
            let totalCookiePerSecond = 0;
            buildings.forEach((building) => {
                const { id, cps } = building;
                const currentBuilding = buildings.find((b) => b.id === id);
                totalCookiePerSecond += cps * currentBuilding.current;
            });
            setCookie(cookie + totalCookiePerSecond);
            setCookiePerSecond(totalCookiePerSecond);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [cookie, setCookie, setCookiePerSecond, buildings]);
    //




    // verilen sayıya bağlı olarak sayıyı milyonlar veya milyarlar şeklinde temsil eder.
    const formatNumber = (number) => {
        if (number >= 1000000000) {
            return (number / 1000000000).toFixed(3) + ' billion';
        } else if (number >= 1000000) {
            return (number / 1000000).toFixed(3) + ' million';
        }
        return number.toLocaleString();
    };
    //   


    // bir build'i satın alma işlemini gerçekleştirmek ve ilgili durumları güncellemek için kullanılır


const handleClick = (id, price) => {
  if (cookie >= price) {
    const updatedBuildings = buildings.map(building => {
      if (building.id === id) {
        const newCurrent = building.current + 1;
        const newPrice = Math.ceil(building.firstPrice * Math.pow(1.15, newCurrent));
        console.log(newCurrent, newPrice)

        return {
          ...building,
          price: newPrice,
          current: newCurrent,
          isOwned: true
        };
      }

      return building;
    });

    setBuildings(updatedBuildings);
    setCookie(prevCookie => prevCookie - price);
  }
};
//


return (
    <div>

        {/* cookie ve cookiePerSecond değerlerini ekranda görüntülemek için kullanılır */}
        <div className='cookei-container'>
            <p className='cookie'>Cookie: {formatNumber(cookie)}</p>
            <p className='cookie-per-second'>Cookie per Second: {formatNumber(cookiePerSecond)}</p>
        </div>



        {/* buildings dizisindeki her bir öğe için bir buton oluşturan bir döngüdür. Her bir buton, building nesnesinin özelliklerini kullanarak oluşturulur */}
        {buildings.map(building => (
            <button
                disabled={building.price !== cookie && cookie < building.price}
                className={`building-container building-list ${building.price === cookie || cookie >= building.price ? '' : 'disabled'}`}
                key={building.id}
                onClick={() => handleClick(building.id, building.price)}>
                <div className='building-item'>{building.isOwned && building.name} {building.isOwned && formatNumber(building.cps)}</div>
                <div className='building-item'>{!building.isOwned && "???"}</div>
                <div className='price'>Price:  {formatNumber(building.price)}</div>
                <div className="building-details">Current: {building.current}</div>
            </button>
        ))}
    </div>
);
}

export default Store;
