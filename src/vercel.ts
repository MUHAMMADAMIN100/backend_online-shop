import { Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { createApp } from './main';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await createApp();
  await app.init();
  return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}

export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  if (!server) {
    bootstrap().then((s) => s(event, context, callback));
  } else {
    server(event, context, callback);
  }
};
