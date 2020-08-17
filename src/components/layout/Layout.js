import React , {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

class Layout extends Component {

    state = {
        showSideDrawer:false
    };

    sideDrawerColsedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }

    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}/>
                <SideDrawer closed={this.sideDrawerColsedHandler} open={this.state.showSideDrawer} isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.token !==null
    };
};

export default connect(mapStateToProps)(Layout);
