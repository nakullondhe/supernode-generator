require('dotenv').config()
const winston = require('winston')

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  const env = process.env.NODE_ENV
  return env === 'development' ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.cli(),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/system/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/server/all.log' })
]

const loggerOptions = {
  level: level(),
  format,
  transports
}

if (process.env.NODE_ENV === 'production') {
  loggerOptions.levels = levels
}

const Logger = winston.createLogger(loggerOptions)

module.exports = Logger
