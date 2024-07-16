
import { Outlet } from 'react-router-dom';

export default function Layout() {

    return <div className=' w-lvh h-lvh '>
        <div className=' flex-1 flex  h-full'>
            <Outlet />
        </div>
    </div>
}