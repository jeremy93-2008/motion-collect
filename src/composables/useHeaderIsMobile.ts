export function useHeaderIsMobile() {
    const isMobile = useState('isMobile', () => false)
    const windowWidth = useState('windowWidth', () => 1280)

    watchEffect(() => {
        const outerWidth = window ? window.outerWidth : 1280
        isMobile.value = outerWidth <= 1024
        windowWidth.value = outerWidth
    })

    onMounted(() => {
        const handleResize = () => {
            const outerWidth = window ? window.outerWidth : 1280
            isMobile.value = outerWidth <= 1024
            windowWidth.value = outerWidth
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
}
