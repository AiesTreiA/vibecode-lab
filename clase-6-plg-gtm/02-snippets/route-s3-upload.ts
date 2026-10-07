import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { checkFreemiumLimit } from "./check-freemium"; // Nuestro módulo PLG

// Inicializar el cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { filename, contentType, userId } = await req.json();

    // 1. CHEQUEO FREEMIUM (Product-Led Growth)
    const access = await checkFreemiumLimit(userId);
    if (!access.allowed) {
      return NextResponse.json({ 
        error: "Freemium limit reached",
        requiresUpgrade: true
      }, { status: 403 });
    }

    // 2. PREPARAR LA SUBIDA A S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `uploads/${userId}-${Date.now()}-${filename}`,
      ContentType: contentType,
    });

    // Generamos la URL prefirmada (válida por 60 segundos)
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return NextResponse.json({ url: presignedUrl, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
