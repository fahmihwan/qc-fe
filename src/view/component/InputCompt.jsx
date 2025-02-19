import AsyncSelect from "react-select/async"
import CreatableSelect from "react-select/creatable"





export const TextInputEl = ({ type = 'text', name, id, placeholder, handleChange,
    classNameLabel,
    value, readOnly = false, className, isError = "", messageInfo = "" }) => {
    return (
        <div className="mb-5">
            <label
                htmlFor="error"
                className={`block mb-2 text-sm font-medium ${classNameLabel ? classNameLabel : ''}`}
            >
                {placeholder}
            </label>
            <input
                type={type}
                id={id}
                onChange={(e) => handleChange(e)}
                value={value}
                readOnly={readOnly}
                name={name}
                className={` ${isError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500  focus:border-red-500" : "border-gray-300"}
               text-sm rounded-lg border h-12  block w-full p-2.5  ${readOnly && "bg-gray-200"}`}
                placeholder={placeholder}
            />
            {messageInfo && (<p className="text-sm mt-1 ml-1 text-gray-500 ">
                {messageInfo}
            </p>)}
            {isError && (<b className="mt-2 text-sm text-red-600 dark:text-red-500">
                Wajib diisi
            </b>)}
        </div>
    )
}



export const TextareaEl = ({ name, id, placeholder, handleChange, value, readOnly = false, className, isError = "" }) => {
    return (

        <div className="mb-5">
            <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {placeholder}
            </label>
            <textarea
                rows={4}
                id={id}
                onChange={(e) => handleChange(e)}
                value={value}
                name={name}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write your thoughts here..."

            />
        </div>
    )
}


// libraray react-select
export const InputReactSelectEl = ({ handleChange, value, placeholder, options, styles }) => {

    return (
        <>
            <CreatableSelect
                styles={styles}
                onChange={(e) => handleChange(e)}
                value={value}
                placeholder={placeholder}
                isClearable options={options} />

            {/* <CreatableSelect
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        width: '410px',
                                                        height: "60px",
                                                        marginRight: "20px"
                                                    }),
                                                }}
                                                onChange={(e) => setSelectedProvince({
                                                    value: e?.value ? e.value : 0,
                                                    label: e?.label ? e.label : ''
                                                })}
                                                value={selectedProvince.value != 0 && selectedProvince}
                                                placeholder="Province"
                                                isClearable
                                                options={allProvince}
                                                optionsCreatableSelect={allProvince} /> */}
        </>)
}



export const InputReactSelectAsyncEl = ({ defaultOptions, fetchData }) => {
    const loadOptions = async (inputValue, callback) => {
        try {
            const data = await fetchData();
            const filteredData = data?.filter((item) =>
                item.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(filteredData);  // Berikan hasil filter ke callback
        } catch (error) {
            console.error('Error fetching data:', error);
            callback([]);  // Kembalikan array kosong jika ada error
        }
    };

    return (

        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}  // Fungsi untuk memuat data berdasarkan input pengguna
            defaultOptions={defaultOptions}  // Set default options dengan data yang sudah diproses
            getOptionLabel={(e) => e.label}  // Menampilkan nama kategori sebagai label
            getOptionValue={(e) => e.value}  // Menyimpan nilai kategori sebagai value
        />
    )
}
