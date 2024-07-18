import { MemoryData } from "@/types/monitor";
import { memoryOption } from "@/types/options/options";
import { invoke } from "@tauri-apps/api/tauri";
import { Col } from "antd";
import { EChartsType } from "echarts";
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from "react"

export default function MemoryPanel() {
    const memoryChart = useRef<EChartsType>();

    const [totalMemory, setTotalMemory] = useState<string>(("16"));

    function updateMemoryUsage(memory: MemoryData) {
        memoryChart.current?.setOption({
            xAxis: {
                max: Number.parseInt(totalMemory),
                interval: Math.floor(Number.parseInt(totalMemory) / 16) * 4,
            },
            dataset: {
                source: [['memory', (memory.used_memory + memory.used_swap).toFixed(1), memory.total_memory, memory.total_swap]]
            }
        });
    }

    useEffect(() => {
        const dom = document.getElementById('memoyChartDom');
        if (dom) {
            memoryChart.current = echarts.init(dom);
            memoryChart.current?.setOption(memoryOption);
        }
        const t = setInterval(() => {
            invoke<MemoryData>("memory_info", {}).then(memory => {
                setTotalMemory(
                    (memory.total_memory + memory.total_swap).toFixed(0)
                )
                updateMemoryUsage(memory);
            });
        }, 10 * 1000)

        return () => {
            clearInterval(t);
            memoryChart.current?.clear();
        }
    }, [])

    return <Col span={12}>
        <div className=" w-full flex  h-[60px] border-[1px] border-[#393a3b] bg-[#1b1c1d] rounded-[8px] p-[8px]">
            <span className=" w-[24px] h-full  pr-[4px]">内存</span>
            <div id="memoyChartDom" className=" h-full  w-[calc(100%-10px)] pr-[4px]"></div>
        </div>
    </Col>
}