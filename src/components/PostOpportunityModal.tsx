import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Icon } from './Icon';
import {
  CATEGORIES,
  REGIONS,
  type Category,
  type Opportunity,
} from '../data/opportunities';
import styles from './PostOpportunityModal.module.css';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

export function PostOpportunityModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (o: Opportunity) => void;
}) {
  const [title, setTitle] = useState('');
  const [org, setOrg] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [region, setRegion] = useState('');
  const [deadline, setDeadline] = useState('');
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [funded, setFunded] = useState(false);
  const [touched, setTouched] = useState(false);

  const missing = {
    title: !title.trim(),
    org: !org.trim(),
    category: !category,
    region: !region,
  };
  const hasErrors = Object.values(missing).some(Boolean);

  const submit = () => {
    setTouched(true);
    if (hasErrors) return;
    const opp: Opportunity = {
      id: `${slugify(title) || 'opp'}-${Date.now().toString(36)}`,
      title: title.trim(),
      org: org.trim(),
      category: category as Category,
      region,
      funded,
      deadline: deadline || null,
      url: url.trim() || '#',
      summary: summary.trim() || `${category} opportunity posted via Anubhuti.`,
      posted: true,
    };
    onAdd(opp);
  };

  const inputCls = (bad: boolean) =>
    `${styles.input} ${touched && bad ? styles.invalid : ''}`;
  const selectCls = (bad: boolean) =>
    `${styles.select} ${touched && bad ? styles.invalid : ''}`;

  return (
    <Modal onClose={onClose} labelledBy="post-title">
      <div className={styles.head}>
        <div className={styles.eyebrow}>Post an opportunity</div>
        <h2 id="post-title" className={styles.title}>
          Share an opportunity — for free
        </h2>
        <p className={styles.sub}>
          Add a scholarship, fellowship, internship, competition or any opening. It appears in the
          explorer right away.
        </p>
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="f-title">
            Title <span className={styles.req}>*</span>
          </label>
          <input
            id="f-title"
            className={inputCls(missing.title)}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Himalaya Climate Fellowship 2026"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="f-org">
            Organisation <span className={styles.req}>*</span>
          </label>
          <input
            id="f-org"
            className={inputCls(missing.org)}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="e.g. Himalayan Climate Initiative"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="f-cat">
              Category <span className={styles.req}>*</span>
            </label>
            <select
              id="f-cat"
              className={selectCls(missing.category)}
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="">Choose…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="f-region">
              Region <span className={styles.req}>*</span>
            </label>
            <select
              id="f-region"
              className={selectCls(missing.region)}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Choose…</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="f-deadline">
              Deadline <span style={{ color: 'var(--text-faint)' }}>(optional)</span>
            </label>
            <input
              id="f-deadline"
              type="date"
              className={styles.input}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="f-url">
              Link <span style={{ color: 'var(--text-faint)' }}>(optional)</span>
            </label>
            <input
              id="f-url"
              type="url"
              className={styles.input}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="f-summary">
            Summary <span style={{ color: 'var(--text-faint)' }}>(optional)</span>
          </label>
          <textarea
            id="f-summary"
            className={styles.textarea}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="One sentence on who it's for and what it offers."
          />
        </div>

        <label className={styles.check}>
          <input type="checkbox" checked={funded} onChange={(e) => setFunded(e.target.checked)} />
          This opportunity is funded (stipend, scholarship or covered costs)
        </label>

        {touched && hasErrors && (
          <div className={styles.error}>Please fill in the required fields marked *.</div>
        )}

        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" iconRight={<Icon name="arrow-right" size={16} />}>
            Post opportunity
          </Button>
        </div>
      </form>
    </Modal>
  );
}
