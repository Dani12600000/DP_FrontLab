export const useAssetPath = () => {
  const config = useRuntimeConfig()
  
  const getAssetPath = (path: string): string => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${config.app.baseURL}${cleanPath}`
  }
  
  return {
    getAssetPath
  }
}
