# Feature Spec -> Resume Toast

---

## Requirements

---

- Build a toast much like the next.js toast that lives in the botttom righthand corner
- When first opening the application, its rectangular and gives an informational message saying click to view my resume
- If not clicked, has a motion collapse into a circular icon with the favicon Z
- If clicked it opens to a new route `/resume`

### Resume Route

---

- A new route with a title much like the others but clearly stating its my resume (same styling reuse component)
- Main component being a pdf viewer using the following package: [https://www.npmjs.com/package/@syncfusion/ej2-pdfviewer]
- Resume is in `/public/static/resume`
- Last updated note below the title

## Nice to have (if easy implementation)

---

- Better google analytics tracking on the resume pdf viewer usage if possible natively
