// withErrorBoundary.tsx
import React, { ComponentType } from 'react'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const withErrorBoundary = (WrappedComponent: ComponentType) => {
	return (props: any) => (
		<ErrorBoundary>
			<WrappedComponent {...props} />
		</ErrorBoundary>
	)
}

export default withErrorBoundary
