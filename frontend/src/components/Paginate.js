import React from 'react'
import { Pagination } from 'react-bootstrap'

function Paginate({ keyword='', page, pages, isAdmin=false}) {

    if( keyword ){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    console.log(keyword)

    return (
        page >= 1 && (
            <Pagination>
                {[...Array(pages).keys()].map( (currentPage) => {
                        return (
                            <Pagination.Item
                                key={currentPage + 1}
                                href={isAdmin ? `/admin/productlist/?keyword=${keyword}&page=${currentPage + 1}` : `/?keyword=${keyword}&page=${currentPage + 1}` }
                                active={page === currentPage + 1}
                            > {currentPage + 1} </Pagination.Item>
                        )
                    } )
                }
            </Pagination>
        )
    )
}

export default Paginate
