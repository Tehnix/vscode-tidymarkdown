'use strict';
var vscode = require('vscode');
var tidyMarkdown = require('tidy-markdown');
var output;
function showOutput(msg) {
    msg = msg.toString();
    if (!output) {
        output = vscode.window.createOutputChannel('Remark');
    }
    output.clear();
    output.appendLine('[Remark]');
    output.append(msg);
    output.show();
}
function getRangeOfDocument(document) {
    var start = new vscode.Position(0, 0);
    var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
    return new vscode.Range(start, end);
}
function _runTidyMarkdown(document, range) {
    var content = document.getText(range);
    return tidyMarkdown(content);
}
function runTidyMarkdown(document, range) {
    var formattedText = _runTidyMarkdown(document, range);
    return [new vscode.TextEdit(range, formattedText)];
}
function activate(context) {
    var supportedDocument = 'markdown';
    // Support formatting the whole document.
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(supportedDocument, {
        provideDocumentFormattingEdits: function (document, options, token) {
            var tidyMarkdownConfig = vscode.workspace.getConfiguration('tidyMarkdown');
            if (tidyMarkdownConfig && !tidyMarkdownConfig['disableFormatter']) {
                var range = getRangeOfDocument(document);
                var formattedText = runTidyMarkdown(document, range);
                return formattedText;
            }
            return [];
        }
    }));
    // Support formatting a selection.
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(supportedDocument, {
        provideDocumentRangeFormattingEdits: function (document, range, options, token) {
            var tidyMarkdownConfig = vscode.workspace.getConfiguration('tidyMarkdown');
            if (tidyMarkdownConfig && !tidyMarkdownConfig['disableFormatter']) {
                var formattedText = runTidyMarkdown(document, range);
                return formattedText;
            }
            return [];
        }
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map