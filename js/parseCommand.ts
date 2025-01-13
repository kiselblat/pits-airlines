import { ParsedCommand } from "./types";

export function parseCommand(line: string): ParsedCommand | null {
  const spaceIdx = line.indexOf(" ");
  if (spaceIdx === -1) {
    return null
  }

  const command = line.substring(0, spaceIdx).trim()
  const paramStr = line.substring(spaceIdx + 1).trim()

  if (!command) return null

  const params = paramStr.split(",").map(param => param.trim())

  return { command, params }
}