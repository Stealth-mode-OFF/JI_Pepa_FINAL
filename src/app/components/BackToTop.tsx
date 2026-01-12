import React, { useEffect, useState } from 'react';

const BackToTop = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 300);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (!visible) return null;

	return (
		<button
			onClick={scrollToTop}
			className="fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all hover:scale-110"
			aria-label="Back to top"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M10 15V5M5 10l5-5 5 5" />
			</svg>
		</button>
	);
};

export default BackToTop;