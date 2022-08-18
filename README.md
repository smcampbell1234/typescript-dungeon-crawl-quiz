# Project Notes

This is a simple quiz that is a dungeon crawl. It is based off another of my repos:
typescript-quiz-app : https://github.com/smcampbell1234/typescript-quiz-app/blob/main/README.md

### Creation

```
npx create-react-app <name of app> --template typescript
```

### Netlify CI/CD Requirements

create redirect file in public (single underscore) and add this line to it
\_redirects file in public

```
/*    /index.html   200
```

package.json
in scripts section of package.json replace build field with this (it includes CI=)

```
"build": "CI= react-scripts build",
```
