import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Spin as Loader } from 'antd';
import { compose } from '@gqlapp/core-common';

import USER_QUERY from '@gqlapp/user-client-react/graphql/UserQuery.graphql';
// import CURRENT_USER_QUERY from '../graphql/CurrentUserQuery.graphql';
import PublicProfileView from '../components/PublicProfileView';

const PublicProfile = props => {
  console.log('public profile', props);
  return <>{props.userloading ? <Loader /> : <PublicProfileView {...props} />}</>;
};

PublicProfile.propTypes = {
  user: PropTypes.object
  // shape({
  //   id: PropTypes.number,
  //   role: PropTypes.string,
  //   isActive: PropTypes.bool,
  //   createdAt: PropTypes.string,
  //   updatedAt: PropTypes.string,
  //   profile: PropTypes.shape({
  //     firstName: PropTypes.string,
  //     lastName: PropTypes.string
  //   })
  // })
};

export default compose(
  // graphql(CURRENT_USER_QUERY, {
  //   props({ data: { loading, error, currentUser } }) {
  //     if (error) throw new Error(error);
  //     return { currentUserLoading: loading, currentUser };
  //   }
  // }),
  graphql(USER_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, user, refetch } }) {
      return {
        userloading: loading,
        user,
        refetch
      };
    }
  })
)(PublicProfile);
