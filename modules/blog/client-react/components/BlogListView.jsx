import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
// import { message } from 'antd';
import BlogListComponent from './BlogListComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const BlogListView = props => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <PageLayout>
      {renderMetaData(props.t)}
      {flag && !props.loading ? <BlogListComponent {...props} /> : <Loading />}
    </PageLayout>
  );
};
BlogListView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool
};

export default BlogListView;
