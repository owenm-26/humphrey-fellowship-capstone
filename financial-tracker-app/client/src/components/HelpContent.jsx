import { Row, Col, Typography, Tag } from "antd";

function HelpContent({ currentView }) {
  return (
    <Row style={{ justifyContent: "center" }}>
      <Col
        style={{
          backgroundColor: "aliceblue",
          margin: 5,
        }}
        span={24}
      >
        {/* Dashboard Body */}{" "}
        <Typography.Title level={1} className="section-header">
          {" "}
          {currentView}
        </Typography.Title>
        {/* Top Row */}
        <Row style={{ justifyContent: "center", marginTop: "3%" }}>
          <Col
            span={7}
            style={{
              background: "#fff",
              minHeight: 280,
              borderRadius: 10,
              padding: "20px",
              margin: "10px",
              width: "calc(100% - 80px)",
            }}
          >
            <Typography.Title level={3} style={{ textDecoration: "underline" }}>
              How to Use App
            </Typography.Title>
            <Typography.Paragraph
              style={{
                fontSize: "medium",
                textAlign: "left",
                marginLeft: "1vw",
                marginRight: "1vw",
              }}
            >
              <b>
                Add an item to your{" "}
                <Tag style={{ fontSize: "medium" }}>Inventory</Tag>
              </b>
              <br />
              automatically creates corresponding expense
              <br />
              <br />
              <b>
                Create a sale from your Inventory in{" "}
                <Tag style={{ fontSize: "medium" }}>Sales</Tag>{" "}
              </b>
              <br />
              Doing so subtracts the amount of item sold from the inventory
              <br />
              <br />
              <b>
                Add an expense unrelated to inventory in
                <Tag style={{ fontSize: "medium" }}>Expenses</Tag>
                <br />
              </b>
            </Typography.Paragraph>
          </Col>
          <Col
            span={7}
            style={{
              background: "#fff",
              minHeight: 280,
              borderRadius: 10,
              padding: "20px",
              margin: "10px",
              width: "calc(100% - 80px)",
            }}
          >
            <Typography.Title level={3} style={{ textDecoration: "underline" }}>
              Understanding Financial Planning
            </Typography.Title>
            <Typography.Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography.Paragraph>
          </Col>
          <Col
            span={7}
            style={{
              background: "#fff",
              minHeight: 280,
              borderRadius: 10,
              padding: "20px",
              margin: "10px",
              width: "calc(100% - 80px)",
            }}
          >
            <Typography.Title level={3} style={{ textDecoration: "underline" }}>
              Understanding Managing Risk
            </Typography.Title>
            <Typography.Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography.Paragraph>
          </Col>
        </Row>
        {/* Bottom Row */}
        <Row style={{ justifyContent: "center", marginTop: "3%" }}>
          <Col
            span={11}
            style={{
              background: "#fff",
              minHeight: 280,
              borderRadius: 10,
              padding: "20px",
              margin: "10px",
              width: "calc(100% - 80px)",
            }}
          >
            <Typography.Title level={3} style={{ textDecoration: "underline" }}>
              Strategies to grow your business
            </Typography.Title>
            <Typography.Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography.Paragraph>
          </Col>
          <Col
            span={11}
            style={{
              background: "#fff",
              minHeight: 280,
              borderRadius: 10,
              padding: "20px",
              margin: "10px",
              width: "calc(100% - 80px)",
            }}
          >
            <Typography.Title level={3} style={{ textDecoration: "underline" }}>
              Benefits of operating a business account
            </Typography.Title>
            <Typography.Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography.Paragraph>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default HelpContent;
