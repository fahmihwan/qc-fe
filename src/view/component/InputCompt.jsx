




export const TextInputEl = ({ type = 'text', name, id, placeholder, handleChange, value, readOnly = false, className, isError = "", messageInfo = "" }) => {
    return (
        <div className="mb-5">
            <label
                htmlFor="error"
                className="block mb-2 text-sm font-medium "
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
