import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';

import {Alert} from './alert/Alert';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="public-layout">
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="8">
                                <Alert />
                            </Col>
                        </Row>

                        {this.props.children}

                    </Container>
                </div>
            </div>
        );
    }
}


export {Layout as PublicLayout};
