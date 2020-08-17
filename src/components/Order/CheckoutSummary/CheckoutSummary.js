import React,{Component} from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

class checkoutSummary extends Component{

    render() {

        return(
            <div className={classes.CheckoutSummary}>
            <h1><strong>We hope It Tastes Well!!!</strong></h1>
            <div style={{
                width:'100%',
                margin:'auto',
                marginTop:'100px'
            }}>
                <Burger ingridients={this.props.ingri} />
            </div>
            <div style={{
                marginTop:'70px'
            }}>
            <Button btnType="Danger" clicked={this.props.onCheckoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.checkoutContinued}>CONTINUE</Button>
            <div style={{
                color:'red'
            }}>
                <h3>(Scroll down after clicking Continue)</h3>
            </div>
            </div>
        </div>
        );
    }
} 

export default checkoutSummary;