import { useState } from "react";
import { watchlist } from "../data/data";
import DoughnutChart from "./DoughnutChart";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import { Grow } from '@mui/material';
import { BarChartOutlined, MoreHoriz, Spa } from "@mui/icons-material";

 const labels = watchlist.map((subary) => subary["name"])

const WatchList = () => {
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };



  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length}/ 50</span>
      </div>

      <ul className="list">
          {watchlist.map( (stock, index )=> { 
            return (
            <WatchListItems  stock={stock} index={index}/>
            )
          })}
      </ul> 
      <DoughnutChart data={data}/> 
    </div>
  );
};

export default WatchList;

const  WatchListItems = ({stock}) => {
  const [ showWatchlistActions , setShowWatchlistActions ]  = useState(false);
  
    const handleMouseEnter = () => { 
      setShowWatchlistActions(true)
    }

     const handleMouseLeave  = () => { 
      setShowWatchlistActions(false)
    }


    return(
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="item">
            <p className= { stock.isDown ? "down" : "up" } > {stock.name}  </p>
             <div className="item-info">
             <span className="percent">{stock.percent}</span>
              <span> {stock.isDown ? ( <KeyboardArrowDownIcon className="down"/>) : ( <KeyboardArrowUpIcon  className="up" />)}</span>
             <span className="price">{stock.price}</span>
             </div>
          </div>
        { showWatchlistActions && < WatchListActions uid={stock.name}/>}

        </li>
    )
} 


const  WatchListActions= ( {uid}) => {
   return(
     <span className=" actions ">
      <span>
        <Tooltip 
         title="Buy (B)"
         placement="top"
         arrow
         slots={{ transition: Grow }}
        >
           <button className="buy" >Buy</button>
        </Tooltip>
      </span>    

    
      <span>
        <Tooltip 
         title="Sell (s)"
         placement="top"
         arrow
         slots={{ transition: Grow }}
        >
           <button className="sell" >Sell</button>
        </Tooltip>
      </span>   

      <span>
        <Tooltip 
         title="analytica (A)"
         placement="top"
         arrow
         slots={{ transition: Grow }}
        >
          <button className="action">
           <BarChartOutlined className="icon"/>
           </button>
        </Tooltip>
      </span>   

      <span>
        <Tooltip 
         title="More "
         placement="top"
         arrow
         slots={{ transition: Grow }}
        >
          <button className="action">
           <MoreHoriz className="icon"/>
           </button>
        </Tooltip>
      </span>   

     </span>
   )
}



















// const WatchListActions = ({ uid }) => {
//   // Placeholder for actions
//   return (
//     <span className="actions">
//       <span>
//         <button className="buy">Buy</button>
//         <button className="sell">Sell</button>
//         <button className="action">Action</button>
//       </span>
//     </span>
//   );
// };

// const WatchListItem = ({ stock }) => {
//   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

//   const handleMouseEnter = (e) => {
//     setShowWatchlistActions(true);
//   };

//   const handleMouseLeave = (e) => {
//     setShowWatchlistActions(false);
//   };

//   return (
//     <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className="item">
//         <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
//         <div className="itemInfo">
//           <span className="percent">{stock.percent}</span>
//           {stock.isDown ? (
//             <KeyboardArrowDown className="down" />
//           ) : (
//             <KeyboardArrowUp className="down" />
//           )}
//           <span className="price">{stock.price}</span>
//         </div>
//       </div>
//       {showWatchlistActions && <WatchListActions uid={stock.name} />}
//     </li>
//   );
// };

// const WatchListActions = ({ uid }) => {
//   const generalContext = useContext(GeneralContext);

//   const handleBuyClick = () => {
//     generalContext.openBuyWindow(uid);
//   };

//   return (
//     <span className="actions">
//       <span>
//         <Tooltip
//           title="Buy (B)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//           onClick={handleBuyClick}
//         >
//           <button className="buy">Buy</button>
//         </Tooltip>
//         <Tooltip
//           title="Sell (S)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//         >
//           <button className="sell">Sell</button>
//         </Tooltip>
//         <Tooltip
//           title="Analytics (A)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//         >
//           <button className="action">
//             <BarChartOutlined className="icon" />
//           </button>
//         </Tooltip>
//         <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
//           <button className="action">
//             <MoreHoriz className="icon" />
//           </button>
//         </Tooltip>
//       </span>
//     </span>
//   );
// };
