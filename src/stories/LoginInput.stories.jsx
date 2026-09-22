import LoginInput from '../components/LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    login: (credentials) => {
      console.log('Login attempt:', credentials);
    },
  },
};

