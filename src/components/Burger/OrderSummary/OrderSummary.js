import React,{Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // componentWillUpdate() {
    //     console.log('Component will update!!!');
    // }

    render() {

        const ingridientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
        });


        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious Burger with the following ingredients :-</p>
                <ul>
                    {ingridientSummary}
                </ul>
                <p><strong>Total Price :  {this.props.price.toFixed(2)}</strong> (In USD)</p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
