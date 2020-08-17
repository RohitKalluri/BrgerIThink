import React,{Component} from 'react';
import { withRouter,Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
const queryString = require('query-string');

class Checkout extends Component {

    state = {
        ingridients : {
            salad : 1,
            meat:1 ,
            cheese :1 ,
            bacon :1
        },
        totalPrice:0
    }


    async componentWillMount() {
        const query = queryString.parse(this.props.location.search);
        const ingri={};
        let price=0;
        for (var key in query){
            var attrName = key;
            var attrValue = query[key];
            if(attrName==='price'){
                price=attrValue;
            }else{
                ingri[attrName]=attrValue;
            }
            
        }
       await this.setState({ingridients:ingri,totalPrice:price});
      //  console.log(this.state.ingridients);
   
    }

    checkoutCancelledHandler = () => { 
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
       
        

        return (
            <div>
                <CheckoutSummary ingri={this.state.ingridients} onCheckoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path+'/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingridients} price={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }
}

export default withRouter(Checkout);