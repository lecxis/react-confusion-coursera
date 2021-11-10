import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dish from './DishdetailComponent';
import Header from'./HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';


class  Main extends Component {
  constructor(props){
    super(props)
    this.state={
      dishes:DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
//      selectedDish:null
    };
  }

  onDishSelect(dishId){
    this.setState({selectedDish:dishId});
    console.log(dishId);
  }

  render(){
    const HomePage = () => {
      return(
          <Home 
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
  return (
    <div >
        <Header/>
        <Switch>
          <Route path='/home'component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path='/contactus' component={Contact} />} />
          <Redirect to="/home" />
        </Switch>
        {/*<Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
       <Dish dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}/>*/}
        <Footer/>
    </div>
  );
}
}
export default Main;
