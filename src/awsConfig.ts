import {S3Client} from "@aws-sdk/client-s3";

export const SUPABASE_URL = "https://kabqjysokbrpvxtxbjsl.storage.supabase.co";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: "6a58b8426ff85db372963f9aca72f415",
    secretAccessKey:
      "bdc2207e8210f29d90b86000bb3a88d020844478c9a7399105dc4573b085603c"
  },
  endpoint: `${SUPABASE_URL}/storage/v1/s3`,
  region: "ap-south-1",
  forcePathStyle: true
  
});
export default s3Client;