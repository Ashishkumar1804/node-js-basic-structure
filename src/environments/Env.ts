export interface Environment {
  nodeEnv: string,
  apiKey: string,
  dbUrl: string;
  jwtSecret?: string;
  jwtExpiresIn?: string;
  awsAccessKey?: string;
  awsSecretKey?: string;
  s3Bucket?: string;
  s3AssetUrl?: string;
  awsRegion?: string;
  slackToken?: string;
  baseUrl?: string;
  mailFrom: string,
  sendGridApiKey: string,
  amadeusClientSecret: string,
  amadeusClientId: string,
  assetUrl: string,
  mailTo?: string
}

export function env(): Environment {
  return {
    nodeEnv: process.env.NODE_ENV,
    apiKey: process.env.MOBILE_ENCRYPTION_KEY,
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    awsAccessKey: process.env.ACCESS_KEY,
    awsSecretKey: process.env.SECRET_KEY,
    s3Bucket: process.env.S3_BUCKET,
    s3AssetUrl: process.env.S3_ASSET_URL,
    awsRegion: process.env.AWS_REGION,
    baseUrl: process.env.BASE_URL,
    mailFrom: process.env.MAIL_FROM,
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    amadeusClientSecret: process.env.AMADEUS_CLIENT_SECRET,
    amadeusClientId: process.env.AMADEUS_CLIENT_ID,
    assetUrl: process.env.ASSET_URL,
    mailTo: process.env.MAIL_TO
  };
}