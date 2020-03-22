'use strict';

import * as vscode from 'vscode';
const tidyMarkdown: any = require('tidy-markdown');


function getRangeOfDocument(document: vscode.TextDocument): vscode.Range {
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
    return new vscode.Range(start, end);
}

function _runTidyMarkdown(document: vscode.TextDocument, range: vscode.Range, options: vscode.WorkspaceConfiguration): string {
    var content = document.getText(range);
    return tidyMarkdown(content, {
        ensureFirstHeaderIsH1: options.get('ensureFirstHeaderIsH1', true)
    });
}

function runTidyMarkdown(document: vscode.TextDocument, range: vscode.Range, options: vscode.WorkspaceConfiguration): vscode.TextEdit[] {
    var formattedText: string = _runTidyMarkdown(document, range, options);
    return [new vscode.TextEdit(range, formattedText)];
}

export function activate(context: vscode.ExtensionContext) {
    const supportedDocument: vscode.DocumentSelector = 'markdown';

    // Support formatting the whole document.
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(supportedDocument, {
        provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
            var tidyMarkdownConfig = vscode.workspace.getConfiguration('tidyMarkdown')
            if (tidyMarkdownConfig && !tidyMarkdownConfig['disableFormatter']) {
                const range = getRangeOfDocument(document);
                const formattedText: vscode.TextEdit[] = runTidyMarkdown(document, range, tidyMarkdownConfig);
                return formattedText;
            }
            return [];
        }
    }));

    // Support formatting a selection.
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(supportedDocument, {
        provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
            var tidyMarkdownConfig = vscode.workspace.getConfiguration('tidyMarkdown')
            if (tidyMarkdownConfig && !tidyMarkdownConfig['disableFormatter']) {
                const formattedText: vscode.TextEdit[] = runTidyMarkdown(document, range, tidyMarkdownConfig);
                return formattedText;
            }
            return [];
        }
    }));
}
