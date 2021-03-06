import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux'

const INGRIDIENT_PRICES ={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

class BurgerBuilder extends Component{



    state = {
        ingridients : null,
        totalPrice : 4,
        purchasable:false,
        purchasing :false,
        loading:false,
        error:false
    };

    componentDidMount() {
        axios.get('https://react-my-burger-cb079.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingridients:response.data});
        }).catch(error => {
            this.setState({error:true});
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el) => {
                        return sum+el;
                    },0);
        this.setState({purchasable:sum>0});
    }

    addIngridientHandler = (type) => {
        const oldCount=this.state.ingridients[type];
        const updatedCount=oldCount+1;
        const updatedIngridients={
            ...this.state.ingridients
        };
        updatedIngridients[type]=updatedCount;
        const priceAddition=INGRIDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({
            totalPrice:newPrice,
            ingridients:updatedIngridients
        });
        this.updatePurchaseState(updatedIngridients);
    }

    removeIngridientHandler = (type) => {
        const oldCount=this.state.ingridients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount=oldCount-1;
        const updatedIngridients={
            ...this.state.ingridients
        };
        updatedIngridients[type]=updatedCount;
        const priceDeduction=INGRIDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({
            totalPrice:newPrice,
            ingridients:updatedIngridients
        });
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseHandler=() => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }
        else{
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        
        const queryParams = [];

        for(let i in this.state.ingridients) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingridients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');


        this.props.history.push({
            pathname : '/checkout',
            customNameData: this.state.ingridients,
            search : '?'+queryString
        });
    }

    render() {
        const disabledInfo={
            ...this.state.ingridients
        }

        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        let orderSummary=null;
        let burger=this.state.error ? <p><strong>Ingredients can't be loaded!!!</strong></p> : <Spinner />;

        if(this.state.ingridients){
            burger = (  <Aux>
                <Burger ingridients={this.state.ingridients}/>
                    <BuildControls 
                    ingridientAdded={this.addIngridientHandler}
                    ingridientRemoved={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    isAuth={this.props.isAuthenticated}
                    />
                </Aux>
                );
                orderSummary =  <OrderSummary ingredients={this.state.ingridients} purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} price={this.state.totalPrice}/>
        }
        
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps=state => {
    return {
        isAuthenticated:state.auth.token!==null
    };
}

export default connect(mapStateToProps)(withErrorHandler(BurgerBuilder,axios));