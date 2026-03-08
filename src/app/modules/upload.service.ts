
export async function uploadProjectFile(file: File, projectId: string) {

  // lấy chữ ký
  const signRes = await fetch("/api/upload/projects/sign", {
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
    public_id: uploadData.public_id,
    target_id: projectId,
    target_type: "project"
  }
  console.log("attachmentData", attachmentData)
  await createAttachment(attachmentData)
  return uploadData;
}
type AttachmentData = {
  url: string;
  secure_url: string;
  size_bytes: string;
  original_name: string;
  public_id: string;
  target_id?: string;
  target_type: string;
}
async function createAttachment(data: AttachmentData) {
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


export async function uploadBrokerAvatar(file: File, brokerSlug: string) {
  // lấy chữ ký
  const signRes = await fetch("/api/upload/avatar/sign", {
    method: "POST"
  })

  const { timestamp, signature, cloudName, apiKey } =
    await signRes.json()

  const formData = new FormData()

  formData.append("file", file)
  formData.append("api_key", apiKey)
  formData.append("timestamp", timestamp)
  formData.append("signature", signature)
  formData.append("folder", "finland/brokers")

  try {
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData
      }
    )
    const uploadData = await uploadRes.json()
    console.log("uploadData", uploadData)
    await fetch("/api/brokers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: brokerSlug,
        avatar_url: uploadData.secure_url
      })
    })
    return uploadData;
  }
  catch (err) {
    console.log(err)
  }
}

export async function uploadAttachments(file: File) {
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
  formData.append("folder", "finland/attachments")

  try {
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
      public_id: uploadData.public_id,
      target_type: "admin"
    }
    console.log("attachmentData", attachmentData)
    await createAttachment(attachmentData)
    return uploadData;
  }
  catch (err) {
    console.log(err)
  }
}