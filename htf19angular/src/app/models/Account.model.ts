export interface Account {
  id: string;
  name: string;
  country: string;
  gender: string;
  birthday: string;
  card: {
    id: string;
    iban: string;
    date: string;
    balance: number;
  };
}
