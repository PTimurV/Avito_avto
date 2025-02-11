import React, { useState } from 'react'
import { Select } from 'antd'
const { Option } = Select
import useAxios from '../../AxiosHook/useAxios'

interface BrandDropdownProps {
	onChange: (value: number, brandId: number) => void
	value: number | null
}

const BrandDropdown: React.FC<BrandDropdownProps> = ({ onChange, value }) => {
	const [brands, setBrands] = useState<{ id: number; name: string }[]>([])
	const [selectedBrand, setSelectedBrand] = useState<string>('')
	const { get } = useAxios()

	const fetchBrands = async () => {
		try {
			const data = await get('/brands')
			console.log('Fetched brands:', data)
			setBrands(data)
		} catch (error) {
			console.error('Ошибка при получении данных марок:', error)
		}
	}

	const handleChange = (value: number) => {
		console.log('Brand selected:', value)
		const selectedBrand = brands.find(brand => brand.id === value)
		if (selectedBrand) {
			console.log('Selected brand ID:', selectedBrand.id)
			onChange(value, selectedBrand.id)
			setSelectedBrand(selectedBrand.name)
		}
	}

	return (
		<div>
			<Select
				showSearch
				placeholder='Выберите марку'
				onFocus={fetchBrands}
				onChange={handleChange}
				value={value}
				style={{ width: '100%' }}
			>
				{brands.map(brand => (
					<Option key={brand.id} value={brand.id}>
						{brand.name}
					</Option>
				))}
			</Select>
			{selectedBrand && (
				<div style={{ marginTop: '10px' }}>
					<strong>Выбранная марка:</strong> {selectedBrand}
				</div>
			)}
		</div>
	)
}

export default BrandDropdown
