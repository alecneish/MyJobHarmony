# Quiz Question Components

Location: `frontend/src/components/questions/QuestionComponents.tsx`
Example usage page (sandbox/gallery, not a full quiz flow): `/quiz/interface` (`frontend/src/pages/QuizInterface.tsx`)

## Components

### QuestionStepper (outer shell)

- Purpose: Displays one question at a time; advances on Next/Finish. Use it as the container for your quiz.
- Props: `questions: QuestionDef[]`, optional `initialAnswers`, optional `onComplete(answers)` callback, optional `title`/`description`.
- QuestionDef fields: `id`, `title`, `type` (`text`, `textarea`, `select`, `multi-select`, `radio-chips`, `checkbox-chips`, `range`, `input`, `datalist`, `toggle`, `file`), optional `options`, `placeholder`, `helper`, `ariaLabel`, `inputType`, `min`, `max`, `step`, `listId`, `required`, `displayValue` for ranges.
- Behaviors: disables Next until required question is answered; calls `onComplete` on Finish.
- See example list in `QuizInterface.tsx` (STEPPER_QUESTIONS).

### TextQuestion

- Purpose: short/long text prompts.
- Props: `label`, `value`, `onChange(value)`, optional `placeholder`, `helper`, `multiline`, `name`.
- Use `multiline` for textarea.

### InputQuestion

- Purpose: generic `<input>` for types like `email`, `tel`, `url`, `password`, `date`, `time`, `datetime-local`, `month`, `week`, `number`, `color`.
- Props: `label`, `type`, `value`, `onChange(value)`, optional `placeholder`, `helper`, `name`, `min`, `max`, `step`, `listId`.

### SelectQuestion

- Purpose: dropdowns (single or multi).
- Props: `label`, `value`, `options: Option[]`, `onChange(value | value[])`, optional `multiple`, `helper`, `name`, `ariaLabel`.
- For `multiple`, pass/receive `string[]`.

### ChipGroupQuestion

- Purpose: radios/checkboxes styled as chips.
- Props: `label`, `options: Option[]`, `value` (`string` or `string[]`), `onChange`, `mode: 'single' | 'multi'`, `name`, optional `ariaLabel`.

### RangeQuestion

- Purpose: slider with optional display.
- Props: `label`, `value (number)`, `onChange(number)`, `min`, `max`, optional `step`, `displayValue`.

### FileQuestion

- Purpose: file uploads.
- Props: `label`, `onChange(file|null)`, optional `accept`, `helper`, `name`.

### ToggleQuestion

- Purpose: simple checkbox toggle row.
- Props: `label`, `checked`, `onChange(checked)`, optional `name`.

### DatalistQuestion

- Purpose: text input with datalist suggestions.
- Props: `label`, `value`, `onChange(value)`, `listId`, `options: Option[]`, optional `placeholder`.

### Option type

- `{ value: string; label: string; }`

## Patterns to follow

- Wrap grouped questions in `<fieldset className="jh-form-card">` with a `<legend>` for clarity and accessibility.
- Use `ariaLabel` on `SelectQuestion` (when multiple) and `ChipGroupQuestion` for screen readers.
- Keep values in parent state; pass `onChange` to update that state.
- Use `helper` for short guidance under inputs.
- For multi-select dropdowns, remember to pass/receive `string[]`.

## Quick example

```tsx
const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

<SelectQuestion
  label="Favorite cities (multi)"
  multiple
  value={favoriteCities}
  options={[
    { value: 'nyc', label: 'New York' },
    { value: 'ldn', label: 'London' },
  ]}
  ariaLabel="Favorite cities"
  onChange={(value) => setFavoriteCities(value as string[])}
/>
```

## Adding a new question type

1) Add a component in `QuestionComponents.tsx` (reuse `QuestionField` and existing styles like `.jh-field`, `.jh-inline-options`, `.jh-chip-option`).
2) Import it where needed (e.g., `QuizInterface.tsx`), wire to state, and place inside a `fieldset`.
3) Keep labels and aria text meaningful; ensure keyboard focus works on all controls.

---

## How to build a quiz page (teammate-friendly guide)

Goal: Use the ready-made question components + `QuestionStepper` to build a quiz that shows one question at a time.

Files you need
- Components: `frontend/src/components/questions/QuestionComponents.tsx`
- Stepper shell: `frontend/src/components/questions/QuestionStepper.tsx`
- Example page: `frontend/src/pages/QuizInterface.tsx` (demo only)

Steps
1) Define your questions as `QuestionDef[]`:
   - Set `id` (unique), `title`, `type`, and any needed fields: `options`, `placeholder`, `inputType`, `min/max/step` (for number/range), `required`, `displayValue` (for range label), `helper` (shows under the input).
   - Example:
   ```ts
   const QUESTIONS: QuestionDef[] = [
     { id: 'q1', title: 'Your name', type: 'text', required: true },
     { id: 'q2', title: 'Role type', type: 'select', options: [
       { value: 'product', label: 'Product' },
       { value: 'design', label: 'Design' },
     ]},
     { id: 'q3', title: 'Tools you use', type: 'checkbox-chips', options: ['Figma','Jira','SQL'].map(v => ({ value: v, label: v })) },
     { id: 'q4', title: 'Salary range', type: 'range', min: 40, max: 200, step: 5, displayValue: (v) => `$${v}k` },
   ];
   ```

2) Render the stepper in your page:
   ```tsx
   import QuestionStepper from '../components/questions/QuestionStepper';

   function QuizPage() {
     return (
       <QuestionStepper
         questions={QUESTIONS}
         initialAnswers={{}} // optional defaults
         onComplete={(answers) => {
           // send to API or move to results page
           fetch('/api/quiz', { method: 'POST', body: JSON.stringify(answers) });
         }}
       />
     );
   }
   ```

3) Wire to backend/state:
   - Use `onComplete` to POST answers or navigate to results.
   - If you need live sync, you can lift state up: wrap `QuestionStepper` and pass `initialAnswers` from your store, then patch it in `onComplete`.

4) Required/Next behavior:
   - `QuestionStepper` disables Next until required questions are answered.
   - Finish triggers `onComplete`.

5) Styling/layout:
   - The stepper uses existing classes (`jh-quiz-card`, `jh-quiz-nav`, etc.). It is responsive out of the box.
   - To change spacing/text, override via a wrapper or tweak CSS if needed.

6) Validations and masks:
   - For stricter validation, add it in your `onComplete` or wrap the component and conditionally block `next()` by forking the stepper (if you need custom logic).

7) Datalist/file specifics:
   - `datalist` questions use `options` for suggestions; set `listId` if you need a custom id.
   - `file` questions return a `File` object in answers; handle upload in `onComplete` (e.g., FormData or pre-signed URL).

8) Where to look for a working example:
   - `QuizInterface.tsx` shows a full `QuestionDef` array (`STEPPER_QUESTIONS`) that covers all types. Copy and trim that list to start.

Cheat sheet of types → components (handled automatically by the stepper):
- `text` → `TextQuestion`
- `textarea` → `TextQuestion` with `multiline`
- `select` / `multi-select` → `SelectQuestion`
- `radio-chips` / `checkbox-chips` → `ChipGroupQuestion`
- `range` → `RangeQuestion`
- `input` (email/tel/url/password/number/date/time/month/week/datetime-local/color) → `InputQuestion`
- `datalist` → `DatalistQuestion`
- `toggle` → `ToggleQuestion`
- `file` → `FileQuestion`
