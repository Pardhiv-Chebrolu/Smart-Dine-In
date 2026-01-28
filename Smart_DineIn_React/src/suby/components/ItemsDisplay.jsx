import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { itemData } from '../data'

const ItemsDisplay = () => {
    const [displayItem, setDisplayItem] = useState(itemData)

  return (
        <div className="itemSection">
            {displayItem.map((item)=>{
                return(
                    <Link 
                        to={`/restaurants-by-item/${item.item_id}/${item.item_name}`}
                        key={item.item_id}
                        className="galleryLink"
                    >
                        <div className="gallery">
                            <img src={item.item_img} alt={item.item_name} />
                            <div className="itemOverlay">
                                <p className="itemName">{item.item_name}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
  )
}

export default ItemsDisplay