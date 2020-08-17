import React from 'react';
import classes from './Order.css';
const order = (props) => {

    const ings =[];
    for(let ingName in props.ings){
        ings.push({name:ingName,amount:props.ings[ingName]});
    }

    const ingOutput=ings.map(ig => {
    return <span key={ig.name} style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px',border:'1px solid #ccc',padding:'5px'}}>{ig.name} ({ig.amount})</span>
    });

    return(
        <div className={classes.Order}>
        <p>Ingredients : {ingOutput}</p>
        <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)} (USD)</strong></p>
    </div>
    );
}
    

export default order