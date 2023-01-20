export interface Environment {
  name: 'local' | 'sbx' | 'dev' | 'qa' | 'prod';
  region: string;
  profile?: string;

  database: {
    engine: 'aurora-postgres' | 'postgres' | '';
    database: string;
    username?: string;
    password?: string;
    host?: string;
    port?: number;
    secretArn?: string;
    resourceArn?: string;
  };

  s3Buckets: {
    static: string;
  };
}
