
import { invoke } from "@tauri-apps/api/tauri";
import { CpuData } from "@/types/monitor";
import { useEffect, useMemo, useRef, useState } from "react";
import { Col, Row } from 'antd';
import * as echarts from 'echarts';
import { cpuOption, getCpuUsageDatas } from "@/types/options/cpuOption";
import ReactDOM from "react-dom";

export default function CpuPanel() {
    const [cpuUsageData, setCpuUsageData] = useState<number[][]>([]);
    const [globalCpuUsageData, setGlobalCpuUsageData] = useState<number[][]>([]);
    const [cpuCores, setCpuCores] = useState(0);
    const [cpuBrand, setCpuBrand] = useState('');
    const cpuTotalChart = useRef<echarts.ECharts | null>(null)
    const cpuUsageCharts = useRef<echarts.ECharts[]>([]);


    const cpuGraphCols = useMemo(() => {
        if (cpuCores <= 4) {
            return 2;
        } else if (cpuCores <= 12) {
            return 4;
        }
        else if (cpuCores <= 18) {
            return 6;
        } else if (cpuCores <= 32) {
            return 8;
        } else if (cpuCores <= 48) {
            return 12;
        } else {
            return 24;
        }
    }, [cpuCores]);

    const cpuGraphRows = useMemo(() => {
        return Math.ceil(cpuCores / cpuGraphCols)
    }, [cpuCores, cpuGraphCols]);
    const fitSize = useMemo(() => {
        return { height: `${80 / cpuGraphRows * 2}px` }
    }, [cpuGraphRows]);

    function updateCpuUsage(cpu: CpuData) {
        if (cpuUsageData.length > 30) {
            setCpuUsageData(g => {
                g.shift();
                return g;
            })
            setGlobalCpuUsageData(g => {
                g.shift();
                return g;
            })
        }
        setCpuUsageData((c) => {
            c.push(getCpuUsageDatas(cpu.cores));
            return c;
        })
        for (var i = 0; i < cpuUsageCharts.current.length; i++) {
            cpuUsageCharts.current[i].setOption({
                dataset: {
                    source: cpuUsageData
                }
            })
        }

        setGlobalCpuUsageData((g) => {
            g.push([new Date().getTime(), new Date().getTime(), cpu.global_usage]);
            return g;
        })

        cpuTotalChart.current?.setOption({
            dataset: {
                source: globalCpuUsageData
            }
        })

    }


    useEffect(() => {
        (async () => {
            // 获取机器cpu核心数
            const cpuCores = (await invoke<CpuData>("cpu_info", {})).cores.length;

            // 创建虚拟节点
            const cpuRowElems = [];
            for (let i = 0; i < cpuGraphRows; i++) {
                const cpuColsElems = [];
                for (let j = 0; j < cpuGraphCols; j++) {

                    cpuColsElems.push(
                        <Col className={`col-${24 / cpuGraphCols}`} span={24 / cpuGraphCols}>
                            <div
                                className="chart"
                                style={fitSize}
                                id={`cpuUsage${i * cpuGraphCols + j}`}
                            />
                        </Col>
                    );
                }
                cpuRowElems.push(<Row className="row">{cpuColsElems}</Row>);
            }

            ReactDOM.render(
                <div id="cpuRoot">{cpuRowElems}</div>,
                document.getElementById('cpuRoot')
            );
            // 初始化echarts
            for (let i = 0; i < cpuCores; i++) {
                const chartInstance = echarts.init(
                    document.getElementById(`cpuUsage${i}`),
                    'blue'
                );
                cpuUsageCharts.current.push(chartInstance);
                chartInstance.setOption(cpuOption);
                chartInstance.setOption({
                    series: [
                        {
                            encode: {
                                y: i + 2,
                                x: 0,
                                itemId: 1
                            }
                        }
                    ]
                });
            }
        })()

        return () => {
            cpuUsageCharts.current.forEach(e => {
                e.clear();
            })
        }
    }, [cpuGraphRows, cpuGraphCols, fitSize])


    useEffect(() => {
        const cpuTotalDom = document.querySelector('#cpuTotalChart') as HTMLElement;
        if (cpuTotalDom) {
            cpuTotalChart.current = echarts.init(cpuTotalDom);
            cpuTotalChart.current?.setOption(cpuOption);
            cpuTotalChart.current?.setOption({
                series: [{
                    type: 'bar',
                    encode: {
                        y: 2,
                        x: 0,
                        itemId: 1
                    }
                }]
            })
        }
        const t = setInterval(() => {
            invoke<CpuData>("cpu_info", {}).then(cpu => {
                setCpuCores(cpu.cores.length);
                setCpuBrand(cpu.chip_name);


                updateCpuUsage(cpu);
            });
        }, 2000)

        return () => {
            clearInterval(t);
            cpuTotalChart.current?.clear();
        };
    }, [])



    return <Col span={24}>
        <div className=" w-full  border-[1px] border-[#393a3b] bg-[#1b1c1d] rounded-[8px] p-[8px]">
            <div className=" h-[32px]  border-b-[1px] border-[#393a3b]">
                <Row className=" h-full">
                    <Col span={8}>
                        <span>CPU 核心负载</span>
                    </Col>
                    <Col span={8}>
                        <span>{cpuBrand}</span>
                    </Col>
                    <Col span={8}>
                        <div id="cpuTotalChart" className=" w-full h-full "></div>
                    </Col>
                </Row>

            </div>
            <div id="cpuRoot" className=" min-h-[40px]">

            </div>
        </div>
    </Col>

}