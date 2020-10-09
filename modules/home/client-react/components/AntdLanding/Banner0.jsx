import React from "react";
import {
  Button,
  Icon,
  Select,
  Row,
  Col,
  Dropdown,
  Menu,
  Input,
  Card,
  Skeleton,
  Avatar,
} from "antd";
import { mapMarkerAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { isImg } from "./utils";

const { Option } = Select;
const { Meta } = Card;

const Banner00DataSource = {
  wrapper: { className: "banner0" },
  textWrapper: { className: "banner0-text-wrapper" },
  title: {
    className: "banner0-title",
    children:
      "https://res.cloudinary.com/www-lenshood-in/image/upload/v1580223483/nodejs-starterkit/untitled_4.svg",
  },
  content: {
    className: "banner0-content",
    children: "An All JavaScript Solution For Your App Needs",
  },
  button: { className: "banner0-button", children: "Learn More" },
};

const urlP =
  "https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name=";

class Banner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      searchParam: null,
      loading: false,
      data: null,
    };
  }

  setVisible = (param) => {
    this.setState({ visible: param });
  };

  onChange(value) {
    console.log(`selected ${value}`);
  }

  onBlur() {
    console.log("blur");
  }

  onFocus() {
    console.log("focus");
  }

  onSearch = async (val) => {
    console.log("search:", val);

    this.setState({ searchParam: val });
    // if (val.length > 2) {
    this.setState({ loading: true });
    this.getData();
    // }
  };

  getData = () => {
    const { searchParam } = this.state;
    fetch(urlP + searchParam + "&limit=5")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            data: result,
            loading: false,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        }
      );
  };
  render() {
    const { ...currentProps } = this.props;
    const { data, searchParam, loading, visible } = this.state;
    const dataSource = Banner00DataSource;
    delete currentProps.isMobile;

    // const dataP =  this.getData();
    console.log("dataP", searchParam, data, loading);

    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <QueueAnim
          key="QueueAnim"
          type={["bottom", "top"]}
          delay={200}
          {...dataSource.textWrapper}
        >
          {/* <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === 'string' && dataSource.title.children.match(isImg) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : (
              dataSource.title.children
            )}
          </div> */}
          <div key="content" className="banner0-title">
            Home away from Home
          </div>
          <br />
          <br />
          <br />
          <Row className="banner-select">
            <Col span={20}>
              <Dropdown
                placement="bottomCenter"
                visible={visible}
                overlay={
                  <Menu style={{ paddingBottom: "0" }}>
                    {loading ||
                    !searchParam ||
                    (searchParam && searchParam.length < 3) ||
                    !data ||
                    (data && !data.data) ||
                    (data &&
                      data.data &&
                      data.data.result &&
                      data.data.result.length == 0) ? (
                      [...Array(3).keys()].map((kk) => (
                        <Menu.Item key={kk}>
                          <Card
                            bordered={false}
                            style={{
                              borderRadius: "0",
                              borderBottom: "2px solid #f3f3f3",
                            }}
                            bodyStyle={{ padding: "10px" }}
                          >
                            <Meta
                              avatar={
                                <div style={{ padding: "10px" }}>
                                  <Avatar
                                    size={25}
                                    src="https://res.cloudinary.com/approxyma/image/upload/v1602229648/1479569_p9ehdf.svg"
                                  />
                                </div>
                              }
                              title={
                                <div style={{marginTop:'-15px'}}>
                                <Skeleton  active paragraph={{ rows: 1 }} /></div>
                              }
                            />
                          </Card>
                        </Menu.Item>
                      ))
                    ) : (
                      <>
                        {data.data.result.map((item, key) => (
                          <Menu.Item key={key}>
                            <Card
                              bordered={false}
                              style={{
                                borderRadius: "0",
                                borderBottom: "2px solid #f3f3f3",
                              }}
                              bodyStyle={{ padding: "10px" }}
                            >
                              <Meta
                                avatar={
                                  <div style={{ padding: "10px" }}>
                                    <Avatar
                                      size={25}
                                      src="https://res.cloudinary.com/approxyma/image/upload/v1602229648/1479569_p9ehdf.svg"
                                    />
                                  </div>
                                }
                                title={item.name}
                                description={
                                  <p style={{ marginTop: "-5px" }}>
                                    {item.secondary_name != ""
                                      ? item.secondary_name
                                      : item.region_type}
                                  </p>
                                }
                              />
                            </Card>
                          </Menu.Item>
                        ))}
                      </>
                    )}
                  </Menu>
                }
              >
                <Input
                  onFocus={() => {
                    this.setVisible(true);
                  }}
                  onBlur={() => {
                    this.setVisible(false);
                  }}
                  placeholder="input search text"
                  enterButton="Search"
                  size="large"
                  onChange={(e) => {
                    this.onSearch(e.target.value);
                  }}
                  // onSearch={value => console.log(value)}
                />
              </Dropdown>
              {/* <Select
              allowClear
              autoClearSearchValue={false}
                defaultValue={searchParam}
                showSearch
                enterButton="Search"
                style={{ width: "100%" }}
                placeholder="Select a person"
                // optionFilterProp="children"
                // onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                searchValue={}
                // filterOption={(input, option) =>
                //   option.props.children
                //     .toLowerCase()
                //     .indexOf(input.toLowerCase()) >= 0
                // }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select> */}
            </Col>
            <Col span={4}>
              <Button type="primary" block icon="search" />
            </Col>
          </Row>
        </QueueAnim>
        {/* <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className="banner0-icon"
          key="icon"
        >
          <Icon type="down" />
        </TweenOne> */}
      </div>
    );
  }
}
export default Banner;
