import deDE from '../config/de-de'
import enUS from '../config/en-us'

export default function getConfig() {
  return process.env.LOCALE === 'de-de' ? deDE : enUS
}
