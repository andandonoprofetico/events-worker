import { Action } from '../domain/dto';
import { listBookById } from './list-book-by-id';
import { listBooks } from './list-books';
import { save } from './save';

export type Actions = {
  name: string;
  handle: Action;
}[];

export const actions: Actions = [
  {
    handle: listBooks,
    name: 'list_books',
  },
  {
    handle: listBookById,
    name: 'detail_book',
  },
  {
    handle: save,
    name: 'save_pray',
  },
  {
    handle: save,
    name: 'save_testimonial',
  },
  {
    handle: save,
    name: 'save_dream',
  },
  {
    handle: save,
    name: 'save_partner_name',
  },
] as const;
