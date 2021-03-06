/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

let nextFileId = 0;

function getUniquePath(): string {
  nextFileId++;
  return `/tmp/nuclide-debugger-BreakpointDisplayControllerTest-spec-${nextFileId}.m`;
}

async function createEditorWithUniquePath(): Promise<atom$TextEditor> {
  const path = getUniquePath();
  return atom.workspace.open(path);
}

function hasBreakpointDecorationInRow(editor: atom$TextEditor, row: number): boolean {
  return Boolean(getBreakpointDecorationInRow(editor, row));
}

function getBreakpointDecorationInRow(editor: atom$TextEditor, row: number): ?atom$Decoration {
  const decorationArrays = editor.decorationsForScreenRowRange(row, row);
  for (const key in decorationArrays) {
    const decorations = decorationArrays[key];
    for (let i = 0; i < decorations.length; i++) {
      const {gutterName, item} = decorations[i].getProperties();
      if (gutterName === 'nuclide-breakpoint' &&
        item.className === 'nuclide-debugger-breakpoint-icon'
      ) {
        return decorations[i];
      }
    }
  }
  return null;
}

module.exports = {
  createEditorWithUniquePath,
  getBreakpointDecorationInRow,
  getUniquePath,
  hasBreakpointDecorationInRow,
};
