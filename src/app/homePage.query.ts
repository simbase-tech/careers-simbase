export const HOME_PAGE_QUERY = `
  query Home {
    home {
      seo {
        title
        description
      }
    }
    allCommands {
      id
      command

      textCommand {
        value
        blocks
        links
        __typename
      }

      subCommand {
        id
        command
        textCommand {
          value
          blocks
          links
          __typename
        }
      }
    }
    allErrorCommands {
      id
      command
      textCommand {
        value
        blocks
        links
        __typename
      }
    }
  }`
