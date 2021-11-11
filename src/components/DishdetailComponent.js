import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';
/* componentDidMount(){
        console.log('Dishdetailed component didmount invoked');
      }
      componentDidUpdate(){
        console.log('Dishdetailed component didUpdate');
      }*/
function RenderDish({ dish }) {
  console.log("Dishdetailed component render invoked");
  if (dish)
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
}
function RenderComments({ comment }) {
  if (comment.length >= 1) {
    let comm = comment.map((comment) => {
      //let dat= new Date().toDateString();
      return (
        <div key={comment.id}>
          <p>{comment.comment} </p>
          <p>
            --{comment.author},{" "}
            {
              new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(
                new Date(Date.parse(comment.date))
              ) /*new Date(comment.date).toDateString()*/
            }{" "}
          </p>
        </div>
      );
    });
    return (
      <div>
        <h4> Comments</h4>
        {comm}
      </div>
    );
  } else return <div></div>;
}

function Dish(props) {
  const dish = props.dish;
  if (dish)
    return (
      <div className="container">
        <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish}/></div>

        <div className="col-12 col-md-5 m-1">
          <div>
            <ul className="list-unstyled">
              <RenderComments comment={props.comments}/>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
  else return (<div> </div>);
}

export default Dish;
