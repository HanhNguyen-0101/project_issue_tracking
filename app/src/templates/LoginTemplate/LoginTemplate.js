import { Layout } from "antd";
import { Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import LoadingComponent from "../../components/GlobalComponents/LoadingComponent";

const LoginTemplate = ({ Component, ...restParams }) => {
  const [{ width, height }, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Route
      {...restParams}
      render={(propsRoute) => (
        <div className="tracking">
          <LoadingComponent />
          <Layout className="flex-row">
            <Sider
              height={height}
              width={Math.round(width / 2)}
              style={{ backgroundImage: 'url("https://picsum.photos/200")' }}
            ></Sider>
            <Content
              style={{ height: height }}
              className="d-flex flex-column justify-content-center"
            >
              <div style={{ width: 450, margin: "auto" }}>
                <Component {...propsRoute} />
              </div>
            </Content>
          </Layout>
        </div>
      )}
    />
  );
};

export default LoginTemplate;
