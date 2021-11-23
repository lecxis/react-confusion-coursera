import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Modal, ModalHeader, ModalBody, Label, Button, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

/* componentDidMount(){
        console.log('Dishdetailed component didmount invoked');
      }
      componentDidUpdate(){
        console.log('Dishdetailed component didUpdate');
      }*/

     
      function CommentForm ({food}){
        return(<button onClick={food.toggleModal} className= "btn btn-outline-dark"><span><i className="fa fa-pencil" aria-hidden="true"></i> </span>Submit Comment</button> );
      }

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

class Dish extends Component {
  constructor(props){
    super(props)
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
      isModalOpen: false
    }
  } 

 toggleModal() {
  this.setState({
    isModalOpen: !this.state.isModalOpen
  });
   }
   handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    //event.preventDefault();
}

render(){
  const dish = this.props.dish;
  console.log(this.props)
  if (dish)
    return (
      <div className="container">
        <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
      <div className="row">
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <div className="col-12 ">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="contactType">Rating</Label>
                        <Control.select model=".rating" name="rating"
                                           className= "form-control"  >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="username">Username</Label>
                                <Control.text model=".name" id="name" name="name"
                                        placeholder="Full Name"
                                        className="form-control"
                                        validators={{
                                          required, minLength: minLength(3), maxLength: maxLength(15)
                                      }}
                                       />
                                  <Errors
                                      className="text-danger"
                                      model=".name"
                                      show="touched"
                                      messages={{
                                          required: 'Required',
                                          minLength: 'Must be greater than 2 characters',
                                          maxLength: 'Must be 15 characters or less'
                                      }}
                                   />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" >Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className= "form-control"
                                     />
                            </Row>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </LocalForm>
                        </div>
                      </ModalBody>
      </Modal>                
          
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish}/></div>

        <div className="col-12 col-md-5 m-1">
          <div>
            <ul className="list-unstyled">
              <RenderComments comment={this.props.comments}/>
            </ul>
          </div>
          <CommentForm food={this}/>
        </div>
      </div>
      </div>
    );
  else return (<div> </div>);
  
}

}

export default Dish;
