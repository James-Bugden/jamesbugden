import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-gold': 'linear-gradient(135deg, hsl(40 48% 47%) 0%, hsl(40 48% 38%) 100%)',
  			'gradient-gold-light': 'linear-gradient(135deg, hsl(40 48% 47%) 0%, hsl(40 56% 62%) 100%)'
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
			gold: {
				DEFAULT: 'hsl(40 48% 47%)',
				dark: 'hsl(40 48% 38%)',
				light: 'hsl(40 56% 62%)',
				soft: 'hsl(43 60% 89%)'
			},
			cream: {
				DEFAULT: 'hsl(43 60% 89%)',
				light: 'hsl(40 45% 98%)',
				'70': 'hsla(43, 60%, 89%, 0.7)',
				'90': 'hsla(43, 60%, 89%, 0.9)'
			},
			executive: {
				DEFAULT: 'hsl(153 72% 14%)',
				light: 'hsl(153 73% 20%)',
				green: 'hsl(153 72% 14%)'
			},
			'executive-green': 'hsl(153 72% 14%)',
			'green-deep': 'hsl(153 72% 14%)',
			paper: 'hsl(40 45% 98%)',
			'paper-alt': 'hsl(43 28% 94%)',
  		},
  		fontFamily: {
  			heading: [
  				'Geist',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'sans-serif'
  			],
  			sans: [
  				'Geist',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji'
  			],
  			display: [
  				'Geist',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'SF Pro Display',
  				'Segoe UI',
  				'sans-serif'
  			],
  			brand: [
  				'Inter Tight',
  				'Geist',
  				'-apple-system',
  				'sans-serif'
  			],
  			serif: [
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'DM Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			premium: '0 8px 24px hsla(153, 72%, 14%, 0.08)',
  			'premium-hover': '0 16px 40px hsla(153, 72%, 14%, 0.12)',
  			gold: '0 4px 12px hsla(40, 48%, 47%, 0.3)',
  			'gold-hover': '0 6px 20px hsla(40, 48%, 47%, 0.4)'
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
  			'fade-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'logo-scroll': {
  				'0%': {
  					transform: 'translateX(0)'
  				},
				'100%': {
					transform: 'translateX(-50%)'
				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out forwards',
  			'logo-scroll': 'logo-scroll 45s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;