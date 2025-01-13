import * as readline from 'readline'
import { allPaths } from './js/findRoutes'
import { FlightList } from './js/flightList'
import { parseCommand } from './js/parseCommand'

const flights = new FlightList

console.log()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
//   terminal: false
})

rl.on("line", (line: string) => {
  const newLine = line.trim()
  console.log(newLine)
  if (!newLine) {
    return
  }

  const processedCmd = parseCommand(newLine)
  if (!processedCmd) {
    handleMalformed(newLine)
    return
  }

  const { command, params } = processedCmd

  switch (command) {
    case "ADD":
      handleAdd(params)
      break
    case "QUERY":
      handleQuery(params)
      break
    default:
      handleMalformed(newLine)
      break
  }
})

function handleAdd(params: string[]) {
  if (params.length !== 4) {
    handleMalformed(`ADD,${params.join(",")}`)
    return
  }

  const [ origin, destination, distStr, timeStr ] = params

  if (!origin || !destination || !distStr || !timeStr) {
    handleMalformed(`ADD,${params.join(",")}`)
    return
  }

  const distance = parseFloat(distStr)
  const time = parseFloat(timeStr)

  if (isNaN(distance) || distance < 0 || isNaN(time) || time < 0) {
    handleMalformed(`ADD,${params.join(",")}`)
    return
  }

  flights.addOrUpdateFlight(origin, destination, distance, time)

  console.log(`EDGE ${origin},${destination},${distStr},${timeStr}`)
}

function handleQuery(params: string[]) {
  if (params.length !== 2) {
    handleMalformed(`QUERY,${params.join(",")}`)
    return
  }

  const [ origin, destination ] = params

  if (!origin || !destination) {
    handleMalformed(`QUERY,${params.join(",")}`)
    return
  }

  const paths = allPaths(
    flights.getFlights(),
    origin,
    destination
  )

  if (paths.length === 0) {
    handleMalformed(`QUERY,${params.join(",")}`)
    return
  }

  console.log(`RESULT ${origin},${destination}`)

  paths.sort((a, b) => a.cost = b.cost)

  for (const path of paths) {
    const pathStr = `PATH ${path.cost},${path.cities.join(",")}`
    console.log(pathStr)
  }
}

function handleMalformed(line: string) {
  console.error(`MALFORMED ${line}`)
}