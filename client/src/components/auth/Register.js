import React, { Component } from 'react'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

 class Register extends Component {

  constructor(){
    super();
    this.state = {
      name: '',
      email : '',
      password: '',
      password2 : '',
      errors: {

      }
      
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  
componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/dashboard');
  }
}


  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser , this.props.history);
    //console.log(newUser);
    /*axios.post('/api/users/register', newUser)
          .then( res => {
           console.log(res.data) 
          })
          .catch(err => 
          this.setState({
            errors: err.response.data
          })  
          );
          */
  }
  render() {

    //this is same as const errors = this.state.errors
    const {errors}  = this.state;

    

    return (
      <div className="register">
      
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" 
              className={classnames('form-control form-control-lg' , {
                'is-invalid' : errors.name
              })} placeholder="Name"  
              value={this.state.name}
              onChange={this.onChange}
              name="name" />
              {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
            </div>
            <div className="form-group">
              <input type="email"
              className={classnames('form-control form-control-lg' , {
                'is-invalid' : errors.email
              })}
              placeholder="Email Address" 
              value={this.state.email}
              onChange={this.onChange}
              name="email" />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input type="password" 
              className={classnames('form-control form-control-lg' , {
                'is-invalid' : errors.password
              })}
              
              placeholder="Password" 
              value={this.state.password}
              onChange={this.onChange}
              name="password" />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div className="form-group">
              <input type="password" 
              className={classnames('form-control form-control-lg' , {
                'is-invalid' : errors.password2
              })}
              
              placeholder="Confirm Password" 
              value={this.state.password2}
              onChange={this.onChange}
              name="password2" />
              {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));