'use client';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useState } from "react";

export const GetTrucks = (myCollection) => {
    const [docs, setDocs] = useState([]);
    const fetchTrucks = async () => {
        await getDocs(collection(firestore, myCollection))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setDocs(newData);
        })
    }
    useEffect(() => {
        fetchTrucks();
    }, [])
    return docs;
}