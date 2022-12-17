export interface PostInputs {
  title: string;
  body: string;
}

export interface PostData extends PostInputs {
  id: number;
  user_uid: string;
  created_at: string;
}
