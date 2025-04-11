
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
                // Solo Leveling theme colors
                solo: {
                    dark: '#0F1421',
                    darker: '#080A11',
                    blue: '#2E6BFF',
                    'blue-light': '#5D8DFF',
                    'blue-glow': '#3178FF',
                    accent: '#1F4BC7',
                    gray: '#2A2E3A',
                    'gray-light': '#3D4253',
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'pulse-glow': {
                    '0%, 100%': { 
                        opacity: '1',
                        filter: 'brightness(1) blur(0px)'
                    },
                    '50%': { 
                        opacity: '0.8',
                        filter: 'brightness(1.2) blur(1px)'
                    }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'shine': {
                    '0%': { 'background-position': '0% 50%' },
                    '100%': { 'background-position': '200% 50%' }
                },
                'progress-fill': {
                    '0%': { width: '0%' },
                    '100%': { width: 'var(--progress-width, 100%)' }
                },
                'page-transition-in': {
                    '0%': { 
                        opacity: '0',
                        transform: 'translateY(20px) scale(0.98)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'translateY(0) scale(1)'
                    }
                },
                'page-transition-out': {
                    '0%': { 
                        opacity: '1',
                        transform: 'translateY(0) scale(1)'
                    },
                    '100%': { 
                        opacity: '0',
                        transform: 'translateY(-20px) scale(0.98)'
                    }
                },
                'status-ping': {
                    '75%, 100%': {
                        transform: 'scale(2)',
                        opacity: '0'
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.4s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'shine': 'shine 3s linear infinite',
                'progress-fill': 'progress-fill 1s ease-out forwards',
                'page-in': 'page-transition-in 0.4s ease-out',
                'page-out': 'page-transition-out 0.4s ease-out',
                'status-ping': 'status-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
			},
            boxShadow: {
                'glow-sm': '0 0 10px rgba(49, 120, 255, 0.3)',
                'glow-md': '0 0 15px rgba(49, 120, 255, 0.4)',
                'glow-lg': '0 0 20px rgba(49, 120, 255, 0.5)',
                'inner-glow': 'inset 0 0 15px rgba(49, 120, 255, 0.3)',
            },
            backgroundImage: {
                'solo-gradient': 'linear-gradient(180deg, #080A11 0%, #0F1421 100%)',
                'blue-gradient': 'linear-gradient(90deg, #2E6BFF 0%, #1F4BC7 100%)',
                'glow-gradient': 'linear-gradient(90deg, rgba(49, 120, 255, 0) 0%, rgba(49, 120, 255, 0.3) 50%, rgba(49, 120, 255, 0) 100%)',
                'border-gradient': 'linear-gradient(90deg, transparent, #3178FF, transparent)',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
