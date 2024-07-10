import React, { useState } from 'react'

interface CarImageSliderProps {
	photos: string[]
}

const CarImageSlider: React.FC<CarImageSliderProps> = ({ photos }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const nextImage = () => {
		setCurrentImageIndex(prevIndex =>
			prevIndex === photos.length - 1 ? 0 : prevIndex + 1
		)
	}

	const prevImage = () => {
		setCurrentImageIndex(prevIndex =>
			prevIndex === 0 ? photos.length - 1 : prevIndex - 1
		)
	}

	const getDisplayedPhotos = () => {
		if (photos.length < 2) return photos

		const secondIndex = (currentImageIndex + 1) % photos.length
		return [photos[currentImageIndex], photos[secondIndex]]
	}

	return (
		<div className='car-detail__slider'>
			<button onClick={prevImage} className='slider-button prev-button'>
				‹
			</button>
			<div className='car-detail__images'>
				{getDisplayedPhotos().map((photo, index) => (
					<img
						key={index}
						src={photo}
						alt={`Car ${currentImageIndex + index + 1}`}
					/>
				))}
			</div>
			<button onClick={nextImage} className='slider-button next-button'>
				›
			</button>
		</div>
	)
}

export default CarImageSlider
