import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Modal, ModalHeader, ModalBody, Label, Button, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
 
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

/* componentDidMount(){
        console.log('Dishdetailed component didmount invoked');
      }
      componentDidUpdate(){
        console.log('Dishdetailed component didUpdate');
      }*/

     
      class CommentForm extends Component{

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
            this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
            // alert('Current State is: ' + JSON.stringify(values));
            //event.preventDefault();
        }
        
        
        render(){
          
          return(
            <div>
            <button onClick={this.toggleModal}  className= "btn btn-outline-dark"><span><i className="fa fa-pencil" aria-hidden="true"></i> </span>Submit Comment</button> 
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
            </div>
          )
        }

      }

function RenderDish({ dish }) {
  console.log("Dishdetailed component render invoked");
  if (dish)
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
}
function RenderComments({ comment, addComment, dishId }) {
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
        <CommentForm dishId={dishId} addComment={addComment}/>

      </div>
    );
  } else return <div></div>;
}

function Dish (props) {
  if (props.isLoading){
    return(
      <div className="container">
      <div className="row">            
          <Loading />
      </div>
  </div>
    );
  }
  else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
  //console.log(props)
  else if (props.dish)
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
            <RenderDish dish={props.dish}/></div>

        <div className="col-12 col-md-5 m-1">
          <div>
            <ul className="list-unstyled">
              <RenderComments comment={props.comments}
               addComment={props.addComment}
               dishId={props.dish.id}/>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
  else return (<div> </div>);

}

export default Dish;
