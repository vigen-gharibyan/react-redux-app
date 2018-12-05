import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table
} from 'reactstrap';

import {userActions} from '../../../../actions';

//todo
const defaultProfileImg = '/assets/img/users/default-profile.png';

class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {
        username: '',
        email: '',
        role: {
          name: ''
        },
        status: {
          name: ''
        },
        created_at: ''
      }
    }
  }

  componentDidMount() {
    const {id} = this.state;
    this.props.dispatch(userActions.get(id));
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;

    if (user) {
      this.setState({user});
    }
  }

  render() {
    const {user} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" md="8" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-user"></i> <strong>User details</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="4">
                    <div className="profile-img-container">
                      <img src={ user.photo || defaultProfileImg }
                           className=""/>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <dl className="row">
                      <dt className="col-sm-3">Username:</dt>
                      <dd className="col-sm-9">{user.username}</dd>

                      <dt className="col-sm-3">Email:</dt>
                      <dd className="col-sm-9">{user.email}</dd>

                      <dt className="col-sm-3">Role:</dt>
                      <dd className="col-sm-9">{user.role.name}</dd>

                      <dt className="col-sm-3">Status:</dt>
                      <dd className="col-sm-9">{user.status.name}</dd>

                      <dt className="col-sm-3">Registered:</dt>
                      <dd className="col-sm-9">{user.created_at}</dd>
                    </dl>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Link to={`/users/${user.id}/edit`}>
                  <Button size="sm" color="primary">
                    <i className="fa fa-edit"></i> Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {users} = state;
  const {user} = users;

  return {
    user
  };
}

export default connect(mapStateToProps)(User);
