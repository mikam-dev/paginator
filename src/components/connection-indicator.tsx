"use client"
import { useState, useEffect } from 'react'

export function ConnectionIndicator() {
	// if (process.env.NODE_ENV === 'production') return null
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3000/api/db').then((response) => {
			response.json().then((body) => {
				setIsConnected(body?.connectedToDb);
			});
		})
	}, []);

	return (
		<div className={`fixed bottom-1 right-1 z-50 flex h-6 min-w-6 w-fit items-center justify-center rounded-full p-3 font-mono text-xs animate-pulse ${!isConnected ? 'bg-destructive text-destructive-foreground' : ' bg-primary text-primary-foreground'}`}>
			<div className="block">
				{isConnected ?
					<p>
						Connected to MongoDB with Mongoose
					</p>
					:
					<p>
						Error Connecting To MongoDB
					</p>
				}
			</div>
		</div>
	)
}