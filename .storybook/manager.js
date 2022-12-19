import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  brandTitle: '개념글 저장소',
  brandImage: 'https://static.cocstorage.com/icons/hotlink-ok/android-icon-36x36.png',
  brandUrl: 'https://www.cocstorage.com'
});

addons.setConfig({
  theme
});
