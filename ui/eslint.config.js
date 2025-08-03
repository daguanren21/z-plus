// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {
    vue: true,
    typescript: true,
    ignores: ['**/fixtures/**'],
  },
)
