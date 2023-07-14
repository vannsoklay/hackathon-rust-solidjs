type User = {
  fullname: string;
  email: string;
  avatar: string;
};

type Profile = {
  email: string,
  first_name: string;
  last_name: string,
  phone_number: string | undefined
}

type LoginForm = {
  email: string,
  password: string,
}