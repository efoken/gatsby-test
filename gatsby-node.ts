import { GatsbyNode } from 'gatsby'
import deDE from './src/config/de-de'
import enUS from './src/config/en-us'

// eslint-disable-next-line import/prefer-default-export
export const onCreatePage: GatsbyNode['onCreatePage'] = async ({
  actions,
  page
}) => {
  actions.createPage({
    ...page,
    context: {
      ...page.context,
      config: process.env.LOCALE === 'de-de' ? deDE : enUS
    }
  })
}
