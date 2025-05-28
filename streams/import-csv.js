import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParser = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2, // Skip the header line
})

async function importCsv() {
  const linesParsed = stream.pipe(csvParser)

  for await (const line of linesParsed) {
    const [title, description] = line

    await fetch('http://localhost:3333/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })

    console.log(`Imported todo: ${title}`)
    console.log('........................')
    await wait(1000)
  }
}

importCsv()

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
