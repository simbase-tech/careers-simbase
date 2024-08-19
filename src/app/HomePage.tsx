'use client'

import uniqueid from 'lodash.uniqueid'
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react'
import Input from './_components/input'
import styles from './homePage.module.scss'
import { StructuredText, StructuredTextGraphQlResponse } from 'react-datocms'
import { render } from 'datocms-structured-text-to-plain-text'

interface IHomePageProps {
  commands: any
  subCommands: any
  errorCommands: any
}

interface IOutputElement {
  id: string
  input: string
  value: StructuredTextGraphQlResponse | string
  isError?: boolean
}

const isSubCommand = (subCommands: any, key: string) =>
  Boolean(Object.keys(subCommands[key]).length)

const HomePage = ({ commands, subCommands, errorCommands }: IHomePageProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [output, setOutput] = useState<IOutputElement[]>([])

  const handleOnChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value)
  }

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    inputRef.current?.focus()
  }
  const handleListClick: MouseEventHandler<HTMLUListElement> = (e) => {
    e.stopPropagation()

    // inputRef.current?.focus()
  }

  const handleOnKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = inputValue.trim().toLowerCase()

    const words = value.split(' ')
    const firstWord = words[0]
    const restOfSentence = words.slice(1).join(' ')

    if (event.key === 'Enter') {
      if (value in commands) {
        setOutput((prevState) => [
          ...prevState,
          {
            id: uniqueid(),
            input: inputValue,
            value: commands[value],
          },
        ])
      } else if (
        firstWord in subCommands &&
        isSubCommand(subCommands, firstWord)
      ) {
        if (subCommands[firstWord][restOfSentence]) {
          setOutput((prevState) => [
            ...prevState,
            {
              id: uniqueid(),
              input: inputValue,
              value: subCommands[firstWord][restOfSentence],
            },
          ])
        } else {
          setOutput((prevState) => [
            ...prevState,
            {
              id: uniqueid(),
              input: inputValue,
              value: `${
                render(errorCommands[firstWord].textCommand)?.replace(
                  '<command entered>',
                  restOfSentence
                ) as string
              }`,
              isError: true,
            },
          ])
        }
      } else if (value === '') {
        setOutput((prevState) => [
          ...prevState,
          {
            id: uniqueid(),
            input: inputValue,
            value: '',
          },
        ])
      } else if (value === 'clear') {
        setOutput([])
      } else {
        setOutput((prevState) => [
          ...prevState,
          {
            id: uniqueid(),
            input: inputValue,
            value: render(
              errorCommands['no such command'].textCommand
            )?.replace('<command entered>', inputValue) as string,
            isError: true,
          },
        ])
      }

      setInputValue('')
    }
  }

  return (
    <div onClick={handleContainerClick} className={styles.homePage}>
      <div className={styles.homePage__container}>
        <h1 className={styles.homePage__title}>Careers Simbase</h1>
        <ul onClick={handleListClick} className={styles.homePage__list}>
          {output.map(({ id, input, value, isError }) => (
            <li className={styles.homePage__listItem} key={id}>
              <span className={styles.homePage__listItemInput}>
                &gt; {input}
              </span>
              <div className={styles.homePage__listItemValue}>
                {isError ? (
                  (value as string)
                ) : (
                  <StructuredText
                    data={value as StructuredTextGraphQlResponse}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
        <Input
          ref={inputRef}
          autoFocus
          className={styles.homePage__input}
          value={inputValue}
          onChange={handleOnChangeInput}
          onKeyDown={handleOnKeyDownInput}
        />
      </div>
    </div>
  )
}

export default HomePage
