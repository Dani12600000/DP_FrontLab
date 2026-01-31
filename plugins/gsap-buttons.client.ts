import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'

export default defineNuxtPlugin(() => {
    if (import.meta.server) return

    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
        const initButtons = () => {
            console.log('🔵 Initializing GSAP button effects...')
            const buttons = document.querySelectorAll('.v-btn:not(.gsap-initialized)')
            console.log(`Found ${buttons.length} buttons to initialize`)
            
            buttons.forEach((btn) => {
                const button = btn as HTMLElement
                button.classList.add('gsap-initialized')

                // Create fill element
                const fill = document.createElement('span')
                fill.classList.add('gsap-fill')
                button.insertBefore(fill, button.firstChild)
                
                console.log('✅ Button initialized with fill element')

                button.addEventListener('mouseenter', (e: MouseEvent) => {
                    console.log('🖱️ Mouse entered button')
                    const rect = button.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    
                    // Kill any ongoing animations on the fill
                    gsap.killTweensOf(fill)
                    
                    // Add global class to signal cursor component to stop physics
                    document.body.classList.add('cursor-hidden')
                    
                    // Hide cursor (plugin takes control of scale)
                    const cursor = document.getElementById('jelly-cursor')
                    if (cursor) {
                        gsap.killTweensOf(cursor)
                        gsap.to(cursor, { scale: 0, duration: 0.2 })
                    }
                    
                    // Calculate the size needed to cover entire button
                    const maxDistance = Math.sqrt(
                        Math.pow(Math.max(x, rect.width - x), 2) + 
                        Math.pow(Math.max(y, rect.height - y), 2)
                    )
                    
                    // Position fill at mouse position
                    gsap.set(fill, {
                        left: x,
                        top: y,
                        xPercent: -50,
                        yPercent: -50,
                    })

                    // Animate from point to full coverage
                    gsap.fromTo(fill, 
                        {
                            width: 0,
                            height: 0,
                        },
                        {
                            width: maxDistance * 2.5,
                            height: maxDistance * 2.5,
                            duration: 0.6,
                            ease: 'power2.out',
                        }
                    )
                })

                button.addEventListener('mouseleave', (e: MouseEvent) => {
                    const rect = button.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    
                    // Kill any ongoing animations
                    gsap.killTweensOf(fill)
                    
                    // Remove global signaling class
                    document.body.classList.remove('cursor-hidden')
                    
                    // Show cursor again
                    const cursor = document.getElementById('jelly-cursor')
                    if (cursor) {
                        gsap.killTweensOf(cursor)
                        gsap.to(cursor, { scale: 1, duration: 0.3 })
                    }

                    // Shrink back to exit point
                    gsap.to(fill, {
                        left: x,
                        top: y,
                        width: 0,
                        height: 0,
                        duration: 0.4,
                        ease: 'power2.in',
                    })
                })
            })
        }

        // Initialize on load
        window.addEventListener('load', () => {
            setTimeout(initButtons, 500)
            
            // Watch for new buttons
            const observer = new MutationObserver(() => {
                initButtons()
            })
            observer.observe(document.body, { childList: true, subtree: true })
        })
        
        // Also try immediately if DOM is already loaded
        if (document.readyState === 'complete') {
            setTimeout(initButtons, 500)
        }
    }
})
