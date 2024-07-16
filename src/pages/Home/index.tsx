import { useCallback } from "react"
import { Space, Button } from "antd";
import { AntDesignOutlined } from '@ant-design/icons';
import { WebviewWindow } from '@tauri-apps/api/window';


export default function Home() {


    const onRuntime = useCallback(() => {
        const webview = new WebviewWindow("runTime", {
            url: "/runtime",
            decorations: false,
            title: "运行时数据监听",
            fullscreen: true,
        })
    }, [])

    return <div className=" flex items-center justify-center w-full bg-gradient-to-br from-purple-500 to-pink-500">
        <Space>
            <Button type="primary" size="large" icon={<AntDesignOutlined />} onClick={onRuntime} >
                运行时数据监听
            </Button>
            <Button type="primary" size="large" icon={<AntDesignOutlined />}>
                提前跑个分？
            </Button>
        </Space>
    </div>
}