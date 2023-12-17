'use client';
import FormBox from "./formBox";
import FormBoxDriver from "./formBoxDriver";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./toPrint";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import FormBoxConcertPump from "./formBoxConcertPump";
import FormBoxNewCus from "./formBoxNewCus";

export default function AddInvoice() {

    const [showTruck, setShowTruck] = useState(false);
    const [showDriver, setShowDriver] = useState(false);
    const [showPump, setShowPump] = useState(false);
    const [showNewCus, setShowNewCus] = useState(false);

    const [isNewCus,setIsNewCus] = useState(false);

    const customerIdRef = useRef();
    const customerNameRef = useRef();
    const customerStreetRef = useRef();
    const customerCityRef = useRef();
    const quantityRef = useRef();
    const materialRef = useRef();
    const concretdGradeRef = useRef();
    const kindMaterialRef = useRef();
    const supplierNumberRef = useRef();
    const typeOfConcreteRef = useRef();
    const degreeOfExposureRef = useRef();

    const collec = collection(firestore, "invoices");

    function handelShowDisable(isShow) {
        setShowTruck(isShow)
    }

    function handelShowDisableDriver(isShow) {
        setShowDriver(isShow)
    }

    function handelShowDisablePump(isShow) {
        setShowPump(isShow)
    }

    function handelShowDisableNewCus(isShow) {
        setShowNewCus(isShow)
    }

    const [truck, setTruck] = useState();
    const getTruck = (truck_id) => {
        setTruck(truck_id);
    }

    const [driver, setDriver] = useState();
    const getDriver = (truck_id) => {
        setDriver(truck_id);
    }

    const [pump, setPump] = useState();
    const getPump = (truck_id) => {
        setPump(truck_id);
    }

    const [newCus, setNewCus] = useState();
    const [customer,setCustomer] = useState({});
    const getNewCus = (truck_id,cus) => {
        setNewCus(truck_id);
        setCustomer(cus);
    }

    const componentRef = useRef();


    const handelAddPrint = async () => {
        let newData;
        if(newCus){
            newData = {
                invoices_customer_id: customer.customer_id,
                invoices_customer_name: customer.customer_name,
                invoices_customer_street: customer.customer_street,
                invoices_customer_city: customer.customer_city,
                invoices_quantity: quantityRef.current.value,
                invoices_material: materialRef.current.value,
                invoices_concretd_grade: concretdGradeRef.current.value,
                invoices_kind_material: kindMaterialRef.current.value,
                invoices_kind_supplier_number: supplierNumberRef.current.value,
                invoices_kind_type_of_concrete: typeOfConcreteRef.current.value,
                invoices_kind_egree_of_Exposure: degreeOfExposureRef.current.value,
                invoices_truck: truck,
                invoices_driver: driver,
                invoices_pump: pump
            }; 
        }
        else{
            newData = {
                invoices_customer_id: customerIdRef.current.value,
                invoices_customer_name: customerNameRef.current.value,
                invoices_customer_street: customerStreetRef.current.value,
                invoices_customer_city: customerCityRef.current.value,
                invoices_quantity: quantityRef.current.value,
                invoices_material: materialRef.current.value,
                invoices_concretd_grade: concretdGradeRef.current.value,
                invoices_kind_material: kindMaterialRef.current.value,
                invoices_kind_supplier_number: supplierNumberRef.current.value,
                invoices_kind_type_of_concrete: typeOfConcreteRef.current.value,
                invoices_kind_egree_of_Exposure: degreeOfExposureRef.current.value,
                invoices_truck: truck,
                invoices_driver: driver,
                invoices_pump: pump
            }; 
        }
        console.log(newData)
        setInvData(newData);
        try {
            await addDoc(collec, invData);
        }
        catch (e) {
            console.log(e);
        }
        setTruck(null);
        setDriver(null);
        setPump(null);
        setNewCus(null);
        setCustomer(null); 
        handlePrint();
        resetAll();
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [languge, setLanguge] = useState(false);

    const resetAll = () => {
        customerIdRef.current ? customerIdRef.current.value = "" : null; 
        customerNameRef.current ? customerNameRef.current.value = "" : null;
        customerStreetRef.current ? customerStreetRef.current.value = "" : null;
        customerCityRef.current ? customerCityRef.current.value = "" : null;
        quantityRef.current.value = "";
        materialRef.current.value = "";
        concretdGradeRef.current.value = "";
        kindMaterialRef.current.value = "";
        supplierNumberRef.current.value = "";
        typeOfConcreteRef.current.value = "";
        degreeOfExposureRef.current.value = "";


    }
    const [invData, setInvData] = useState({});
    return (
        <div className="rounded-3xl bg-[#f5f5f5] border-2 border-[#334155] p-10">
            {
                showTruck ? <FormBox getTruck={getTruck} showDisable={handelShowDisable} /> :
                    showDriver ? <FormBoxDriver getDriver={getDriver} showDisableDriver={handelShowDisableDriver} /> :
                        showPump ? <FormBoxConcertPump getPump={getPump} showDisableCon={handelShowDisablePump} /> :
                        showNewCus ? <FormBoxNewCus getNewCus={getNewCus} showDisableNewCus={handelShowDisableNewCus}/>
                        : null
            }
            <div className="max-w- mx-auto">
                {
                    isNewCus ?
                        <div className="flex items-center justify-center rounded-xl p-2">
                            <label class="switch">
                                <input onChange={(e) => setIsNewCus(e.target.checked)} checked={isNewCus} className="toggle_check" type="checkbox" />
                                <span class="slider round"></span>
                            </label>
                            <p className="text-xl ml-4"> مشتري تقليدي</p>
                        </div>
                        :
                        <div className="flex items-center justify-center rounded-xl p-2">
                            <label class="switch">
                                <input onChange={(e) => setIsNewCus(e.target.checked)} checked={isNewCus} className="toggle_check" type="checkbox" />
                                <span class="slider round"></span>
                            </label>
                            <p className="text-xl ml-4"> مشتري جديد</p>
                        </div>
                }
                <div className="flex justify-end text-3xl mb-6">المشتري
                </div>

                {
                    isNewCus ?
                        newCus
                            ?
                            <div className="flex justify-around w-full">
                                <div className="text-center mr-2">
                                    <p>
                                        لقد تم اختيار
                                    </p>
                                    <p>
                                        {
                                            newCus
                                        }
                                    </p>
                                </div>
                                <div>
                                    <button onClick={() => setNewCus(null)} class="w-full bg-white border border-[#dc2626] hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                        <p className="text-xl font-bold text-[#dc2626]">ازالة</p>
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="mb-7">
                                <button onClick={() => { setShowDriver(false); setShowTruck(false); setShowPump(false); setShowNewCus(true);}} class="w-full bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p className="text-xl font-bold">اختر زبون</p>
                                </button>
                            </div>
                        :
                        <div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full  mb-10 group">
                                    <input ref={customerIdRef} dir="rtl" type="number" name="customerId" id="customerId" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="رقم المشتري" required />
                                    <label dir="rtl" htmlFor="customerId" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                </div>
                                <div className="relative z-0 w-full  mb-10 group">
                                    <input ref={customerNameRef} dir="rtl" type="text" name="customerName" id="customerName" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="اسم المشتري الكامل" required />
                                    <label dir="rtl" htmlFor="customerName" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 border-b-gray">
                                <div className="relative z-0 w-full  mb-10 group">
                                    <input ref={customerStreetRef} dir="rtl" type="text" name="customerStreet" id="customerStreet" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="الشارع" required />
                                    <label dir="rtl" htmlFor="customerStreet" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                </div>
                                <div className="relative z-0 w-full  mb-10 group">
                                    <input ref={customerCityRef} dir="rtl" type="text" name="customerCity" id="customerCity" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="البلد" required />
                                    <label dir="rtl" htmlFor="customerCity" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                                </div>
                            </div>
                        </div>
                }

                <div className="border-2 border-b-[#334155]"></div>
                <div className="flex justify-end text-3xl mt-10">تفاصيل اخرى</div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mt-6 mb-10 group">
                        <input ref={quantityRef} dir="rtl" type="text" name="quantity" id="quantity" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="الكمية" required />
                        <label dir="rtl" htmlFor="quantity" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                    <div className="relative z-0 w-full mt-6 mb-10 group">
                        <input ref={materialRef} dir="rtl" type="text" name="material" id="material" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="مادة البناء" required />
                        <label dir="rtl" htmlFor="material" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input ref={concretdGradeRef} dir="rtl" type="number" name="concretdGrade" id="concretdGrade" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="درجة الخرسانة" required />
                        <label dir="rtl" htmlFor="concretdGrade" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input ref={kindMaterialRef} dir="rtl" type="text" name="kindMaterial" id="kindMaterial" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="نوع مادة البناء" required />
                        <label dir="rtl" htmlFor="kindMaterial" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                </div>



                
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input ref={supplierNumberRef} dir="rtl" type="number" name="supplierNumber" id="supplierNumber" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="رقم المورد" required />
                        <label dir="rtl" htmlFor="supplierNumber" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input ref={typeOfConcreteRef} dir="rtl" type="text" name="typeOfConcrete" id="typeOfConcrete" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="نوع من الخرسانة" required />
                        <label dir="rtl" htmlFor="typeOfConcrete" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                </div>
                <div className="grid md:grid-cols-1 md:gap-6">
                    <div className="relative z-0 w-full mb-10 group">
                        <input ref={degreeOfExposureRef} dir="rtl" type="number" name="degreeOfExposure" id="degreeOfExposure" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder="درجة التعرض" required />
                        <label dir="rtl" htmlFor="degreeOfExposure" className="peer-focus:font-medium absolute text-2xl text-black dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 text-right w-full" />
                    </div>
                </div>
                <div className="border-2 border-b-[#334155]"></div>
                <div className="flex justify-around w-full mt-7">
                    <div className="">
                        {

                            pump ?
                                <div className="flex justify-around w-full">
                                    <div className="text-center mr-2">
                                        <p>
                                            لقد تم اختيار
                                        </p>
                                        <p>
                                            {
                                                pump
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <button onClick={() => setPump(null)} class="w-full bg-white border border-[#dc2626] hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                            <p className="text-xl font-bold text-[#dc2626]">ازالة</p>
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="">
                                    <button onClick={() => { setShowDriver(false); setShowTruck(false); setShowPump(true);setShowNewCus(false); }} class="w-full bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <p className="text-xl font-bold">اختر مضخة</p>
                                    </button>
                                </div>
                        }

                    </div>
                    <div className="">
                        {

                            driver ?
                                <div className="flex justify-around w-full">
                                    <div className="text-center mr-2">
                                        <p>
                                            لقد تم اختيار
                                        </p>
                                        <p>
                                            {
                                                driver
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <button onClick={() => setDriver(null)} class="w-full bg-white border border-[#dc2626] hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                            <p className="text-xl font-bold text-[#dc2626]">ازالة</p>
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="">
                                    <button onClick={() => { setShowDriver(true); setShowTruck(false); setShowPump(false);setShowNewCus(false); }} class="w-full bg-white border border-black hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <p className="text-xl font-bold">اختر سائق</p>
                                    </button>
                                </div>
                        }

                    </div>
                    <div className="">
                        {
                            truck ?
                                <div className="flex justify-around w-full">
                                    <div className="text-center mr-2">
                                        <p>
                                            لقد تم اختيار
                                        </p>
                                        <p>
                                            {truck}
                                        </p>
                                    </div>
                                    <div>
                                        <button onClick={() => setTruck(null)} class="w-full bg-white hover:bg-gray-400 border border-[#dc2626] text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                            <p className="text-xl font-bold text-[#dc2626]">ازالة</p>
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="">
                                    <button onClick={() => { setShowTruck(true); setShowDriver(false); setShowPump(false); setShowNewCus(false);}} class="w-full bg-white hover:bg-gray-400 border border-black text-black font-bold py-2 px-4 rounded flex justify-around items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <p className="text-xl font-bold">اختر شاحنة</p>
                                    </button>
                                </div>
                        }
                    </div>
                </div>
                <div className="border-2 border-b-[#334155] mt-7"></div>


                <div className="flex justify-around w-full mt-10 p-3 items-center">
                    <div className="flex items-center rounded-xl p-2">
                        <label class="switch">
                            <input onChange={(e) => setLanguge(e.target.checked)} checked={languge} className="toggle_check" type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <p className="text-xl ml-4"> انشاء باللغة العربية</p>
                    </div>
                    <button onClick={handelAddPrint} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full w-full sm:w-auto px-14 py-3 text-xl text-center dark:bg-black dark:hover:bg-blue-700 dark:focus:ring-black-800">انشاء</button>
                </div>

                <div className="hide_invioc">
                    <ComponentToPrint inewInv={invData} languge={languge} ref={componentRef} />
                </div>
            </div>


        </div>
    )
}