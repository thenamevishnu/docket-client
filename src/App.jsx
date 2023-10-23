import { useEffect, useState } from "react"
import Modal from "./Components/Modal/Modal"
import { date_format, getDockets } from "./Services/manageData"

const App = () => {

    const [isOpen, setOpen] = useState(false)
    const [dockets, setDockets] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDockets()
            setDockets(response)
        }

        fetchData()
    }, [])

    return(
        <>
        {isOpen && <Modal callback={{isOpen,setOpen}} action={[dockets, setDockets]}/>}
        <div className="flex justify-center">
            <button onClick={()=>setOpen(!isOpen)} className="text-white bg-purple-800 mt-10 p-1 px-3 rounded-lg"><i className="fa fa-plus"></i> New</button>
        </div>
        <div className=" flex justify-center mt-5 px-2 md:px-5">
            <table border={1} className="text-center border-2 border-black hidden md:table">
                <thead className=" border-b-2 border-black bg-gray-400">
                    <th className="p-2 border-2 border-black">No.</th>
                    <th className="p-2 border-2 border-black">Name</th>
                    <th className="p-2 border-2 border-black">Start Time</th>
                    <th className="p-2 border-2 border-black">End Time</th>
                    <th className="p-2 border-2 border-black">No. Hours Worked</th>
                    <th className="p-2 border-2 border-black">Rate/hr</th>
                    <th className="p-2 border-2 border-black">Supplier Name</th>
                    <th className="p-2 border-2 border-black">PO Number</th>
                </thead>
                <tbody>
                    {
                        dockets && dockets.length>0 && dockets.map((item, index) => {
                            return(
                                <tr className="border-2 border-black">
                                    <td className="border-2 border-black p-2">{index+1}</td>
                                    <td className="border-2 border-black p-2">{item.name}</td>
                                    <td className="border-2 border-black p-2">{date_format(item.start_time)}</td>
                                    <td className="border-2 border-black p-2">{date_format(item.end_time)}</td>
                                    <td className="border-2 border-black p-2">{item.no_of_hour_worked}</td>
                                    <td className="border-2 border-black p-2">{item.rate_per_hour}</td>
                                    <td className="border-2 border-black p-2">{item.supplier_name}</td>
                                    <td className="border-2 border-black p-2">{item.po_number}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <table border="1" className="text-center border-2 border-black table md:hidden">
                <tbody>
                    {
                        dockets && dockets.length>0 && dockets.map((item, index) => {
                            return(
                                <>
                                    <tr className="bg-gray-400 border-2 border-black">
                                        <th className="p-2 border-2 border-black">No.</th><td className="p-2">{index+1}</td>
                                    </tr>
                                    <tr className="border-2 border-black">
                                        <th className="p-2 border-2 border-black">Name</th><td className="p-2">{item.name}</td>
                                    </tr>
                                    <tr className="border-2 border-black">
                                        <th className="p-2 border-2 border-black">Start Time</th><td className="p-2">{date_format(item.start_time)}</td>
                                    </tr>
                                    <tr  className="border-2 border-black">
                                        <th className="p-2 border-2 border-black">End Time</th><td className="p-2">{date_format(item.end_time)}</td>
                                    </tr>
                                    <tr  className="border-2 border-black">
                                        <th className="p-2 border-2 border-black">No. Hours Worked</th><td className="p-2">{item.no_of_hour_worked}</td>
                                    </tr>
                                    <tr  className="border-2 border-black">
                                        <th className="p-2 border-2 border-black">Rate/hr</th><td className="p-2">{item.rate_per_hour}</td>
                                    </tr>
                                    <tr  className="border-2 border-black">
                                        <th className="p-2 border-2 border-black">Supplier Name</th><td className="p-2">{item.supplier_name}</td>
                                    </tr>
                                    <tr  className="border-2 border-black">
                                        <th className="p-2 border-2 border-black">PO Number</th><td className="p-2">{item.po_number}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    )

}

export default App