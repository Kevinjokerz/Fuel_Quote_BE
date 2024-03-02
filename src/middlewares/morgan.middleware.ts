import morgan, { TokenIndexer } from 'morgan';
import chalk from 'chalk';
import http from 'http';

interface Request extends http.IncomingMessage {}

interface Response extends http.ServerResponse {}

const morganMiddleware = morgan<Request, Response>(function (
  tokens: TokenIndexer<Request, Response>,
  req: Request,
  res: Response,
) {
  const context = chalk.hex('#ff4757').bold('  Morgan --> ');
  const currentTime = chalk.magenta.bold(new Date().toISOString());
  const method = chalk.hex('#34ace0').bold(tokens.method(req, res));
  const status = chalk.hex('#ffb142').bold(tokens.status(req, res));
  const url = chalk.hex('#ff5252').bold(tokens.url(req, res));
  const responseTime = chalk.hex('#2ed573').bold(tokens['response-time'](req, res), 'ms');
  const remoteAddress = chalk.yellow(tokens['remote-addr'](req, res));
  const referrer = chalk.hex('#fffa65').bold('from', tokens.referrer(req, res));
  const userAgent = chalk.hex('#1e90ff')(tokens['user-agent'](req, res));

  return [context, currentTime, method, status, url, responseTime, remoteAddress, referrer, userAgent].join(' ');
});

export { morganMiddleware };