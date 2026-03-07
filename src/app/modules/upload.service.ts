
export async function uploadProjectFile(file: File, projectId: string) {

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
  const uploadData = await uploadRes.json()
  console.log("uploadData", uploadData)
  const attachmentData: AttachmentData = {
    url: uploadData.url,
    secure_url: uploadData.secure_url,
    size_bytes: uploadData.bytes.toString(),
    original_name: uploadData.original_filename,
    project_id: projectId,
    public_id: uploadData.public_id
  }
  console.log("attachmentData", attachmentData)
  createAttachment(attachmentData).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  // fire and forget
  return uploadData;
}
type AttachmentData = {
  url: string;
  secure_url: string;
  size_bytes: string;
  original_name: string;
  project_id: string;
  public_id: string;
}
async function createAttachment(data: AttachmentData): Promise<any> {
  const res = await fetch("/api/attachments", {
    method: "POST",
    body: JSON.stringify(data)
  })
  return await res.json()
}

export async function deleteAttachment(id: string) {
  const res = await fetch(`/api/attachments/${id}`, {
    method: 'DELETE'
  })
  return await res.json()
}
