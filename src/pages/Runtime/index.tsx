import { invoke } from "@tauri-apps/api/tauri";
import { BatteryData } from "@/types/monitor";
import { useEffect } from "react";

export default function Runtime() {

    useEffect(() => {
        const t = setInterval(() => {
            invoke<BatteryData>("cpu_info", {}).then(cpu => {
                console.log("cpu info", cpu);
            })
        }, 1000)

        return clearInterval(t);
    }, [])

    return <div className="w-full h-full relative">
        <iframe className=" w-full h-full " src="https://workspace.easyv.cloud/shareScreen/eyJzY3JlZW5JZCI6MjYwNTgyOX0=?timeStamp=190baf62d2e 《3D园区》" frameBorder="0"></iframe>

        <div className=" absolute right-0 top-0  w-[200px] h-[200px] bg-slate-600 pointer-events-none">
            <p>1 那边换手机啦都是</p>
        </div>
    </div>
}