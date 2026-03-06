export async function uploadProjectFile(file: File) {

  // lấy chữ ký
  const signRes = await fetch("/api/upload/sign", {
    method: "POST"
  })

  const { timestamp, signature, cloudName, apiKey } =
    await signRes.json()

  const formData = new FormData()

  formData.append("file", file)
  formData.append("api_key", apiKey)
  formData.append("timestamp", timestamp)
  formData.append("signature", signature)
  formData.append("folder", "finland/projects")

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData
    }
  )

  return await uploadRes.json()
}