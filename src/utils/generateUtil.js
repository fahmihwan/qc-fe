
export const fGeneratePaginationNumber = (paginatePage, paginateTotalPage, paginateLimit) => {
    const pageNumbers = [];
    const maxPagesToShow = paginateLimit;
    let startPage = Math.max(1, paginatePage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(paginateTotalPage, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers
}


export const fCalculatePaginateIteration = (paginatePage, maxPagesToShow) => {
    return (paginatePage - 1) * maxPagesToShow + 1;
}

export const fFormatDateTimeUtil = (inputDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);

    // Format tanggal menggunakan toLocaleDateString
    const formattedDate = date.toLocaleDateString('id-ID', options);

    // Format waktu (jam dan menit)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    // Gabungkan tanggal dan waktu
    return `${formattedDate}  - ${formattedTime} WIB`;
};
