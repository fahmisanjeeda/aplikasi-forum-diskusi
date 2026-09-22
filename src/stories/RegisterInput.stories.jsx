import RegisterInput from '../components/RegisterInput';

export default {
  title: 'Components/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    register: (userData) => {
      console.log('Register attempt:', userData);
    },
  },
};

