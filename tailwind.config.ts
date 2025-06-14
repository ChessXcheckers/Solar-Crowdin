
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'], // Futuristic sci-fi font
				'inter': ['Inter', 'sans-serif'], // Clean modern font
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Solar AI Brand System
				brand: {
					// Core Gold Palette
					gold: {
						50: '#FFFEF7',
						100: '#FEFCEB',
						200: '#FEF7CD',
						300: '#FEEFAF',
						400: '#FDDF74',
						500: '#FFD700', // Primary Gold
						600: '#E6C200',
						700: '#B8A000',
						800: '#8A7500',
						900: '#5C4E00'
					},
					// Core Blue Palette
					blue: {
						50: '#EFF6FF',
						100: '#DBEAFE',
						200: '#BFDBFE',
						300: '#93C5FD',
						400: '#60A5FA',
						500: '#3B82F6', // Primary Blue
						600: '#2563EB',
						700: '#1D4ED8',
						800: '#1E40AF',
						900: '#1E3A8A'
					},
					// Core Red Palette
					red: {
						50: '#FEF2F2',
						100: '#FEE2E2',
						200: '#FECACA',
						300: '#FCA5A5',
						400: '#F87171',
						500: '#EF4444', // Primary Red
						600: '#DC2626',
						700: '#B91C1C',
						800: '#991B1B',
						900: '#7F1D1D'
					},
					// Neutral Palette
					dark: '#0A0B0F',
					surface: '#1A1B23',
					glass: 'rgba(255, 255, 255, 0.1)',
					white: '#FFFFFF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
				'gradient-blue': 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
				'gradient-red': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
				'gradient-cosmic': 'linear-gradient(135deg, #FFD700 0%, #3B82F6 33%, #EF4444 66%, #FFD700 100%)',
				'gradient-brand': 'linear-gradient(135deg, #0A0B0F 0%, #1A1B23 50%, #0A0B0F 100%)'
			},
			boxShadow: {
				'gold-glow': '0 0 20px rgba(255, 215, 0, 0.5)',
				'blue-glow': '0 0 20px rgba(59, 130, 246, 0.5)',
				'red-glow': '0 0 20px rgba(239, 68, 68, 0.5)',
				'cosmic-glow': '0 0 30px rgba(255, 215, 0, 0.3), 0 0 60px rgba(59, 130, 246, 0.2), 0 0 90px rgba(239, 68, 68, 0.1)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-cosmic': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(59, 130, 246, 0.2), 0 0 60px rgba(239, 68, 68, 0.1)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(59, 130, 246, 0.3), 0 0 90px rgba(239, 68, 68, 0.2)',
						transform: 'scale(1.02)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'pulse-cosmic': 'pulse-cosmic 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
