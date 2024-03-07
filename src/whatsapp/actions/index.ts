import { Action } from '../domain/dto';
import { listBookById } from './list-book-by-id';
import { listBooks } from './list-books';
import { listEventById } from './list-event-by-id';
import { listEvents } from './list-events';
import { saveDream } from './save-dream';
import { savePartnerName } from './save-partner-name';
import { savePray } from './save-pray';
import { saveTestimonial } from './save-testimonial';

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
    handle: savePray,
    name: 'save_pray',
  },
  {
    handle: saveTestimonial,
    name: 'save_testimonial',
  },
  {
    handle: saveDream,
    name: 'save_dream',
  },
  {
    handle: savePartnerName,
    name: 'save_partner_name',
  },
  {
    handle: listEvents,
    name: 'list_events',
  },
  {
    handle: listEventById,
    name: 'detail_event',
  },
] as const;
