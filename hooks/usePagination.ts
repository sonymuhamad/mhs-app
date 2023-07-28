import { useState } from "react";

const PAGE_SIZE = 10; // Number of items per page

export default function usePagination<T>({data}:{data:T[]}){

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentPageData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / PAGE_SIZE);

    return {
        totalPages,
        setCurrentPage,
        currentPageData,
        currentPage
    }

}