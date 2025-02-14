import { useEffect, useState } from "react";

export const useEffectGempa = (param) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (param) => {
        // console.log(param,'parammmmm')
        setLoading(true);
        let apiURL = "";

        if (param === "TERKINI") {
            apiURL = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
        } else if (param === "M50") {
            apiURL = "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json";
        } else if (param === "DIRASAKAN") {
            apiURL = "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json";
        } else {
            alert('else')
        }

        if (!apiURL) return; // Jika param tidak valid, tidak fetch

        try {
            const res = await fetch(apiURL);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();

            if(data){
                const gempa = data.Infogempa.gempa

                if(!Array.isArray(gempa)){
                    data.Infogempa.gempa = [gempa]
                }

                const updatedGempa = data.Infogempa.gempa.map((item, index) => ({
                    ...item,
                    Id: index + 1 
                })); 
                console.log('ini updated gempa', { ...data, Infogempa: { gempa: updatedGempa } })
                setResponse({ ...data, Infogempa: { gempa: updatedGempa }});
            } else{
                setResponse(data);
            }
            // console.log("Data fetched:", data);
        } catch (err) {
            // console.error("Fetch error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (param != undefined) {
            fetchData(param);
        }
    }, [param]);

    return { response, loading, error, fetchData };
};
