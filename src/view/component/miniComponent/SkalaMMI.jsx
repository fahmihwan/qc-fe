export const SkalaMMI = ({skala, tulisan}) => {
    const normalizeSkalaMMI = (skala) => {
        return skala.replace(/\s+/g, ""); // Menghapus semua spasi
    };

    // console.log("ini skala ", skala)
    const getSkalaMMI = (skala) => {
        if (!skala || typeof skala !== "string") return ""; 
        // console.log("ini after get skala mmi ", skala.split(",")[0])
        return normalizeSkalaMMI(skala).split(",")[0];
    };

    return (
        <div className={`px-2 py-[2py] text-dark-mode text-[10px] mr-[6px] rounded-[5px]
            ${getSkalaMMI(skala) === 'I' && 'bg-gempa-satu'}
            ${getSkalaMMI(skala) === 'I-II' && 'bg-gempa-satu-dua'}
            ${getSkalaMMI(skala) === 'II' && 'bg-gempa-satu-dua'}   
            ${getSkalaMMI(skala) === 'II-III' && 'bg-gempa-dua-tiga'}
            ${getSkalaMMI(skala) === 'III' && 'bg-gempa-dua-tiga'}
            ${getSkalaMMI(skala) === 'III-IV' && 'bg-gempa-tiga-empat'}
            ${getSkalaMMI(skala) === 'IV' && 'bg-gempa-empat'}
            ${getSkalaMMI(skala) === 'IV-V' && 'bg-gempa-empat-lima'}
            ${getSkalaMMI(skala) === 'V' && 'bg-gempa-lima'}
            ${getSkalaMMI(skala) === 'V-VI' && 'bg-gempa-lima-enam'}
            ${getSkalaMMI(skala) === 'VI' && 'bg-gempa-enam'}
            ${getSkalaMMI(skala) === 'VI-VII' && 'bg-gempa-enam-tujuh'}
            ${getSkalaMMI(skala) === 'VII' && 'bg-gempa-tujuh'}
            ${getSkalaMMI(skala) === 'VII-VIII' && 'bg-gempa-tujuh-delapan'}
            ${getSkalaMMI(skala) === 'VIII' && 'bg-gempa-delapan'}
            ${getSkalaMMI(skala) === 'VIII-IX' && 'bg-gempa-delapan-sembilan'}
            ${getSkalaMMI(skala) === 'IX' && 'bg-gempa-sembilan'}
            ${getSkalaMMI(skala) === 'IX-X' && 'bg-gempa-sembilan-sepuluh'}
            ${getSkalaMMI(skala) === 'X+' && 'bg-gempa-sepuluh-plus'}
        `}>
            {tulisan}
        </div>
    )
}