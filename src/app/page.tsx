import { performRequest } from '@/lib/datocms'
import HomePage from './HomePage'
import { HOME_PAGE_QUERY } from './homePage.query'
import { StructuredTextGraphQlResponse, toNextMetadata } from 'react-datocms'

interface ICommand {
  id: string
  command: string
  textCommand: StructuredTextGraphQlResponse
  subCommand: Omit<ICommand, 'subCommand'>[]
}

interface IErrorCommand extends Omit<ICommand, 'subCommand'> {}

const convertCommandsArrayToObject = (
  commands: ICommand[],
  errorCommandsArray: IErrorCommand[]
) => {
  const subCommands = {}
  const commandsReduce = commands.reduce(
    (acc: { [key: string]: string | StructuredTextGraphQlResponse }, item) => {
      acc[item.command] = item.textCommand
      const subCommandsReduce: any = {}
      subCommandsReduce[item.command] = item.subCommand.reduce(
        (
          acc: { [key: string]: string | StructuredTextGraphQlResponse },
          item
        ) => {
          acc[item.command] = item.textCommand
          return acc
        },
        {}
      )
      Object.assign(subCommands, subCommandsReduce)
      return acc
    },
    {}
  )

  const errorCommandsReduce = errorCommandsArray.reduce(
    (acc: { [key: string]: Omit<IErrorCommand, 'id'> }, item) => {
      acc[item.command] = {
        textCommand: item.textCommand as StructuredTextGraphQlResponse,
        command: item.command,
      }
      return acc
    },
    {}
  )

  return {
    commands: commandsReduce,
    subCommands,
    errorCommands: errorCommandsReduce,
  }
}

export async function generateMetadata() {
  const homePageData = await performRequest({ query: HOME_PAGE_QUERY })

  return {
    title: homePageData.data.home.seo.title,
    description: homePageData.data.home.seo.description,
  }
}

export default async function Home() {
  const commandsData = await performRequest({ query: HOME_PAGE_QUERY })
  const commandsArray = commandsData.data?.allCommands || []
  const errorCommandsArray = commandsData.data?.allErrorCommands || []

  const { commands, subCommands, errorCommands } = convertCommandsArrayToObject(
    commandsArray,
    errorCommandsArray
  )

  return (
    <HomePage
      commands={commands}
      subCommands={subCommands}
      errorCommands={errorCommands}
    />
  )
}
