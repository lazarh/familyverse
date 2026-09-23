import ReactMarkdown, { type Components } from 'react-markdown';
import type { PersonDto } from '@/types/feed';
import { Panel } from './Panel';
import { firstName } from './format';

export type AboutPanelPerson = Pick<PersonDto, 'fullName' | 'bio'>;

/**
 * Sanitized markdown render of the bio (#5 / #14): react-markdown WITHOUT
 * rehype-raw — raw HTML in the bio is never parsed (the XSS surface stays
 * closed by omission), and links open in a new tab with noopener.
 */
const MARKDOWN: Components = {
  a: (props) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  ),
};

export interface AboutPanelProps {
  person: AboutPanelPerson;
}

/**
 * The About panel (member.html): full-width prose over the bio. The draft
 * hides the panel when bio is null; per the build ticket an empty bio
 * instead gets a quiet "No story yet" prompt pointing at Edit profile.
 */
export function AboutPanel({ person }: AboutPanelProps) {
  const bio = person.bio?.trim() ?? '';
  const name = firstName(person.fullName);

  return (
    <Panel title={`About ${name}`} className="mb-[22px]">
      {bio === '' ? (
        <div className="px-[22px] py-5">
          <p className="text-[15px] font-650 text-[var(--ink)]">No story yet</p>
          <p className="mt-1 text-[13.5px] text-[var(--muted)]">
            {`Open “Edit profile” to add ${name}’s story — it renders here as formatted text.`}
          </p>
        </div>
      ) : (
        <div className="prose">
          <ReactMarkdown components={MARKDOWN}>{bio}</ReactMarkdown>
        </div>
      )}
    </Panel>
  );
}
