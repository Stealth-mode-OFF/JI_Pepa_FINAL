import React, { useState } from 'react';

const AdminLoginModal = () => {
	const [password, setPassword] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle login logic
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button type="submit">Login</button>
		</form>
	);
};

export default AdminLoginModal;