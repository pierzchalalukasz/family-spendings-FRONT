import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFamily } from '../../actions/familyActions';
import Navbar from '../../components/Navbar/Navbar';
import AddFundForm from '../../components/AddFundForm/AddFundForm';

class AddFundPage extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-shadow
    const { getFamily, familyId } = this.props;

    getFamily(familyId);
  }

  render() {
    return (
      <div style={{ marginTop: '64px' }}>
        <Navbar />
        <AddFundForm />
      </div>
    );
  }
}

AddFundPage.propTypes = {
  getFamily: PropTypes.func.isRequired,
  familyId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  familyId: state.auth.user.familyId,
});

export default connect(mapStateToProps, { getFamily })(AddFundPage);
