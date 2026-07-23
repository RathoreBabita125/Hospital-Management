import { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationContextProvider = ({children}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <PaginationContext.Provider value={{page, setPage, rowsPerPage, setRowsPerPage, handleChangePage, handleChangeRowsPerPage}}>
                {children}
            </PaginationContext.Provider>
        </>
    )
}