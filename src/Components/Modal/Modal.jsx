import { useEffect, useState } from "react"
import axios from "axios"
import { csvToJson } from "../../Services/manageData"
import { saveDocket } from "../../Services/saveFormData"

const Modal = ({callback, action}) => {
    const [csv, setCsv] = useState([])
    const [selected, setChangeSelect] = useState("")
    const [docket, setDocket] = useState({
        name:"",
        start_time:"",
        end_time:"",
        no_of_hour_worked:"",
        rate_per_hour:"",
        supplier_name:"",
        po_number:""
    })
    const [dockets, setDockets] = action

    useEffect(()=>{
        const fetchData = async () => {
            const data = await csvToJson()
            setCsv(data)
        }

        fetchData()
    },[])

    const changeSelect = (e) => {
        setChangeSelect(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        for(let key in docket){
            if(docket[key] == ""){
                window.alert(`${key} is empty!`) // Can change this alert and message
                return
            }
        }
        docket.start_time = Math.floor(new Date(docket.start_time).getTime()/1000)
        docket.end_time = Math.floor(new Date(docket.end_time).getTime()/1000)
        docket.no_of_hour_worked = parseFloat(docket.no_of_hour_worked)
        await saveDocket(docket)
        setDockets([...dockets,docket])
        callback.setOpen(!callback.isOpen)
    }

    return(
        <div className="flex justify-center bg-black bg-opacity-60 absolute w-screen h-screen px-2 pt-10">
            <form onSubmit={handleForm} className={`relative flex flex-col w-full border-2 ${selected ? `h-[65.5vh]` : `h-[58.5vh]`} py-5 rounded-xl shadow px-5 bg-white shadow-black sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12`}>
                <input name="name" value={docket.name} onChange={e=>setDocket({...docket, [e.target.name]:e.target.value})} type="text" placeholder="Enter Name" className="p-2 my-3 border-gray-500 border-2 rounded-2xl outline-none"/>
                <input name="start_time" value={docket.start_time} onChange={e=>setDocket({...docket, [e.target.name]:e.target.value})} type="datetime-local" placeholder="Start Time" className="p-2 border-gray-500 border-2 rounded-2xl outline-none"/>
                <input name="end_time" value={docket.end_time} onChange={e=>setDocket({...docket, [e.target.name]:e.target.value})} type="datetime-local" placeholder="End Time" className="p-2 my-3 border-gray-500 border-2 rounded-2xl outline-none"/>
                <input name="no_of_hour_worked" value={docket.no_of_hour_worked} onChange={e=>setDocket({...docket, [e.target.name]:e.target.value})} type="number" placeholder="No.of Hours Worked" className="p-2 border-gray-500 border-2 rounded-2xl outline-none"/>
                <input name="rate_per_hour" value={docket.rate_per_hour} onChange={e=>setDocket({...docket, [e.target.name]:e.target.value})} type="number" placeholder="Rate Per Hour" className="p-2 my-3 border-gray-500 border-2 rounded-2xl outline-none"/>
                <select name="supplier_name" value={docket.supplier_name} onChange={e=>{setDocket({...docket, [e.target.name]:e.target.value}); changeSelect(e);}} className="p-2 border-gray-500 border-2 rounded-2xl outline-none">
                    <option value={""}>Select Supplier</option>
                    {
                        csv.length > 0 && csv.filter((item, index, self) => index === self.findIndex(items => items.Supplier == item.Supplier)).map((item, index) => {
                            return(
                                <option key={index}>{item.Supplier}</option>
                            )
                        })
                    }
                </select>
                {
                    selected && <select name="po_number" value={docket.po_number} onChange={e=>setDocket({...docket, [e.target.name]:e.target.value})} className="p-2 mt-3 border-gray-500 border-2 rounded-2xl outline-none">
                        <option value={""}>Select Purchase Order</option>
                        {
                            csv.length > 0 && csv.filter(item=>item.Supplier==selected).filter((item, index, self) => index === self.findIndex(items => items["PO Number"] == item["PO Number"]) ).map((item, index) => {
                                return(
                                    <option key={index} value={item["PO Number"]}>{item["PO Number"]} : {item.Description}</option>
                                )
                            })
                        }
                    </select>
                }
                <div className="flex justify-center">
                    <button type="submit" className="p-1 px-2 bg-green-900 rounded-lg text-white mt-5 mr-5"><i className="fa fa-save"></i> Save</button>
                    <button type="button" className="p-1 px-2 bg-red-600 rounded-lg text-white mt-5" onClick={()=>callback.setOpen(!callback.isOpen)}><i className="fa fa-close"></i> Close</button>
                </div>
            </form>
        </div>
    )
}

export default Modal