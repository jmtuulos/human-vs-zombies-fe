export const storageSave = (key, value) => {
  sessionStorage.setItem(key, value)
}

export const storageRead = (key) => {
  const data = sessionStorage.getItem(key)
  if (data === null)
    return null
  return JSON.parse(data)
}

export const storageDelete = () => {
  sessionStorage.clear()
}
