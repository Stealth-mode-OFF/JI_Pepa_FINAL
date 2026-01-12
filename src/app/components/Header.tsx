import React, { useState, useEffect } from "react";
import imgLogo from "@/assets/124f29e0ef24dafb79bc86048bd5b9381b5354c6.png";
import { FlagIcon } from "./Icons";
import { useLocale } from '../LocaleContext';

export const Header = () => {
	const { locale, setLocale } = useLocale();
	const [activeSection, setActiveSection] = useState('');

	useEffect(() => {
		const sections = document.querySelectorAll('[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ rootMargin: '-100px 0px -70% 0px' }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	const navItems = [
		{ label: "Method", href: "#method" },
		{ label: "Courses", href: "#courses" },
		{ label: "Contact", href: "#contact" }
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 h-20 flex items-center">
			<div className="w-full px-6 md:px-12 flex items-center justify-between">
				<img src={imgLogo} alt="Logo" className="w-12 h-12 object-contain" />
				
				<div className="flex items-center gap-8">
					<nav className="hidden md:flex items-center gap-8">
						{navItems.map((item) => (
							<a 
								key={item.label} 
								href={item.href} 
								className={`font-['Inter'] font-bold text-xs uppercase tracking-widest transition-colors relative ${
									activeSection === item.href.slice(1) 
										? 'text-black after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#FFED00]' 
										: 'text-gray-600 hover:text-black'
								}`}
							>
								{item.label}
							</a>
						))}
					</nav>
					
					<div className="h-6 w-px bg-gray-200 hidden md:block" />
					
					<button onClick={() => setLocale(locale === 'en' ? 'cs' : 'en')} className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors">
						<FlagIcon />
						<span className="sr-only">Change Language</span>
						<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M1 1L5 5L9 1" />
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
};
