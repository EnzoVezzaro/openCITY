import React from 'react';
import PropTypes from 'prop-types';

import { 
    Container,
    Row,
    Col
} from '../../../components';
import { HeaderMain } from "../../components/HeaderMain";
import CandidatesList from './CandidatesList';
import CandidatesGrid from './CandidatesGrid';
import { UsersLeftNav } from "../../components/Users/UsersLeftNav";
import { ProjectsSmHeader } from "../../components/Projects/ProjectsSmHeader";

const Candidates = (props) => (
    <React.Fragment>
        <Container>
            <HeaderMain 
                title="Candidates"
                className="mb-5 mt-4"
            />
            <Row>
                <Col lg={ 3 }>
                    <UsersLeftNav />
                </Col>
                <Col lg={ 9 }>
                    <ProjectsSmHeader 
                        subTitle={props.match.params.type === "list"?"Users List":"Users Grid"}
                        linkList="/apps/candidates/list"
                        linkGrid="/apps/candidates/grid"
                    />

                    { 
                        props.match.params.type === "list" ?
                            <CandidatesList /> :
                            <CandidatesGrid />
                    }
                </Col>
            </Row>
        </Container>
    </React.Fragment>
);
Candidates.propTypes = {
    match: PropTypes.object.isRequired
};


export default Candidates;