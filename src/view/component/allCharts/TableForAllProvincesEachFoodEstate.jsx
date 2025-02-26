import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/generateUtil";
import { Pagination } from "flowbite-react";
import { IconSortFilterSVG } from "../IconSvg";

const TableForAllProvincesEachFoodEstate = ({data}) => {
  const [maxValueLuasPanen, setMaxValueLuasPanen] = useState(1)
  const [maxValueProduktivitas, setMaxValueProduktivitas] = useState(1)

  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 5

  useEffect(() => {
    if(data && data.length > 0) {
      const luasPanenValues = data.map((item) => parseFloat(item.luas_panen) || 0)
      const produktivitasValues = data.map((item) => parseFloat(item.produktivitas || 0))

      setMaxValueLuasPanen(Math.max(...luasPanenValues, 1))
      setMaxValueProduktivitas(Math.max(...produktivitasValues, 1))
    }
  }, [data])

  const onPageChange = (page) => setCurrentPage(page)

  const getColor = (value, max = maxValueLuasPanen, type) => {
    if (type == "produktivitas") {
        // if (value === 0) return `hsl(283, 100%, 90%)`; 
    
        const lightness = 90 - (parseFloat(value) / max) * 40; // dari 90 turun ke 50
        return `hsl(283, 100%, ${Math.max(lightness, 50)}%)`;
    }
    // if (value === 0) return `hsl(100, 50%, 90%)`;

    const lightness = 90 - (parseFloat(value) / max) * 40; // dari 90 turun ke 50
    return `hsl(203, 100%, ${Math.max(lightness, 50)}%)`;
  }


  const getColorText = (value, max = maxValueLuasPanen,) => {
      const lightness = value > (max / 2) ? 100 : 10.6
      return `hsl(0, 0%, ${lightness}%)`;
  }

  const filteredData = data.filter((item) => {
    return (
      item.nama_provinsi.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      item.luas_panen.toString().includes(searchTerm) ||
      item.produktivitas.toString().includes(searchTerm)
    )
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if(!sortColumn) return 0

    let aValue = parseFloat(a[sortColumn])
    let bValue = parseFloat(b[sortColumn])

    if(isNaN(aValue)) aValue = a[sortColumn]
    if(isNaN(bValue)) bValue = b[sortColumn]

    if(aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if(aValue > bValue) return sortOrder === "asc" ? 1 : -1

    return 0
  })

  const handleSort = (column) => {
    setSortOrder(sortColumn === column && sortOrder === "asc" ? "desc" : "asc")
    setSortColumn(column)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = sortedData.slice(startIndex, endIndex)

  const allZero = data.every(item => 
    parseFloat(item?.luas_panen ?? 0) === 0 && 
    parseFloat(item?.produktivitas ?? 0) === 0
  );  

  return (
    <div className="overflow-x-auto mt-4">
      {allZero ? (
        <div className="dark:text-gray-400 text-center text-xl mb-[10px]">Data belum tersedia</div>
      ) : (
        <>
          <div className="mb-4 w-full">
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-dark-mode-border dark:focus:text-white dark:border-light-border px-4 py-2 dark:bg-dark-mode-bg w-full rounded shadow-none outline-none focus:outline-none focus:ring-0"
            />
          </div>
          
          <table className="min-w-full border-collapse border border-light-border dark:border-dark-mode-border table-fixed">
            <thead>
                <tr className=" bg-gray-900 dark:bg-white">
                    <th 
                      className="cursor-pointer border border-gray-400 text-white dark:text-dark-mode px-4 py-2 "
                      onClick={() => handleSort("nama_provinsi")}
                    >
                      <div className="flex flex-row items-center gap-3 justify-center">
                        Provinsi <IconSortFilterSVG />
                      </div>
                    </th>
                    <th 
                      className="border border-gray-400 text-white dark:text-dark-mode px-4 py-2"
                      onClick={() => handleSort("luas_panen")}
                    >
                      <div className="flex flex-row items-center gap-3 justify-center">
                        Luas Panen (ha) <IconSortFilterSVG />
                      </div>
                    </th>
                    <th 
                      className="border border-gray-400 text-white dark:text-dark-mode px-4 py-2"
                      onClick={() => handleSort("produktivitas")}
                    >
                      <div className="flex flex-row items-center gap-3 justify-center">
                        Produktivitas (ku/ha) <IconSortFilterSVG />
                      </div>
                    </th>
                </tr>
            </thead>
            <tbody>
              {
                paginatedData?.map((d, i) => {
                  return (
                    <tr key={i} className=" text-center">
                      <td className="border border-gray-400 px-4 py-2 capitalize dark:text-white">{d?.nama_provinsi}</td>
                      <td className="border border-gray-400 p-2 font-semibold">
                        <div 
                          className="p-2"
                          style={{ 
                              backgroundColor: getColor(parseFloat(d?.luas_panen), maxValueLuasPanen, "luas_panen"), 
                              color: getColorText(parseFloat(d?.luas_panen), maxValueLuasPanen)
                          }}
                        >
                          {formatCurrency(parseFloat(d?.luas_panen))}
                        </div>
                      </td>
                      <td className="border border-gray-400 p-2 font-semibold">
                        <div 
                          className="p-2"
                          style={{ 
                              backgroundColor: getColor(parseFloat(d?.produktivitas), maxValueProduktivitas, "produktivitas"), 
                              color: getColorText(parseFloat(d?.produktivitas), maxValueProduktivitas)
                          }}
                        >
                          {formatCurrency(parseFloat(d?.produktivitas))}
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <Pagination 
              layout="pagination"
              currentPage={currentPage}
              totalPages={Math.ceil(data.length / itemsPerPage)}
              onPageChange={onPageChange}
              previousLabel="Prev"
              nextLabel="Next"
              showIcons
              theme={
                {
                  "base": "",
                  "layout": {
                    "table": {
                      "base": "text-sm text-black dark:text-gray-custom",
                      "span": "font-semibold text-gray-900 dark:text-white"
                    }
                  },
                  "pages": {
                    "base": "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
                    "showIcon": "inline-flex",
                    "previous": {
                      "base": "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-dark-mode dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                      "icon": "h-5 w-5"
                    },
                    "next": {
                      "base": "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-dark-mode dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                      "icon": "h-5 w-5"
                    },
                    "selector": {
                      "base": "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-dark-mode dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                      "active": "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
                      "disabled": "cursor-not-allowed opacity-50"
                    }
                  }
                }
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

export default TableForAllProvincesEachFoodEstate