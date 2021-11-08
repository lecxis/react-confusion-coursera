import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        console.log('menu component constructor invoked')
    }
    componentDidMount(){
      console.log('menu component didmount invoked');
    }
    render(){
        const menu= this.props.dishes.map((dish) => {
          return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
              <Card onClick={() => this.props.onClick(dish.id)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                  <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
          );
      });
      console.log('menu component render invoked');
        return (
            <div className="container">
              <div className="row">
                    {menu}
            </div>
                    {/*this.renderDish(this.state.selectedDish)*/}
            </div>
          );
         
    }
}

export default Menu;