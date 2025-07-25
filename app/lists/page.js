'use client';
import { useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSteering2Line } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import AllLists from "../Componenets/allLists";

export default function Lists() {
    const [list,setList] = useState(1);
    const getList = () => {
        if(list == 1){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">قائمة الفواتير</div>
                <AllLists wichList={"invoices"}/>
            </div>
        }
        else if(list == 2){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">قائمة مضخات الخرسانة</div>
                <AllLists wichList={"concert pumps"}/>
            </div>
        }
        else if(list == 3){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">قائمة السائقين</div>
                <AllLists wichList={"drivers"}/>
            </div>
        }
        else if(list == 4){
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">قائمة الشاحنات</div>
                <AllLists wichList={"trucks"}/>
            </div>
        }
        else{
            return <div>
                <div className="text-4xl flex justify-center border-b-2 border-black mb-10 pb-3">قائمة الزبائن</div>
                <AllLists wichList={"customers"}/>
            </div>
        }
    }

    return (
        <div>
            <div className="flex justify-around test-fontt">
                <div className="items-center w-full">
                    <div className="w-auto m-10 taxt-center">
                        {
                            getList()
                        }
                    </div>
                </div>
                <div className="w-1/6 mr-5 bg-[#f5f5f5] rounded-3xl border-2 border-[#334155]">
                    <div className="flex flex-col m-auto">
                        <button onClick={() => setList(1)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><FaFileInvoiceDollar className="text-3xl mt-auto mb-auto"/><p className="m-2 text-2xl">قائمة الفواتير</p></button>
                        <button onClick={() => setList(2)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><TbTruckDelivery className="text-3xl mt-auto mb-auto"/><p className="m-2 text-2xl">قائمة مضخات الخرسانة</p></button>
                        <button onClick={() => setList(3)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><RiSteering2Line className="text-3xl mt-auto mb-auto"/><p className="m-2 text-2xl">قائمة السائقين</p></button>
                        <button onClick={() => setList(4)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><FaTruck className="text-3xl mt-auto mb-auto"/><p className="m-2 text-2xl">قائمة الشاحنات</p></button>
                        <button onClick={() => setList(5)} className="focus:border-black m-5 flex justify-between border-b-4 border-black-0 hoverButoon"><BsPersonFillAdd className="text-3xl mt-auto mb-auto"/><p className="m-2 text-2xl">قائمة الزبائن</p></button>
                    </div>
                </div>
            </div>
        </div>
    )
}