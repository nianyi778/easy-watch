import CpuPanel from '@/components/CpuPanel';
import MemoryPanel from '@/components/MemoryPanel';
import { Row } from 'antd';

export default function Runtime() {


    return <div className="w-full h-full relative">
        <iframe className=" w-full h-full " src="https://workspace.easyv.cloud/shareScreen/eyJzY3JlZW5JZCI6MjYwNTgyOX0=?timeStamp=190baf62d2e 《3D园区》" frameBorder="0"></iframe>

        <div className=" absolute right-0 top-0 text-[#c4c8d2] bg-[#1b1c1d6d] rounded-lg w-6/12 h-6/12  pointer-events-none px-[20px] py-[10px]">
            <Row gutter={[16, 16]}>

                <CpuPanel />
                <MemoryPanel />
            </Row>
        </div>
    </div>
}