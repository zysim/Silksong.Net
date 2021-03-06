const { Buffer } = require('buffer')
const fs = require('fs')
const https = require('https')
const process = require('process')
const querystring = require('querystring')

const API_KEY = process.env.API_KEY

if (!API_KEY) {
  console.error(
    '\x1b[101m\x1b[1m\x1b[38;2;255;255;255m%s\x1b[0m',
    ' No API key given! Quitting. ',
  )
  return 1
}

fs.open('getVidLinkDebugOutput.txt', (openErr, fd) => {
  if (error) {
    fs.close(fd, closeErr => {
      throw closeErr
    })
    throw openErr
  }
  
  callYoutubeApi(fd)
})

const callYoutubeApi = fd => {
  const req = https.request(
    {
      hostname: 'youtube.googleapis.com',
      path: `/youtube/v3/search?${querystring.stringify({
        part: 'snippet',
        channelId: 'UC9OmOMZS6rU0_jIdZOxSHxw',
        maxResults: 1,
        order: 'date',
        type: 'video',
        key: API_KEY,
      })}`,
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    },
    (() => {
      const dataRaw = []
      return res => {
        res.on('data', d => {
          fs.write(fd, d, fileWriteCb)
          dataRaw.push(d)
        })

        res.on('end', () => {
          const dataFull = JSON.parse(Buffer.concat(dataRaw).toString())
          fs.write(fd, dataFull, fileWriteCb)
          console.log(dataFull.items[0].id.videoId)
        })
      }
    })(),
  )

  req.on('error', e =>
    console.error('\x1b[101m\x1b[1m\x1b[38;2;255;255;255m%s\x1b[0m', e),
  )

  req.end()
}

const fileWriteCb = (err, bytesWritten) => {
  if (err) throw err
}
