import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dish extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    renderDish(dish){
        if(dish)
       return( <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
</Card>)
    }
    renderComments(comment){
        if(comment.length>=1){
          let comm=  comment.map((comment)=>{
                //let dat= new Date().toDateString();
                return(
                    <div key ={comment.id}>
                        <p>{comment.comment} </p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))/*new Date(comment.date).toDateString()*/} </p>
                    </div>
            )       
        })
        return (
            <div>
                <h4> Comments</h4>
                {comm}
            </div>
        )
    }
    else return(
        <div></div>
    )
    }

    render(){
      const  dish=this.props.dish;
      console.log(this.props.dish)
       if (dish)
        return(
            <div className="row">
                <div className='col-12 col-md-5 m-1'>
           {this.renderDish(dish)}
            </div>

            <div className='col-12 col-md-5 m-1'>
                <div>
                <ul className = "list-unstyled">
                    {this.renderComments(dish.comments)}
                    </ul>
                </div>
            </div>

            </div>
        )
        else return null
    }
}
export default Dish;