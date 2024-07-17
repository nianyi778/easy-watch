import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";

import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      locale={locale}
      theme={{
        // components: {
        //   Card: {
        //     actionsBg: "#000000",
        //     extraColor: "#cccccc",
        //     headerHeight: 32,
        //     actionsLiMargin: '6px 0'
        //   }
        // }
        // token: {
        // fontFamily: "'LXGW WenKai Screen',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
        // },
      }}
    >

      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
