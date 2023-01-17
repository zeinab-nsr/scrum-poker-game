export type User = {
  username: string;
  id: string;
  voted: boolean;
}

export type Action<P = any> = {
	type: string;
	payload?: P;
}
