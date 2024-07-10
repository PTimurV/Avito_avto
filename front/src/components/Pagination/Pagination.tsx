import React from 'react'

interface PaginationProps {
	page: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	page,
	totalPages,
	onPageChange,
}) => {
	return (
		<div className='pagination'>
			<button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
				Previous
			</button>
			<span>
				{page} / {totalPages}
			</span>
			<button
				onClick={() => onPageChange(page + 1)}
				disabled={page >= totalPages}
			>
				Next
			</button>
		</div>
	)
}

export default Pagination
