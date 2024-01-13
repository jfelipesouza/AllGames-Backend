import { SupabaseClient, createClient } from '@supabase/supabase-js'

type UploadFileParams = {
  file: Buffer
  folder: string
  fileName: string
  mimeType: string
}
type UploadFileResponse = {
  fileUrl: string
}

const uploadToSupabase = async ({
  file,
  folder,
  fileName,
  mimeType
}: UploadFileParams): Promise<UploadFileResponse> => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase.storage
      .from(folder)
      .upload(fileName, file, {
        upsert: true,
        contentType: mimeType,
        cacheControl: '0'
      })
    if (error) {
      throw new Error(error.message)
    }
    const fileUrl = supabase.storage.from(folder).getPublicUrl(data.path)
      .data.publicUrl

    return { fileUrl }
  } else {
    throw new Error('Supabase Credendials')
  }
}

export { uploadToSupabase }
