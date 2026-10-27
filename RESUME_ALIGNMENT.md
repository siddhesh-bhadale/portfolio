# Portfolio alignment with supplied résumés (27 October 2026)

Source of truth: `Siddhesh_Bhadale_Resume_2page(8).pdf` (detailed) and
`Siddhesh_Bhadale_Resume_1page(9).pdf` (concise), as re-uploaded on 27 October 2026. Both re-uploaded PDFs are byte-identical to the preceding portfolio copy.

## Changes made

- Replaced the old embedded résumé with the provided two-page version and added the provided one-page PDF. Both are available in the Contact section.
- Aligned the LinkedIn destination and public portfolio canonical/OG URL with the URLs printed on both résumés.
- Configured Vite for GitHub Pages `/portfolio/` deployments, including résumé and favicon asset paths.
- Changed TeamStream metrics from *200 concurrent users* to *approximately 200 UAT participants across five inspection sessions*, as written in the latest résumé.
- Changed P2P performance wording to *40+ peer sessions tested against one on-premises server under a controlled workload*.
- Removed location-specific deployment claims not present in the latest resumes.
- Incorporated the India AI Impact Summit 2026 showcase in TeamStream content.
- Corrected *4 issues closed* to *4 issues addressed* for the pending AndroidUSBCamera pull request.
- Removed unsupported 8 KB alignment claims. Kept verified build tool/NDK and tested-device details from the two-page résumé.
- Moved Kotlin into the production-exposure skill band (Swift was already there) and removed Java from the résumé-aligned skill list.
- Removed illustrative-but-unlabeled latency values from the P2P canvas diagram to avoid suggesting unmeasured RTT results.
- Preserved the site layout, existing case-study structure, light/dark theme, animations, and section navigation.

## Notes

- The website includes technical implementation details not covered by the résumés (e.g., Go2RTC, camera flows, project narrative). These are supplemental portfolio explanations, not independent validations. Review them before publishing if your deployed product or architecture has since changed.
- Roles, timelines, stack and claims reflect the supplied résumé as of the date above, not independently audited company records.
- The availability line is part of the existing site and should be changed if your job status changes.
- Before publishing, check `siddhesh-bhadale.github.io/portfolio/` is the intended GitHub Pages project path; adjust `VITE_BASE_PATH` for any different hosting setup.

## Local preview

```sh
npm ci
npm run build
npm run dev
```

For root URL hosting rather than `/portfolio/`: `VITE_BASE_PATH=/ npm run build`.

## Download filename behavior

The Contact section now sets `download={resumeFileNames.detailed}` and
`download={resumeFileNames.concise}` explicitly. Each value matches the physical
PDF asset under `public/` and the corresponding `profile` href. Recruiters
clicking either Download résumé link should receive the role-specific filename
without having to rename the file themselves (for same-origin static hosting).
After rebuilding and deploying, test the links on the live site.
