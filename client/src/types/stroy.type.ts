type ProfileType = {
  fullname: string;
  email: string;
  avatar: string;
};

type CardType = {
  story: Story;
  url: string;
};

type Stories = {
  thumail: string;
  title: string;
  des: string;
  editor: string;
};

type Story = {
  user: User;
  read: Read;
  stories: Stories;
};
