import { deleteDoc,doc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";

export default function EditBoard(props){

    const deleteInvo = async() => {
        try{
            await deleteDoc(doc(firestore, "invoices", props.data.id));
        }
        catch(e){
            console.log(e);
        }
        props.showInv();
    }

    return(
        <div className="w-full md:w-1/2 mx-auto fixed z-10 top-28 right-0 left-0 border-2 border-[#334155] rounded-xl">
            <div className="flex flex-col p-5 rounded-lg shadow bg-[#f5f5f5]">
                <div className="flex flex-col items-center text-center">
                    <h2 className="mt-2 font-semibold text-black text-xl">قائمة الشاحنات</h2>
                    <p className="mt-2 text-sm text-black leading-relaxed w-full text-right text-xl">اختر شاحنة من القائمة لديك</p>
                </div>
                <div className="m-1 p-5 bg-white rounded-xl overflow-scroll h-72">
                    <table className="w-full text-center">
                        <tbody>
                            <tr className="border-2 border-[#334155]">
                                <th><p className="text-xl">السائق</p></th>
                                <th><p className="text-xl">المضخة</p></th>
                                <th><p className="text-xl">الشاحنة</p></th>
                                <th><p className="text-xl">العنوان</p></th>
                                <th><p className="text-xl">الشارع</p></th>
                                <th><p className="text-xl">اسم الزبون</p></th>
                                <th><p className="text-xl">رقم الزبون</p></th>
                            </tr>
                            <tr>
                                <th><p>{props.data.invoices_driver}</p></th>
                                <th><p>{props.data.invoices_pump}</p></th>
                                <th><p>{props.data.invoices_truck}</p></th>
                                <th><p>{props.data.invoices_customer_city}</p></th>
                                <th><p>{props.data.invoices_customer_street}</p></th>
                                <th><p>{props.data.invoices_customer_name}</p></th>
                                <th><p>{props.data.invoices_customer_id}</p></th>
                            </tr>
                            <tr className="border-2 border-[#334155]">
                                <th><p className="text-xl">تم التزويد</p></th>
                                <th><p className="text-xl">درجة الثقة</p></th>
                                <th><p className="text-xl">درجة التعرض</p></th>
                                <th><p className="text-xl">نوع الخرسانة</p></th>
                                <th><p className="text-xl">نوع المادة</p></th>
                                <th><p className="text-xl">المادة</p></th>
                                <th><p className="text-xl">الكمية</p></th>
                            </tr>
                            <tr>
                                <th><p>{props.data.invoices_kind_supplier_number}</p></th>
                                <th><p>{props.data.invoices_concretd_grade}</p></th>
                                <th><p>{props.data.invoices_kind_egree_of_Exposure}</p></th>
                                <th><p>{props.data.invoices_kind_type_of_concrete}</p></th>
                                <th><p>{props.data.invoices_kind_material}</p></th>
                                <th><p>{props.data.invoices_material}</p></th>
                                <th><p>{props.data.invoices_quantity}</p></th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center mt-3">
                    <button onClick={deleteInvo} className="flex-1 px-4 mr-2 py-2 bg-[#334155] hover:bg-[#b91c1c] text-white text-2xl font-medium rounded-md">
                        حذف الفتورة
                    </button>
                    <button onClick={() => props.showInv()} className="flex-1 px-4 ml-2 py-2 bg-[#334155] hover:bg-yellow-600 text-white text-2xl font-medium rounded-md">
                        خروج
                    </button>
                </div>
            </div>
        </div>
    )
}