# Tidy Markdown Formatter

[![Build Status](https://travis-ci.org/Tehnix/vscode-tidymarkdown.svg?branch=master)](https://travis-ci.org/Tehnix/vscode-tidymarkdown)

Adds support for the formatting Markdown documents using [tidy-markdown](https://github.com/slang800/tidy-markdown). No dependencies are neccessary, the extension uses the NPM package internally.

## Configuration

Explicitly enable or disable the Tidy Markdown formatter (in case of clash with others),

```json
"tidyMarkdown.disableFormatter": false,
```

Disable `ensureFirstHeaderIsH1` tidy-markdown option,

```json
"tidyMarkdown.ensureFirstHeaderIsH1": false,
```


## Change Log

### 0.0.5

- Add option to disable `ensureFirstHeaderIsH1`

### 0.0.4

- Pin tidy-markdown to version 2.0.4, see atom-beautify#1549 for related issue

### 0.0.3

- Add icon to marketplace page

### 0.0.2

- Add continuos deployment

### 0.0.1 Initial Release

- Initial release of the tidy-markdown extension
