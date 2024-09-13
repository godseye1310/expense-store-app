import React from 'react';
import AuthForm from './components/Auth/AuthForm';
import Header from './components/Layout/Header';

function App() {
	return (
		<>
			<main className="w-full h-full flex flex-col">
				<Header />
				<AuthForm />
			</main>
		</>
	);
}

export default App;
