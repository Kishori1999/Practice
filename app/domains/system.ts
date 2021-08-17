import Agenda from 'agenda';

export type Es6Module<T> = { default: T };

export type Callback<T = any> = (err?: Error | null, result?: T) => void;

export interface AppAgenda extends Agenda {
  jobNames: Record<string, any>;
}
