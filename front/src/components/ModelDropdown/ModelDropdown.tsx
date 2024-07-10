import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select } from 'antd'

const { Option } = Select

interface ModelDropdownProps {
	brandId: number | null
	onChange: (value: number) => void
	value: number | null
}

const ModelDropdown: React.FC<ModelDropdownProps> = ({
	brandId,
	onChange,
	value,
}) => {
	const [models, setModels] = useState<{ id: number; name: string }[]>([])
	const [selectedModel, setSelectedModel] = useState<string>('')

	useEffect(() => {
		console.log('ModelDropdown useEffect triggered with brandId:', brandId)
		const fetchModels = async () => {
			if (brandId !== null) {
				try {
					console.log('Fetching models for brand ID:', brandId)
					const response = await axios.get(
						`http://localhost:3000/api/models?brandId=${brandId}`
					)
					console.log('Fetched models:', response.data)
					setModels(response.data)
				} catch (error) {
					console.error('Ошибка при получении данных моделей:', error)
				}
			} else {
				setModels([])
			}
		}

		fetchModels()
	}, [brandId])

	const handleChange = (value: number) => {
		console.log('Model selected:', value)
		const selectedModel = models.find(model => model.id === value)
		if (selectedModel) {
			onChange(value)
			setSelectedModel(selectedModel.name)
		}
	}

	return (
		<div>
			<Select
				showSearch
				placeholder='Выберите модель'
				onChange={handleChange}
				value={value}
				style={{ width: '100%' }}
				disabled={brandId === null}
			>
				{models.map(model => (
					<Option key={model.id} value={model.id}>
						{model.name}
					</Option>
				))}
			</Select>
			{selectedModel && (
				<div style={{ marginTop: '10px' }}>
					<strong>Выбранная модель:</strong> {selectedModel}
				</div>
			)}
		</div>
	)
}

export default ModelDropdown
