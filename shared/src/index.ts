/** Public user shape returned by the auth endpoints. */
export interface User {
  id: string;
  name: string;
  email: string;
}

export type NameGender = 'boy' | 'girl';

/** A name a user saved as a favorite. */
export interface FavoriteName {
  name: string;
  gender?: NameGender;
}
