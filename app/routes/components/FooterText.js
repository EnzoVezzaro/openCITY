import React from 'react';
import PropTypes from 'prop-types';

const FooterText = (props) => (
	<React.Fragment>
		{
			/* 
		(C) { props.year } All Rights Reserved. 
		Built with ❤️  by { props.name }	
			*/
		}
	</React.Fragment>
)
FooterText.propTypes = {
    year: PropTypes.node,
	name: PropTypes.node,
	desc: PropTypes.node,
};
FooterText.defaultProps = {
    year: "2020",
    name: "OpenCity Team",
    desc: ""
};

export { FooterText };
