import React from 'react'
import './Pagination.css'

const Pagination = ({nPages, currentPage, setCurrentPage}) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const goToNextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
        
    }

    const goToPreviousPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
        
    }

  return (
    <div>
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a href="#" onClick={goToPreviousPage} className="page-link">
                        Previous
                    </a>
                </li>


                {pageNumbers.map(pgNumber => (
                    currentPage <= pgNumber + 2 && currentPage >= pgNumber - 2 || pgNumber === 1 || pgNumber === nPages   ? 

                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}  // Click event handler for setting the current page
                            className='page-link' 
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                    :
                    ''
                ))}

                <li className='page-item'>
                    <a href="#" onClick={goToNextPage} className="page-link">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Pagination